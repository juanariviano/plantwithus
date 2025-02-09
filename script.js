const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

let raised = 0;
const goal = 1000;

function openModal() {
  document.getElementById("donationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("donationModal").style.display = "none";
}

function confirmDonation() {
  let donationAmount = parseInt(
    document.getElementById("donationAmount").value
  );
  let paymentMethod = document.getElementById("paymentMethod").value;

  if (!donationAmount || donationAmount < 1) {
    alert("Please enter a valid amount!");
    return;
  }

  if (raised < goal) {
    raised += donationAmount;
    if (raised > goal) raised = goal;
    updateProgressBar();
  }

  alert(`thankyou for your donation!`);
  closeModal();
}

function updateProgressBar() {
  let progress = (raised / goal) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("raisedAmount").textContent = raised;
}
