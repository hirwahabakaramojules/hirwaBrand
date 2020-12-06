var firebaseConfig = {
  apiKey: "AIzaSyB25XlauyLSyrv6-FOq4scHxofKfuXzHhw",
  authDomain: "hirwahjules-520b8.firebaseapp.com",
  databaseURL: "https://hirwahjules-520b8.firebaseio.com",
  projectId: "hirwahjules-520b8",
  storageBucket: "hirwahjules-520b8.appspot.com",
  messagingSenderId: "1014276523246",
  appId: "1:1014276523246:web:1cd8452cec429ff05d9fff",
  measurementId: "G-5PXYFR30WJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  //selection of html ids
const db = firebase.firestore();
const firebaseStorage = firebase.storage();
const accordion = document.getElementById("accordion");
const panel = document.querySelector(".panel");
const addUserMessage = document.querySelector("#addUserMessage");
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const blogForm = document.getElementById("form");
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// functions

const selector = (x) => document.querySelector(x);

const form = selector("#addUserForm");
const email = selector("#addUserEmail");
const name = selector("#addUserName");

// validations

// email.addEventListener("blur", () => {
//   if (!email.value.match(mailRegex)) {
//     addUserMessage.innerHTML = "***input a valid email***";
//     addUserMessage.style.display = "block";
//     email.style.border = "2px solid red";
//     console.log("incorect");
//   } else {
//     addUserMessage.style.display = "none";
//     email.style.border = "2px solid rgba(100, 189, 85, 0.9)";
//   }
// });

// name.addEventListener("blur", () => {
//   if (!name.value) {
//     addUserMessage.innerHTML = "***input a valid name***";
//     addUserMessage.style.display = "block";
//     name.style.border = "2px solid red";
//   } else {
//     addUserMessage.style.display = "none";
//     name.style.border = "2px solid rgba(100, 189, 85, 0.9)";
//   }
// });

// accordion.addEventListener("click", () => {
//   // console.log("btn clicked");
//   if (panel.style.display === "" || panel.style.display === "none") {
//     panel.style.display = "block";
//     // console.log("panel is now opened");
//   } else {
//     panel.style.display = "none";
//   }
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (!email.value || !name.value) {
//     addUserMessage.innerHTML = "please fill in all the information";
//     addUserMessage.style.display = "block";
//     email.style.border = "2px red solid";
//     name.style.border = "2px red solid";
//   }

//   console.log("submitted");
// });

blogForm.addEventListener("submit", e =>{
  e.preventDefault();
  const title = blogForm.title.value;
  const body = blogForm.body.value;
  const thumbnail = blogForm.thumbnail.files[0];
  const storageRef = firebaseStorage.ref(`thumbnails/${thumbnail.name}`);

  if (!title || !body) {
    return false;
  }
  
  storageRef.put(thumbnail).on("state_changed", snap =>{
    const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
    console.log(progress);
  }, err => console.log(err), async () => {
    const url = await storageRef.getDownloadURL()
    db.collection("blogs").add({
      blogTitle : title,
      blogBody: body,
      image : url,
      createdAt : timestamp
    })
    blogForm.reset()
  })
 
  

})
// console.log(blogForm.thumbnail.files[0]);