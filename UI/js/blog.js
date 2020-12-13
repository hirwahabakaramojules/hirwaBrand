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

const db = firebase.firestore();  
const blogSection = document.getElementById("blog-section")
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const commentForm = document.getElementById("comment-form");
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const navBtn = document.getElementById("nav-btn");
const bId = document.location.search.replace(/^.*?\=/, "");
console.log(bId);

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

db.collection("blogs").doc(bId).get().then(snapshot =>{
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const blog = snapshot.data();

  img.src = blog.image;
  h3.innerHTML = blog.blogTitle;
  p.innerHTML = blog.blogBody;
  p.style.whiteSpace = "pre-line";
  blogSection.appendChild(img);
  blogSection.appendChild(h3);
  blogSection.appendChild(p);
})

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
