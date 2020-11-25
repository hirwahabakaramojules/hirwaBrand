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

// declare everything here
const db = firebase.firestore();
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const subscribeForm = document.getElementById("subscribe-form");
// functions

burger.addEventListener("click", () => {
  switch (navLinks.style.display) {
    case "none":
      navLinks.style.display = "flex";
      break;
    default:
      navLinks.style.display = "none";
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
