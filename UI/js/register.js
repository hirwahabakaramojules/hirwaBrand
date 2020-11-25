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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("not loged in");
  }
});
// declarations
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const registerForm = document.getElementById("register-form");
const formSection = document.querySelectorAll(".form-section");
const pwdFormat = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

//functions

const logError = (input, message) => {
  const section = input.parentElement;
  const errMsg = section.querySelector("p");

  section.classList = "error";
  errMsg.innerText = message;
};
const logSuccess = (input) => {
  const section = input.parentElement;
  section.classList = "success";
};

const checkForm = async (email, password) => {
  try {
    if (!email.value) {
      return logError(email, "email field can not be empty");
    } else if (!email.value.match(mailFormat)) {
      return logError(email, "input a valid email");
    } else {
      logSuccess(email);
    }

    if (!password.value) {
      logError(password, "password field can not be empty");
    } else if (!password.value.match(pwdFormat)) {
      logError(
        password,
        "password must be at least 8 characters and include capital and normal letters, numbers and signs"
      );
    } else {
      logSuccess(password);
    }
  } catch (error) {
    return error;
  }
};

// event listeners

burger.addEventListener("click", () => {
  console.log("clicjed");
  switch (navLinks.style.display) {
    case "none":
      navLinks.style.display = "flex";
      break;
    default:
      navLinks.style.display = "none";
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkArr = [];
  const password = document.getElementById("password-field");
  const email = document.getElementById("email-field");
  const i = document.querySelectorAll(".icon");

  // check for bad input on form
  checkForm(email, password);
  // check to see if there is no error on form input
  formSection.forEach((section) => {
    if (section.classList.contains("error")) {
      checkArr.push("err");
    }
  });
  console.log(checkArr);

  if (checkArr.length > 0) {
    return false;
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        window.location = "./blogHome.html";
        registerForm.reset();
        setTimeout(() => {
          i.forEach((icon) => (icon.style.display = "none"));
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          console.log({
            errorCode: error.code,
            errorMsg: error.message,
          });
        }
      });
  }
});
