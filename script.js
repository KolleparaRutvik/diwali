// Fireworks + Name Wishes Script
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Particle class
class Particle {
  constructor(x, y, color, velocity) {
    this.x = x; this.y = y; this.color = color;
    this.velocity = velocity; this.alpha = 1;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.velocity.y += 0.02;
    this.draw();
  }
}

// Firework burst
function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * (canvas.height / 2);
  const color = `hsl(${Math.random()*360},100%,70%)`;

  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI*2*i)/60;
    const speed = Math.random()*4 + 2;
    particles.push(new Particle(x, y, color, {
      x: Math.cos(angle)*speed,
      y: Math.sin(angle)*speed
    }));
  }
}

// Animate fireworks
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.update();
    if(p.alpha<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
setInterval(createFirework, 600);
animate();

// Show personalized wishes
function showWishes() {
  const nameInput = document.getElementById("nameInput");
  const inputBox = document.getElementById("inputBox");
  const greeting = document.getElementById("greeting");
  const wishText = document.getElementById("wishText");

  const name = nameInput.value.trim();
  if(!name){
    alert("Please enter your name 🎇");
    return;
  }

  wishText.textContent = `🎉 Happy Diwali 2025, ${name}! 🎉`;
  inputBox.style.display = "none";
  greeting.classList.remove("hidden");

  for(let i=0;i<5;i++) setTimeout(createFirework,i*300);
}

// Confirm script loaded
console.log("✅ script.js loaded successfully");
