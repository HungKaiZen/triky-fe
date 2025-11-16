// baseConfig.js
// export const baseURL = window.location.hostname.includes("localhost")
//     ? "http://localhost:8080"
//     : "https://triky-be.onrender.com";
export const baseURL = "http://localhost:8080";

export async function load(selector, filePath) {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await res.text();

    if (selector) {
        const container = document.querySelector(selector);
        if (!container) throw new Error(`Selector ${selector} not found`);
        container.innerHTML = html;
        return container;
    } else {
        const temp = document.createElement("div");
        temp.innerHTML = html.trim();
        return temp.firstElementChild;
    }
}
