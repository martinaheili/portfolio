const toggleBtn = document.querySelector(".theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");
const root = document.documentElement;

// Estado inicial (por defecto light)
if (root.getAttribute("data-theme") === "dark") {
  toggleIcon.classList.replace("bi-moon", "bi-sun");
}

toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.setAttribute("data-theme", "light");
    toggleIcon.classList.replace("bi-sun", "bi-moon");
  } else {
    root.setAttribute("data-theme", "dark");
    toggleIcon.classList.replace("bi-moon", "bi-sun");
  }
});