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

// declare everything
const db = firebase.firestore();
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const commentForm = document.getElementById("comment-form");
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const navBtn = document.getElementById("nav-btn");

// functions

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

const checkForm = async (name, email, comment) => {
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

    if (!comment.value) {
      console.log("comment validated");
      logError(comment, "comment field can not be empty");
    } else {
      logSuccess(comment);
    }
  } catch (error) {
    return error;
  }
};

// event liisteners

burger.addEventListener("click", () => {
  switch (navLinks.style.display) {
    case "none":
      navLinks.style.display = "flex";
      break;
    default:
      navLinks.style.display = "none";
  }
});

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const name = document.getElementById("name-field");
    const email = document.getElementById("email-field");
    const comment = document.getElementById("comment");
    const successMsg = document.getElementById("success-msg");
    const i = document.querySelectorAll(".icon");
    const checkArr = [];
    await checkForm(name, email, comment);
    if (checkArr.length > 0) {
      return false;
    } else {
      commentForm.reset();
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
        i.forEach((icon) => (icon.style.display = "none"));
      }, 3000);
    }
  } catch (error) {
    throw new error();
  }
});

navBtn.addEventListener("click", () => {
  if (navBtn.innerHTML === "logout") {
    firebase.auth().signOut();
    console.log("signed out");
    navBtn.href = "";
  } else if (navBtn.innerHTML === "join") {
    navBtn.href = "./register.html";
  }
});
// to save subscribers
const saveSubscribers = async (email) => {
  await db.collection("subscribers").add({ email });
};

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form working");
  try {
    const subscriberEmail = document.getElementById("subscribe-email").value;
    saveSubscribers(subscriberEmail);
    subscribeForm.reset();
  } catch (error) {
    console.log(error);
  }
});
