// const baseURL  = "https://triky-be.onrender.com";
const baseURL  = "http://localhost:8080";


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${baseURL}/auth/access`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(async response => {
        const result = await response.json();

        if (!response.ok) {
            // Login thất bại → hiển thị message từ server
            throw new Error(result.message || "Đăng nhập thất bại");
        }

        // Login thành công → trả data
        return result.data;
    })
    .then(data => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("avatarUrl", baseURL + data.avatarUrl);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("username", data.username);
        window.location.href = "index.html"; // chuyển trang tiếp theo
    })
    .catch(error => {
        // Hiển thị lỗi cho người dùng
        const errorElement = document.getElementById("error-msg");
        errorElement.innerText = "Username or password in correct";
        errorElement.style.display = "block";
    });
});
