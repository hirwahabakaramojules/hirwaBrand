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
