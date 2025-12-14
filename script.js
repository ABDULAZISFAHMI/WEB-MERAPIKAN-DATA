let usage = Number(localStorage.getItem("usage")) || 0;
let loggedIn = localStorage.getItem("login") === "true";
let history = JSON.parse(localStorage.getItem("history")) || [];

/* INIT */
window.onload = () => {
  if (loggedIn || usage < 3) {
    showApp();
  }
};

/* LOGIN FLOW */
function login(provider) {
  alert("Login dengan " + provider + " (OAuth)");
  loggedIn = true;
  localStorage.setItem("login", "true");
  showApp();
}

function continueAsGuest() {
  showApp();
}

function logout() {
  loggedIn = false;
  localStorage.setItem("login", "false");
  location.reload();
}

function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

/* MENU */
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("dropdown").classList.toggle("hidden");
};

/* CLEAN TEXT (FIXED & STABLE) */
document.getElementById("cleanBtn").onclick = () => {
  if (!loggedIn && usage >= 3) {
    alert("Batas 3 kali penggunaan tercapai. Silakan login.");
    return;
  }

  const text = document.getElementById("inputText").value;
  const mode = document.getElementById("mode").value;

  if (!text.trim()) return;

  let result = "";

  switch (mode) {
    case "az":
      result = text.split("\n").sort().join("\n");
      break;

    case "num":
      result = text
        .split("\n")
        .map(Number)
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b)
        .join("\n");
      break;

    case "line":
      result = text
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "")
        .join("\n");
      break;

    default:
      result = text
        .replace(/\s+/g, " ")
        .replace(/\n+/g, "\n")
        .trim();
  }

  document.getElementById("outputText").value = result;

  usage++;
  localStorage.setItem("usage", usage);

  history.push(result);
  localStorage.setItem("history", JSON.stringify(history));
};

/* HISTORY */
function showHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  history.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1} - ${item.substring(0, 40)}...`;
    list.appendChild(li);
  });

  document.getElementById("historyModal").classList.remove("hidden");
}

function closeHistory() {
  document.getElementById("historyModal").classList.add("hidden");
}
