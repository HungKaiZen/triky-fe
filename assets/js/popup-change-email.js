// const baseURL  = "https://triky-be.onrender.com";
// const baseURL  = "http://localhost:8080";

import { baseURL } from './baseConfig.js';

const popupBtn = document.getElementById("open-change-email-btn");
const popupCloseBtn = document.getElementById("change-email__close-btn");
const popup = document.getElementById("popup-change-email");
const emailText = document.getElementById("email");
const emailInput = document.getElementById("emailInput");
const updateForm = document.getElementById("change-email-form");
const formError = document.getElementById("email__error");


// show popup when click 
popupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("active");
    emailInput.value = emailText.textContent;
})

// close popup
popupCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("active");
})

// handle call api when click submit btn
updateForm.addEventListener("submit", (e) => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const emailValue = emailInput.value;

    if(!accessToken)  {
        formError.innerText = "Please login";
        return;
    }

    if(!isValidEmail(emailValue)) {
        formError.innerText("Invalid email address, please re enter")
        return;
    }

    fetch(`${baseURL}/auth/change-email`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({
            id: userId,
            email: emailValue
        })
    })
    .then(async response => {
        const result = await response.json();
        if(!response.ok) {
            throw new Error(result.data || "Server error")
        }
        return result.data;
    })
    .then(data => {
        formError.innerText = "success";
    })
    .catch(error => {
        formError.innerText = error;
    })
})


function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

