const baseURL  = "https://triky-be.onrender.com";
// const baseURL  = "http://localhost:8080";


document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Lấy dữ liệu từ các input
    let uiBirthday =  document.getElementById("dateOfBirth").value;
    let date = new Date(uiBirthday);
    let dtoBirthday = date.toLocaleDateString("en-GB");
    const userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,
        birthday: dtoBirthday,
        email: document.getElementById("email").value,
        phone: document.getElementById("phoneNumber").value,
        username: document.getElementById("username").value,
        
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
        window.location.href = "verify-set-password.html";
    })
    .catch(error => {
        alert(error.message);
    });
});
