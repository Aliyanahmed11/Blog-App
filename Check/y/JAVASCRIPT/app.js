

import { 
    storage, ref, uploadBytesResumable, getDownloadURL, db, 
    getDocs, collection, addDoc, doc, getDoc 
} from "./firebase.js";

const map = document.getElementById("map");


window.addEventListener("load", async () => {
    if (!localStorage.getItem("uid")) {
        window.location.replace("../FRONTEND/auth.html");
    } 
    {
        const querySnapshot = await getDocs(collection(db, "blog"));
        for (const docSnap of querySnapshot.docs) {
            const blogData = docSnap.data();
            const userRef = doc(db, "user", blogData.uid); 
            const userDoc = await getDoc(userRef); 

            
            const username = userDoc.exists() ? userDoc.data().username : "Unknown"; 

            map.innerHTML += `
                <div>
                    <div class="custom-card">
                        <div class="card-img-container">
                            <img src="${blogData.imageUrl}" class="card-img" alt="...">
                        </div>
                        <div class="card-body">
                            <p class="posted-by">Posted by: ${username}</p>
                            <h5 class="card-title">${blogData.title}</h5>
                            <p class="card-text">${blogData.content}</p>
                        </div>
                    </div>
                    <br>
                </div>`;
        }
    }
});

const createBlog = async () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image");
    const uid = localStorage.getItem("uid");

    if (!title || !content || !image.files.length) {
        alert("Please fill in all fields and upload an image.");
        return;
    }

    try {
        const imageUrl = await uploadImage(image.files[0]);
        console.log(imageUrl);

        const blogObj = {
            title: title,
            content: content,
            imageUrl: imageUrl,
            uid: uid
        };

        const response = await addDoc(collection(db, "blog"), blogObj);
        console.log(response);
        var myModalEl = document.getElementById("createBlog");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
  location.reload()

    } catch (error) {
        console.error("Error creating blog:", error);
    }
};

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
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.replace("../FRONTEND/auth.html");
  };

window.handleLogout = handleLogout  
window.createBlog = createBlog;
















// import { storage, ref, uploadBytesResumable, getDownloadURL, db, getDocs, collection, addDoc, } from "./firebase.js"



// window.addEventListener("load", async () => {
//     if (!localStorage.getItem("uid")) {
//         window.location.replace("../FRONTEND/auth.html");
//     }
//     else {
//         const querySnapshot = await getDocs(collection(db, "blog"));
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data().title}`);
//             map.innerHTML += `
//             <div>
            
//                 <div class="custom-card">
//                     <div class="card-img-container">
//                         <img src="${doc.data().imageUrl}" class="card-img" alt="...">
//                     </div>
//                     <div class="card-body">
//                         <p class="posted-by">Posted by: John Doe</p>
//                         <h5 class="card-title">${doc.data().title}</h5>
//                         <p class="card-text">${doc.data().content}</p>
//                     </div>
//                 </div>

//                 <br>
                
//             </div>
//                 `


//         });
//     }
// }
// )

// const title = document.getElementById("title").value
// const content = document.getElementById("content").value
// const image = document.getElementById("image")
// const uid = localStorage.getItem("uid");
// const map = document.getElementById("map")
// // const flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked")

// const createBlog = async () => {

//     // console.log(image.files[0] , flexSwitchCheckChecked.checked)
//     const imageUrl = await uploadImage(image.files[0])
//     console.log(imageUrl)

//     const blogObj = {
//         title: title,
//         content: content,
//         imageUrl: imageUrl,
//         uid: uid
//     }

//     const response = await addDoc(collection(db, "blog"), blogObj)
//     console.log(response)

// }



// const uploadImage = (file) => {
//     return new Promise((resolve, reject) => {
//         const metadata = {
//             contentType: "image/jpeg",
//         };

//         // Upload file and metadata to the object 'images/mountains.jpg'
//         const storageRef = ref(storage, "images/" + file.name);
//         const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//         // Listen for state changes, errors, and completion of the upload.
//         uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress =
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + "% done");
//                 switch (snapshot.state) {
//                     case "paused":
//                         console.log("Upload is paused");
//                         break;
//                     case "running":
//                         console.log("Upload is running");
//                         break;
//                 }
//             },
//             (error) => {
//                 // A full list of error codes is available at
//                 // https://firebase.google.com/docs/storage/web/handle-errors
//                 //   switch (error.code) {
//                 //     case 'storage/unauthorized':
//                 //       // User doesn't have permission to access the object
//                 //       break;
//                 //     case 'storage/canceled':
//                 //       // User canceled the upload
//                 //       break;

//                 //     // ...

//                 //     case 'storage/unknown':
//                 //       // Unknown error occurred, inspect error.serverResponse
//                 //       break;
//                 //   }
//                 reject(error);
//             },
//             () => {
//                 // Upload completed successfully, now we can get the download URL
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     console.log("File available at", downloadURL);
//                     resolve(downloadURL);
//                 });
//             }
//         );
//     });
// };





// window.createBlog = createBlog