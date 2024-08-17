import { auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc, } from "./firebase.js";

window.addEventListener("load", () => {
    if (localStorage.getItem("uid")) {
        window.location.replace("../index.html");
    }
});
const switchToSignup = () => {
    const loginForm = document.getElementById("loginForm");
    const loginText = document.getElementById("loginText");

    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
}

const switchToLogin = () => {

    const loginForm = document.getElementById("loginForm");
    const loginText = document.getElementById("loginText");

    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
}

const switchToSignupLink = () => {
    const signupBtn = document.getElementById("signupBtn");

    signupBtn.click();
    return false;
}
const signupHandler = async () => {
    try {
        // console.log("Signup successful");
        const usernameInput = document.getElementById("signUser");
        const emailInput = document.getElementById("signEmail");
        const passwordInput = document.getElementById("signPass");
        const passConInput = document.getElementById("signConfirmPass");

        if (passwordInput.value !== passConInput.value) {
            alert("Please Confirm your Password");
            return; 
        }

        // signup
        const response = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        console.log(response);
        console.log(usernameInput.value, emailInput.value, passwordInput.value, passConInput.value);

        
        const signupObj = {
            username: usernameInput.value,
            email: emailInput.value,
        };

        // Store user data in Firestore
        await setDoc(doc(db, "user", response.user.uid), signupObj);
        console.log("User data stored successfully");

        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        passConInput.value = "";
        alert("SuccessFully Registered")
        
        
        
        // switch 
        switchToLogin();
        const loginBtn = document.getElementById("loginBtn");
        loginBtn.click();

    } 
    catch (error) {
        alert(error.message);
    }
}

const loginHandler = async () => {
    try {
        const logEmail = document.getElementById("logEmail")
        const logPass = document.getElementById("logPass")
        const loginResponse = await signInWithEmailAndPassword(auth, logEmail.value, logPass.value)
        logEmail.value = "";
        logPass.value = "";
        console.log(loginResponse)
        console.log(loginResponse.user.uid)
        localStorage.setItem("uid", loginResponse.user.uid)
        window.location.href= "../index.html"

    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }

} 





window.switchToSignup = switchToSignup
window.switchToSignupLink = switchToSignupLink
window.switchToLogin = switchToLogin
window.signupHandler = signupHandler
window.loginHandler = loginHandler