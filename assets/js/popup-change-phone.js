// const baseURL  = "https://triky-be.onrender.com";
// const baseURL  = "http://localhost:8080";

import { baseURL } from './baseConfig.js';

const openPopupBtn = document.getElementById("open-change-phone-btn");
const popup = document.getElementById("popup-change-phone");
const closePopupBtn = document.getElementById("change-phone__close-btn");
const phoneNumberText = document.getElementById("phoneNumber");
const phoneNumberInput = document.getElementById("phoneNumberInput");
const formSubmit = document.getElementById("change-phone-form");
const phoneNumberError = document.getElementById("phone-number__error");
// open popup
openPopupBtn.addEventListener("click", (e) => {
    popup.classList.add("active");
    phoneNumberInput.value = phoneNumberText.textContent;
})

// close poput
closePopupBtn.addEventListener("click", (e) => {
    popup.classList.remove("active");
})

// handle when submit form
formSubmit.addEventListener("submit", (e) => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    
    if(!accessToken) {
        phoneNumberError.innerText = "Please login";
        return;
    }

    if(!isValidPhone(phoneNumberInput.value)) {
        phoneNumberError.innerText = "Invalid phone number, please re-enter";
        return;
    }

    alert(accessToken)
    alert(phoneNumberInput.value)

    fetch(`${baseURL}/auth/change-phone`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({
            id: userId,
            phoneNumber: phoneNumberInput.value
        })
    })
    .then(async response => {
        const result = await response.json();
    
        if(!response.ok) {
            throw new Error(result.message || "Server error");
        }
        return result.data;
    })
    then(data => {
        phoneNumberError.innerText = data.message;
    })
    then(error => {
        phoneNumberError.innerText = error.message;
    })
    .catch(error => {
        formError.innerText = error;
    })


})

function isValidPhone(phone) {
  const regex = /^(0|\+84)(3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return regex.test(phone);
}
