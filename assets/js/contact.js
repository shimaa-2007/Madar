document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById("fullName");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const topicSelect = document.getElementById("topic");

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const emailValue = emailInput.value.trim();
    const topicValue = topicSelect.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0125][0-9]{8}$/; 
    //name
    if (nameValue.length < 3) {
      setError(nameInput);
      isValid = false;
    } else setSuccess(nameInput);
    
    // phonee
    if (!phoneRegex.test(phoneValue)) {
      setError(phoneInput);
      isValid = false;
    } else setSuccess(phoneInput);
    
    // email
    if (!emailRegex.test(emailValue)) {
      setError(emailInput);
      isValid = false;
    } else setSuccess(emailInput);
    

    // topic
    if (topicValue === "" || topicValue === null) {
      setError(topicSelect);
      isValid = false;
    } else setSuccess(topicSelect);
    
    // confirm
    if (isValid) {
      window.location.href = "10-confirm.html";
    }
  });

  function setError(inputElement) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  }

  function setSuccess(inputElement) {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
  }
});