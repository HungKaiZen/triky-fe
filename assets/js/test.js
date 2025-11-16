import { load } from './baseConfig.js';

export class Popup {
  constructor(templatePath, containerSelectorOrElement) {
  this.templatePath = templatePath;

  if (typeof containerSelectorOrElement === "string") {
    this.container = document.querySelector(containerSelectorOrElement);
  } else if (containerSelectorOrElement instanceof HTMLElement) {
    this.container = containerSelectorOrElement;
  } else {
    throw new Error("Invalid container: must be a selector or HTMLElement");
  }

  if (!this.container) {
    throw new Error("Popup container not found");
  }

  this.popupElement = null;
}


    async init() {
        // Load template HTML
        this.popupElement = await load(null, this.templatePath);
        this.popupElement.classList.add("popup"); // style class của bạn
        this.container.appendChild(this.popupElement);

        // Close button
        const closeBtn = this.popupElement.querySelector(".popup__close-btn");
        closeBtn.addEventListener("click", () => this.close());

        // Form submit
        const form = this.popupElement.querySelector("form");
        if (form) form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    open(initialData = {}) {
        this.popupElement.classList.add("active");
        if(initialData.email) {
            const input = this.popupElement.querySelector("#emailInput");
            input.value = initialData.email;
        }
    }

    close() {
        this.popupElement.classList.remove("active");
    }

    async handleSubmit(e) {
        e.preventDefault();
        const input = this.popupElement.querySelector("#emailInput");
        const error = this.popupElement.querySelector("#form__error");

        if(!input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            error.innerText = "Invalid email, please re-enter";
            return;
        }

        // Call API update email
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");
        try {
            const res = await fetch("http://localhost:8080/auth/change-email", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ id: userId, email: input.value })
            });
            const result = await res.json();
            if(!res.ok) throw new Error(result.data || "Server error");
            error.innerText = "Success!";
        } catch(err) {
            error.innerText = err;
        }
    }
}
