import { baseURL } from './baseConfig.js';
const openPopup = document.getElementById("open-change-password-btn");
const closePopup = document.getElementById("change-password__close-btn");
const popup = document.getElementById("popup-change-password");
const form = document.getElementById("change-password-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const error = document.getElementById("password__error");
// open popup
openPopup.addEventListener("click", () => {
  popup.classList.add("active");
})

// close popup
closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
})

// handle form when submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!localStorage.getItem("accessToken")) {
    window.location.href = "./login.html";
  }

  if(password.value !== confirmPassword.value) {
    error.style.display = "block";
    error.innerText = "New password and confirm password do not match";
  }

  if(password.value.length < 6) {
    error.style.display = "block";
    error.innerText = "Password too short";
  }

  console.log(error);

  fetch(`${baseURL}/auth/change-pwd`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
      id: localStorage.getItem("userId"),
      password: password.value,
      confirmPassword: confirmPassword.value
    })
  })
  .then(async response => {
    const result = await response.json();
    if(!response) {
      throw new Error(result.data || "Server error");
    }
    password.value = "";
    confirmPassword.value = "";
    return result;
    })
    .then(result => {
      console.log(result)
      error.style.display = "block";
      error.innerText = result.message;
    })
    .catch(error => {
      error.style.display = "block";
      error.innerText = message;
    })
})