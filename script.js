const builds = [
  {
    name: "AliExpress N100 Mini-PC",
    price: 222,
    cpu: "Intel N100 (listing)",
    ram: "16 GB",
    storage: "1 TB target (SSD spec unknown)",
    clients: "Ethrex + Nimbus / Lodestar",
    status: "verify",
    note: "Cheapest entry. Verify SSD controller, endurance, and thermal behavior before staking.",
    source: "https://aliexpress.us/item/3256810016234285.html"
  },
  {
    name: "PCPartPicker Potato Tower",
    price: 377,
    cpu: "Budget desktop parts",
    ram: "16 GB",
    storage: "1 TB NVMe",
    clients: "Ethrex + Nimbus",
    status: "ready",
    note: "Community-proposed low-cost build. Good baseline for a single efficient validator stack.",
    source: "https://pcpartpicker.com/list/NByYck"
  },
  {
    name: "Rock 5B Backup Node",
    price: 450,
    cpu: "ARM SBC class",
    ram: "16 GB",
    storage: "1 TB NVMe",
    clients: "Nimbus + Nethermind",
    status: "ready",
    note: "Reported to run with headroom as a backup node using efficient client selection.",
    source: "https://www.reddit.com/r/ethstaker/comments/1r44js5/hardware_check_before_buying/"
  },
  {
    name: "Typical Overbuilt Starter Rig",
    price: 1250,
    cpu: "Desktop/server mix",
    ram: "32-64 GB",
    storage: "2 TB+",
    clients: "Varies",
    status: "reference",
    note: "Reference point from the original discussion. Often above practical requirements for one validator.",
    source: "https://www.reddit.com/r/ethstaker/comments/1r44js5/hardware_check_before_buying/"
  }
];

const budgetRange = document.querySelector("#budgetRange");
const budgetValue = document.querySelector("#budgetValue");
const statusFilter = document.querySelector("#statusFilter");
const buildGrid = document.querySelector("#buildGrid");

function formatPrice(price) {
  return `$${price.toLocaleString("en-US")}`;
}

function statusLabel(status) {
  if (status === "ready") return "Ready now";
  if (status === "verify") return "Needs verification";
  return "Reference";
}

function renderBuilds() {
  const maxBudget = Number(budgetRange.value);
  const status = statusFilter.value;

  budgetValue.textContent = formatPrice(maxBudget);

  const visibleBuilds = builds
    .filter((build) => build.price <= maxBudget)
    .filter((build) => status === "all" || build.status === status)
    .sort((a, b) => a.price - b.price);

  if (!visibleBuilds.length) {
    buildGrid.innerHTML = "<p>No builds match this filter yet. Increase budget or relax readiness.</p>";
    return;
  }

  buildGrid.innerHTML = visibleBuilds
    .map(
      (build) => `
      <article class="build-card">
        <div class="build-header">
          <h3>${build.name}</h3>
          <span class="price">${formatPrice(build.price)}</span>
        </div>
        <p><span class="badge ${build.status}">${statusLabel(build.status)}</span></p>
        <ul class="spec-list">
          <li><span>CPU</span><strong>${build.cpu}</strong></li>
          <li><span>RAM</span><strong>${build.ram}</strong></li>
          <li><span>Storage</span><strong>${build.storage}</strong></li>
          <li><span>Clients</span><strong>${build.clients}</strong></li>
        </ul>
        <p class="note">${build.note}</p>
        <a class="source-link" href="${build.source}" target="_blank" rel="noopener noreferrer">Open source listing</a>
      </article>
    `
    )
    .join("");
}

budgetRange.addEventListener("input", renderBuilds);
statusFilter.addEventListener("change", renderBuilds);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

renderBuilds();
