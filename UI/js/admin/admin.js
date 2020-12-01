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
const db = firebase.firestore()
const accordion = document.getElementById("accordion");
const panel = document.querySelector(".panel");
const addUserMessage = document.querySelector("#addUserMessage");
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const usersTable = document.getElementById("usersTable");


// functions

const selector = (x) => document.querySelector(x);

const form = selector("#addUserForm");
const email = selector("#addUserEmail");
const name = selector("#addUserName");

// validations

email.addEventListener("blur", () => {
  if (!email.value.match(mailRegex)) {
    addUserMessage.innerHTML = "***input a valid email***";
    addUserMessage.style.display = "block";
    email.style.border = "2px solid red";
    console.log("incorect");
  } else {
    addUserMessage.style.display = "none";
    email.style.border = "2px solid rgba(100, 189, 85, 0.9)";
  }
});

name.addEventListener("blur", () => {
  if (!name.value) {
    addUserMessage.innerHTML = "***input a valid name***";
    addUserMessage.style.display = "block";
    name.style.border = "2px solid red";
  } else {
    addUserMessage.style.display = "none";
    name.style.border = "2px solid rgba(100, 189, 85, 0.9)";
  }
});
const renderMsg = (doc) =>{
  let tr = document.createElement("tr");
  let name = document.createElement("td");
  let email = document.createElement("td");
  let msg = document.createElement("td");

  tr.setAttribute( "id", doc.id)
  name.textContent = doc.data().name;
  email.textContent = doc.data().email;
  msg.textContent = doc.data().message;

  tr.appendChild(name);
  tr.appendChild(email);
  tr.appendChild(msg);

  usersTable.appendChild(tr);
}

// get messages
db.collection("messages").onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    //
    changes.forEach(change =>{      
      if(change.type === "added"){
        renderMsg(change.doc);
      }
    })
   
})
