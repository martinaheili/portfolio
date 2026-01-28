const toggleBtn = document.querySelector(".theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");
const root = document.documentElement;

// Función para establecer tema
function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    toggleIcon.classList.replace("bi-moon", "bi-sun");
  } else {
    toggleIcon.classList.replace("bi-sun", "bi-moon");
  }
}

// Función para detectar hora y aplicar tema automáticamente
function applyThemeByHour() {
  const hour = new Date().getHours();
  if (hour >= 19 || hour < 8) {
    if (root.getAttribute("data-theme") !== "dark") setTheme("dark");
  } else {
    if (root.getAttribute("data-theme") !== "light") setTheme("light");
  }
}

// Aplicar al cargar la página
applyThemeByHour();

// Revisar cada minuto para actualizar automáticamente
setInterval(applyThemeByHour, 60000);

// Toggle manual
toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});