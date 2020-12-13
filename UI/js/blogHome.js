  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// declare everything here
const db = firebase.firestore();
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");
const blogDiv = document.querySelectorAll(".blog");
const blogSection = document.getElementById("blog-section");

// listeners
burger.addEventListener("click", () => {
  switch (navLinks.style.display) {
    case "none":
      navLinks.style.display = "flex";
      break;
    default:
      navLinks.style.display = "none";
  }
});

db.collection("blogs").get().then(snapshot =>{
  snapshot.docs.forEach(doc =>{
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const div = document.createElement("div");
  div.classList.add("blog");
  // div.setAttribute("b-id" = doc.id);
  h3.innerHTML = doc.data().blogTitle;
  p.innerHTML = doc.data().blogBody;
  p.innerText = p.innerText.substr(0,100) + "...";
  img.src = doc.data().image;
  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(p);
  blogSection.appendChild(div);
  div.addEventListener("click", e =>{
    e.stopPropagation();
    window.document.location = "/UI/pages/blogPage.html" + "?blogIdentity=" + doc.id;
  })
  })
})
