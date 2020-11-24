// firebase config
var firebaseConfig = {
  apiKey: "AIzaSyB25XlauyLSyrv6-FOq4scHxofKfuXzHhw",
  authDomain: "hirwahjules-520b8.firebaseapp.com",
  databaseURL: "https://hirwahjules-520b8.firebaseio.com",
  projectId: "hirwahjules-520b8",
  storageBucket: "hirwahjules-520b8.appspot.com",
  messagingSenderId: "1014276523246",
  appId: "1:1014276523246:web:1cd8452cec429ff05d9fff",
  measurementId: "G-5PXYFR30WJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timeStampsInSnapshots: true });

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const msgForm = document.querySelector("#msg-form");
const formSection = document.querySelectorAll(".form-section");
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

burger.addEventListener("click", () => {
  switch (navLinks.style.display) {
    case "none":
      navLinks.style.display = "flex";
      break;
    default:
      navLinks.style.display = "none";
  }
});
// functions
const saveMessages = (name, email, message) => {
  try {
    db.collection("messages").add({
      name,
      email,
      message,
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

const logError = (input, message) => {
  const section = input.parentElement;
  const errMsg = section.querySelector("p");

  section.classList = "form-section error";
  errMsg.innerText = message;
};
const logSuccess = (input) => {
  const section = input.parentElement;
  section.classList = "form-section success";
};
const checkForm = async (name, email, message) => {
  try {
    if (!name.value) {
      logError(name, "name field can not be empty");
    } else if (name.value.length < 3) {
      logError(name, "a name must be at least 3 characters");
    } else {
      logSuccess(name);
    }

    if (!email.value) {
      logError(email, "email field can not be empty");
    } else if (!email.value.match(mailFormat)) {
      logError(email, "input a valid email");
    } else {
      logSuccess(email);
    }

    if (!message.value) {
      logError(message, "message field can not be empty");
    } else {
      logSuccess(message);
    }
  } catch (error) {
    return error;
  }
};
msgForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const name = document.getElementById("name-field");
    const email = document.getElementById("email-field");
    const message = document.getElementById("message-field");
    const successMsg = document.querySelector("#success-msg");
    const checkArr = [];

    // check for errors
    checkForm(name, email, message);
    formSection.forEach((section) => {
      if (section.classList.contains("error")) {
        checkArr.push("err");
      }
    });
    if (checkArr.length > 0) {
      return false;
    } else {
      saveMessages(name.value, email.value, message.value);
      console.log(`pushed ${name},${email},${message}`);

      msgForm.reset();
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
});
