// ---------------- IMAGE CLASS LIST -----------------
let classes = ["img1", "img2", "img3", "img4", "img5"];

// Pick one class randomly to duplicate
let duplicateClass = classes[Math.floor(Math.random() * classes.length)];

// Create array of 6: five unique + one duplicate
let tiles = [...classes, duplicateClass];

// Shuffle tiles randomly
tiles.sort(() => Math.random() - 0.5);

// ---------------- DOM ELEMENTS ----------------
const container = document.getElementById("container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];

// --------------- CREATE IMAGE ELEMENTS ----------------
tiles.forEach((cls, index) => {
  let img = document.createElement("img");
  img.classList.add(cls);
  img.dataset.class = cls;
  img.dataset.index = index;

  img.addEventListener("click", () => handleSelect(img));
  container.appendChild(img);
});

// ---------------- HANDLE CLICK ----------------
function handleSelect(img) {
  // Prevent selecting same image twice
  if (selected.includes(img)) return;

  // Allow only 2 selections
  if (selected.length === 2) return;

  img.classList.add("selected");
  selected.push(img);

  // State 2 → show reset
  resetBtn.style.display = "inline-block";

  // After 2 images clicked → show verify
  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// ---------------- RESET ----------------
resetBtn.addEventListener("click", () => {
  selected.forEach((img) => img.classList.remove("selected"));
  selected = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
});

// ---------------- VERIFY ----------------
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  let c1 = selected[0].dataset.class;
  let c2 = selected[1].dataset.class;

  if (c1 === c2) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});