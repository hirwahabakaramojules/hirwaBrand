// declare everything here

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav");

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
