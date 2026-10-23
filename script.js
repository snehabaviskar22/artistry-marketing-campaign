/**
 * Artistry — Email Marketing Campaign Landing Page Script (script.js)
 * ===================================================================
 * Purpose:
 * 1. Validate the newsletter signup form on the client side (Name, Email, Consent).
 * 2. Prevent the default browser page reload on form submission.
 * 3. Display clear, accessible error or success messages without storing personal data.
 * 4. Update the collection demonstration notice when a visitor clicks a product card link.
 */

document.addEventListener("DOMContentLoaded", function () {
  // -------------------------------------------------------------------------
  // 1. Select Newsletter Form Elements from the DOM
  // -------------------------------------------------------------------------
  const newsletterForm = document.getElementById("newsletter-form");
  const nameInput = document.getElementById("subscriber-name");
  const emailInput = document.getElementById("subscriber-email");
  const consentCheckbox = document.getElementById("subscriber-consent");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const consentError = document.getElementById("consent-error");
  const formFeedback = document.getElementById("form-feedback");

  // -------------------------------------------------------------------------
  // 2. Helper Function: Check Basic Email Format
  // -------------------------------------------------------------------------
  // Checks that the email contains text before '@', an '@' symbol, a domain name,
  // a dot '.', and a domain extension without any spaces.
  function isValidEmailFormat(emailValue) {
    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return basicEmailPattern.test(emailValue);
  }

  // -------------------------------------------------------------------------
  // 3. Helper Function: Clear All Previous Validation Messages
  // -------------------------------------------------------------------------
  function clearValidationErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    consentError.textContent = "";

    nameInput.classList.remove("input-invalid");
    emailInput.classList.remove("input-invalid");
    nameInput.removeAttribute("aria-invalid");
    emailInput.removeAttribute("aria-invalid");
    consentCheckbox.removeAttribute("aria-invalid");

    formFeedback.hidden = true;
    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";
  }

  // -------------------------------------------------------------------------
  // 4. Handle Newsletter Form Submission
  // -------------------------------------------------------------------------
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      // Stop the form from submitting to a server or reloading the page
      event.preventDefault();

      // Clear any previous error or success messages before validating
      clearValidationErrors();

      // Read and trim text values from the inputs
      const enteredName = nameInput.value.trim();
      const enteredEmail = emailInput.value.trim();
      const isConsentGiven = consentCheckbox.checked;

      let isFormValid = true;

      // Validate 1: Name must not be empty
      if (enteredName === "") {
        nameError.textContent = "Please enter your full name.";
        nameInput.classList.add("input-invalid");
        nameInput.setAttribute("aria-invalid", "true");
        isFormValid = false;
      }

      // Validate 2: Email must not be empty and must follow a basic email format
      if (enteredEmail === "") {
        emailError.textContent = "Please enter your email address.";
        emailInput.classList.add("input-invalid");
        emailInput.setAttribute("aria-invalid", "true");
        isFormValid = false;
      } else if (!isValidEmailFormat(enteredEmail)) {
        emailError.textContent = "Please enter a valid email address (for example, name@example.com).";
        emailInput.classList.add("input-invalid");
        emailInput.setAttribute("aria-invalid", "true");
        isFormValid = false;
      }

      // Validate 3: Consent checkbox must be checked
      if (!isConsentGiven) {
        consentError.textContent = "Please check the consent box to test the newsletter form.";
        consentCheckbox.setAttribute("aria-invalid", "true");
        isFormValid = false;
      }

      // Display overall feedback based on validation outcome
      if (!isFormValid) {
        formFeedback.hidden = false;
        formFeedback.classList.add("feedback-error");
        formFeedback.textContent =
          "Please review the highlighted fields above and correct any missing or invalid information.";
        return;
      }

      // Valid submission: Show clear frontend demonstration message
      // IMPORTANT: No data is saved to localStorage, sessionStorage, cookies, or any backend.
      formFeedback.hidden = false;
      formFeedback.classList.add("feedback-success");
      formFeedback.textContent =
        "Thank you, " +
        enteredName +
        "! Your sample submission (" +
        enteredEmail +
        ") passed client-side validation. Please note: This is a frontend-only demonstration and no subscription has actually been saved or sent to a mailing list.";

      // Reset the form inputs after a valid demonstration submission
      newsletterForm.reset();
    });
  }

  // -------------------------------------------------------------------------
  // 5. Small Usability Enhancement: Product Card Demo Action Feedback
  // -------------------------------------------------------------------------
  const productLinks = document.querySelectorAll(".product-action");
  const demoNoticeBox = document.getElementById("demo-purchase-notice");
  const demoNoticeHeading = document.getElementById("demo-notice-heading");
  const demoNoticeMessage = document.getElementById("demo-notice-message");

  productLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const productName = link.getAttribute("data-product-name");
      const productPrice = link.getAttribute("data-product-price");

      if (productName && demoNoticeHeading && demoNoticeMessage) {
        demoNoticeHeading.textContent =
          "Selected Piece: " + productName + " (Sample Price: " + productPrice + ")";
        demoNoticeMessage.textContent =
          'You clicked on "' +
          productName +
          '". Because Artistry is a promotional frontend demonstration rather than a live e-commerce store, online checkout is not enabled. Join our sample newsletter below to explore how campaign lead capture works.';
      }

      if (demoNoticeBox) {
        demoNoticeBox.focus();
      }
    });
  });
});
