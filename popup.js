<!-- Triggering redeploy - March 26 -->
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("close");
  const subscribeBtn = popup.querySelector("button");
  const emailInput = popup.querySelector("input[type='email']");

  // Show popup after 3 seconds
  setTimeout(() => {
    popup.style.display = "flex";
  }, 3000);

  // Close the popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Submit email to Google Sheets
  subscribeBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("https://api.sheetbest.com/sheets/5276babe-64a4-44b8-82d4-3a3da8031e89", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email })
      });

      if (response.ok) {
        alert("Thank you for subscribing!");
        popup.style.display = "none";
      } else {
        alert("There was a problem with your subscription. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    }
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
