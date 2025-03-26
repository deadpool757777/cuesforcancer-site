// popup.js - Controls popup behavior for newsletter signup and Google Sheets integration

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("close");
  const subscribeBtn = popup.querySelector("button");
  const emailInput = popup.querySelector("input[type='email']");

  // Show popup after short delay
  setTimeout(() => {
    popup.style.display = "flex";
  }, 1500);

  // Close the popup on clicking "No Thanks"
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup using keyboard
  closeBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      popup.style.display = "none";
    }
  });

  // Subscribe button handler
  subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    // Replace with your actual Sheet.best or Google Apps Script URL
    const sheetUrl = "https://api.sheetbest.com/sheets/5276babe-64a4-44b8-82d4-3a3da8031e89";

    fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for subscribing!");
          popup.style.display = "none";
        } else {
          alert("There was an error submitting your email. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Network error. Please try again later.");
      });
  });
});
