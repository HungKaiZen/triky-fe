const baseURL  = "https://backend-serive-v1.onrender.com";
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Lấy dữ liệu từ các input
    const userData = {
        fullName: document.getElementById("fullName").value,
        gender: document.getElementById("gender").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        addresses: [
            {
                apartmentNumber: document.getElementById("apartmentNumber").value,
                floor: document.getElementById("floor").value,
                building: document.getElementById("building").value,
                streetNumber: document.getElementById("streetNumber").value,
                street: document.getElementById("street").value,
                city: document.getElementById("city").value,
                country: document.getElementById("country").value,
                addressType: 2
            }
        ]
    };

    // Gửi request register
    fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Đăng ký thất bại!");
        }
        return response.json();
    })
    .then(data => {
        alert("Đăng ký thành công! Mời bạn đăng nhập.");
        window.location.href = "login.html";  // điều hướng về trang đăng nhập
    })
    .catch(error => {
        alert(error.message);
    });
});
