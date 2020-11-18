//selection of html ids

const accordion = document.getElementById("accordion");
const panel = document.querySelector(".panel");
const addUserMessage = document.querySelector("#addUserMessage");
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

accordion.addEventListener("click", () => {
  // console.log("btn clicked");
  if (panel.style.display === "" || panel.style.display === "none") {
    panel.style.display = "block";
    // console.log("panel is now opened");
  } else {
    panel.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email.value || !name.value) {
    addUserMessage.innerHTML = "please fill in all the information";
    addUserMessage.style.display = "block";
    email.style.border = "2px red solid";
    name.style.border = "2px red solid";
  }

  console.log("submitted");
});
