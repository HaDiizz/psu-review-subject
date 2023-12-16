const checkbox = document.getElementById("checkbox");
const bodyClass = document.body.classList;

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  bodyClass.add("dark");
  checkbox.checked = true;
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    bodyClass.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    bodyClass.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});