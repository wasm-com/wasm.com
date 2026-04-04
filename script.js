// WHO made ts
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function initStars() {
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    s: Math.random() * 0.003 + 0.001,
    d: Math.random() > 0.5 ? 1 : -1,
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    s.a += s.s * s.d;
    if (s.a <= 0 || s.a >= 1) s.d *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a * 0.5})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
resize();
initStars();
drawStars();
window.addEventListener("resize", () => {
  resize();
  initStars();
});

window.addEventListener("scroll", () => {
  document.getElementById("nav").style.background =
    window.scrollY > 40 ? "rgba(8,8,10,0.95)" : "rgba(8,8,10,0.7)";
});

function filterPorts(btn, tag) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const cards = document.querySelectorAll(".port-card");
  let visible = 0;
  cards.forEach((c) => {
    const show = tag === "all" || c.dataset.tag === tag;
    c.style.display = show ? "flex" : "none";
    if (show) visible++;
  });
  const countEl = document.getElementById("ports-count");
  countEl.textContent = `${visible} port${visible !== 1 ? "s" : ""} shown`;
}

document.addEventListener("DOMContentLoaded", () => {
  const total = document.querySelectorAll(".port-card").length;
  document.getElementById("ports-count").textContent = `${total} ports shown`;
});
