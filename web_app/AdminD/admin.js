// Sidebar navigation switching
const sidebarItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".section");

sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    sidebarItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");
    const target = item.dataset.section;
    sections.forEach(sec => sec.classList.remove("visible"));
    document.getElementById(target).classList.add("visible");
  });
});

// -----------------------------
// DEMO RAW DATA
// -----------------------------
let gigs = JSON.parse(localStorage.getItem("gigs")) || [
  {
    title: "I will design a modern minimalist logo",
    category: "design",
    price: 45,
    desc: "Custom logo for your brand with vector source files.",
    image: "https://images.unsplash.com/photo-1624996379697-f18c8d9a34b6?w=400"
  },
  {
    title: "I will build responsive website with HTML, CSS & JS",
    category: "web",
    price: 120,
    desc: "Clean, fast and SEO-optimized responsive website.",
    image: "https://images.unsplash.com/photo-1581276879432-15a19d654956?w=400"
  },
  {
    title: "I will edit your videos professionally",
    category: "video",
    price: 70,
    desc: "High-quality YouTube or promo video editing with transitions.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400"
  }
];
localStorage.setItem("gigs", JSON.stringify(gigs));

// -----------------------------
// RENDER GIGS
// -----------------------------
const gigList = document.getElementById("gigList");
const gigForm = document.getElementById("gigForm");

function renderGigs() {
  gigList.innerHTML = "";
  gigs.forEach((gig, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${gig.image}" alt="gig">
      <h3>${gig.title}</h3>
      <p><b>Category:</b> ${gig.category}</p>
      <p><b>Price:</b> $${gig.price}</p>
      <p>${gig.desc}</p>
      <button class="btn delete" data-index="${index}">Delete</button>
    `;
    gigList.appendChild(card);
  });
}

// -----------------------------
// ADD NEW GIG
// -----------------------------
gigForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newGig = {
    title: gigTitle.value,
    category: gigCategory.value,
    price: Number(gigPrice.value),
    desc: gigDesc.value,
    image: gigImage.value || "https://via.placeholder.com/400"
  };
  gigs.push(newGig);
  localStorage.setItem("gigs", JSON.stringify(gigs));
  gigForm.reset();
  alert("✅ New gig added!");
  renderGigs();
  updatePayments();
  renderChart();
});

// Delete gig
gigList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;
    gigs.splice(index, 1);
    localStorage.setItem("gigs", JSON.stringify(gigs));
    renderGigs();
    updatePayments();
    renderChart();
  }
});

// -----------------------------
// PAYMENTS (raw data logic)
// -----------------------------
function updatePayments() {
  const total = gigs.reduce((sum, g) => sum + g.price, 0);
  const pending = (total * 0.2).toFixed(2);
  const withdrawable = (total * 0.8).toFixed(2);
  document.getElementById("totalEarnings").textContent = total;
  document.getElementById("pending").textContent = pending;
  document.getElementById("withdrawable").textContent = withdrawable;
}
updatePayments();

// -----------------------------
// ANALYTICS CHART (raw data)
// -----------------------------
// -----------------------------
// ADVANCED ANALYTICS CHARTS
// -----------------------------
function renderAdvancedAnalytics() {
  const earningsCtx = document.getElementById("monthlyEarningsChart");
  const gigsCtx = document.getElementById("gigsPerformanceChart");

  // Bar Chart — Monthly Earnings
  new Chart(earningsCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [{
        label: "Earnings ($)",
        data: [300, 450, 500, 400, 700, 650, 900, 1040],
        backgroundColor: "#1dbf73",
        borderRadius: 6,
      }]
    },
    options: {
      plugins: { legend: { display: false }},
      scales: {
        y: { beginAtZero: true, grid: { color: "#eee" }},
        x: { grid: { display: false }}
      }
    }
  });

  // Line Chart — Gigs Performance
  new Chart(gigsCtx, {
    type: "line",
    data: {
      labels: ["Logo Design", "Web Dev", "Video Edit", "SEO", "Voice Over"],
      datasets: [{
        label: "Views",
        data: [180, 240, 150, 120, 210],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6",
      }]
    },
    options: {
      plugins: { legend: { display: false }},
      scales: {
        y: { beginAtZero: true, grid: { color: "#f1f5f9" }},
        x: { grid: { display: false }}
      }
    }
  });
}

renderAdvancedAnalytics();

// -----------------------------
// LOGOUT BUTTON
// -----------------------------
const logoutEl = document.getElementById("logoutBtn");
if (logoutEl) {
  logoutEl.addEventListener("click", (e) => {
    // allow the link to work but show a friendly message
    e.preventDefault();
    // Clear client-side stored data on logout
    try{
      localStorage.clear();
      sessionStorage.clear();
    }catch(err){ console.warn('Error clearing storage on logout', err); }
    alert("👋 Logged out successfully!");
    window.location.href = logoutEl.getAttribute("href") || "index.html";
  });
}

// -----------------------------
// AVATAR UPLOAD / PREVIEW
// -----------------------------
const avatarImg = document.getElementById('avatarImg');
const avatarInput = document.getElementById('avatarInput');

// Load saved avatar from localStorage if present
function loadSavedAvatar(){
  try{
    const dataUrl = localStorage.getItem('adminAvatar');
    if(dataUrl && avatarImg){ avatarImg.src = dataUrl; }
  }catch(e){ console.warn('Could not load saved avatar', e); }
}

// Open file picker when avatar is clicked
if(avatarImg && avatarInput){
  avatarImg.addEventListener('click', ()=> avatarInput.click());

  avatarInput.addEventListener('change', (e)=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    // Use FileReader to read image as data URL for preview & storage
    const reader = new FileReader();
    reader.onload = function(ev){
      const dataUrl = ev.target.result;
      avatarImg.src = dataUrl;
      try{ localStorage.setItem('adminAvatar', dataUrl); }catch(err){ console.warn('Failed to save avatar to localStorage', err); }
    };
    reader.readAsDataURL(file);
  });
}

// initialize avatar
loadSavedAvatar();


// Initialize
renderGigs();
renderChart();