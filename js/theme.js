const toggleBtn = document.querySelector(".theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");
const root = document.documentElement;

// Función para establecer tema y guardar preferencia
function setTheme(theme, save = true) {
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    toggleIcon.classList.replace("bi-moon", "bi-sun");
  } else {
    toggleIcon.classList.replace("bi-sun", "bi-moon");
  }

  if (save) {
    localStorage.setItem("user-theme", theme);
  }
}

// Función para detectar hora y aplicar tema automáticamente
function applyThemeByHour() {
  const hour = new Date().getHours();
  if (hour >= 19 || hour < 8) {
    if (root.getAttribute("data-theme") !== "dark") setTheme("dark", false);
  } else {
    if (root.getAttribute("data-theme") !== "light") setTheme("light", false);
  }
}

// Al cargar la página: primero vemos si hay preferencia guardada
const savedTheme = localStorage.getItem("user-theme");
if (savedTheme) {
  setTheme(savedTheme, false); // aplicar la preferencia sin volver a guardar
} else {
  applyThemeByHour(); // si no hay preferencia, aplicar según hora
}

// Revisar cada minuto para actualizar automáticamente solo si no hay preferencia
if (!savedTheme) {
  setInterval(applyThemeByHour, 60000);
}

// Toggle manual
toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark"); // aquí sí se guarda en localStorage
});