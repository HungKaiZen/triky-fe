const baseURL  = "https://backend-serive-v1-1.onrender.com";
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if(!token || !userId) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    fetch(`${baseUrl}/user/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(!response) {
            throw new Error("Không thể lấy thông tin user!");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("fullName").innerText = data.data.fullName
        document.getElementById("phoneNumber").innerText = data.data.phoneNumber
        document.getElementById("email").innerText = data.data.email
        const address = data.data.addresses[0];
        if(address) {
            const addressString = 
            `Phòng số ${address.apartmentNumber}, Tầng ${address.floor}, Tòa ${address.building}, ` +
            `Số ${address.streetNumber} ${address.street}, ${address.city}, ${address.country}`;
             document.getElementById("address").innerText = addressString;
        } else {
            document.getElementById("address").innerText = "Chưa có địa chỉ";
        
            }
        })
    .catch(error => {
        console.error(error);
        alert("Có lỗi khi lấy thông tin user");
    });

});