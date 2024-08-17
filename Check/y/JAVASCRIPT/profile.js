import { 
    storage, ref, uploadBytesResumable, getDownloadURL, db, 
    getDocs, collection, addDoc, doc, getDoc, setDoc
} from "./firebase.js";

const changeDp = async () => {
    const imageInput = document.getElementById("image");
    if (imageInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    try {
        const imageUrl = await uploadImage(imageInput.files[0]);

        // Save  URL 
        const userID = localStorage.getItem("uid");
        await setDoc(doc(db, "profile_pictures", userID), { url: imageUrl });

        
        const profileImgContainer = document.getElementById("depe");
        profileImgContainer.innerHTML = `
            <img src="${imageUrl}" alt="Profile Picture" class="profile-img img-fluid">
        `;
        location.reload()
    } catch (error) {
        console.error("Error updating profile picture:", error);
    }
};
//Promis
const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const metadata = {
            contentType: file.type,
        };

        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.error("Upload error:", error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
};


const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.clear();
    window.location.replace("../FRONTEND/auth.html");
};


window.addEventListener("load", async () => {
    if (!localStorage.getItem("uid")) {
        window.location.replace("../FRONTEND/auth.html");
        return;
    }

    const userID = localStorage.getItem("uid");
    const response = await getDoc(doc(db, "user", userID));
    const userData = response.data();

    const naam = document.getElementById("naam");
    naam.innerHTML = `
        <h2>${userData.username}</h2>
        <p>Email: ${userData.email}</p>
    `;


    //display dp
    const profilePicDoc = await getDoc(doc(db, "profile_pictures", userID));
    if (profilePicDoc.exists()) {
        const profilePicData = profilePicDoc.data();
        const profileImgContainer = document.getElementById("depe");
        profileImgContainer.innerHTML = `
            <img src="${profilePicData.url}" alt="Profile Picture" class="profile-img img-fluid">
        `;
    }
});

window.handleLogout = handleLogout;
window.changeDp = changeDp;
