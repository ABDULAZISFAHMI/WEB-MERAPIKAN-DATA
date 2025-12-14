let usageCount = localStorage.getItem("usage") || 0;
let isLoggedIn = localStorage.getItem("login") === "true";
let history = JSON.parse(localStorage.getItem("history")) || [];

// Menu
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("dropdown").classList.toggle("hidden");
};

// Clean Button
document.getElementById("cleanBtn").onclick = () => {
  if (!isLoggedIn && usageCount >= 3) {
    alert("Batas 3 kali penggunaan tercapai. Silakan login.");
    return;
  }

  const input = document.getElementById("inputText").value;
  const output = cleanText(input);

  document.getElementById("outputText").value = output;

  usageCount++;
  localStorage.setItem("usage", usageCount);

  history.push(output);
  localStorage.setItem("history", JSON.stringify(history));
};

// Text Cleaner Logic
function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, "\n")
    .trim();
}

// History
function showHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1}: ${item.substring(0, 50)}...`;
    list.appendChild(li);
  });

  document.getElementById("historyModal").classList.remove("hidden");
}

function closeHistory() {
  document.getElementById("historyModal").classList.add("hidden");
}

// Login / Logout (Placeholder OAuth)
function login() {
  alert("Login Google / Facebook (integrasi OAuth)");
  isLoggedIn = true;
  localStorage.setItem("login", "true");
}

function logout() {
  isLoggedIn = false;
  localStorage.setItem("login", "false");
}
