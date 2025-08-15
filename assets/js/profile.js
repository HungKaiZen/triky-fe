// const baseURL  = "https://backend-serive-v1.onrender.com";
const baseURL  = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function() {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");


    if(!accessToken || !userId) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    fetch(`${baseURL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken,
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
        document.getElementById("upload-avatar").src = data.data.avatarUrl;
        console.log(data.data.avatarUrl);

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


// document.getElementById('avatarInput').addEventListener('change', function(event) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function(e) {
//       document.getElementById('upload-avatar').src = e.target.result;
//     }
//     reader.readAsDataURL(file);
//   }
// });

// // Xử lý form submit bằng JS
// document.getElementById("avatarForm").addEventListener("submit", function(event) {
//   event.preventDefault();

//   const fileInput = document.getElementById("avatarInput");
//   if (!fileInput.files[0]) {
//     alert("Chọn ảnh trước khi upload!");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", fileInput.files[0]);

//   console.log(fileInput.file)

//   const userId = 12;  // giả định userId có sẵn
//   const accessToken = localStorage.getItem("accessToken");

//   fetch(`${baseURL}/user/${userId}/upload-avatar`, {
//     method: "PUT",
//     headers: {
//       "Authorization": "Bearer " + accessToken
//     },
//     body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//     document.getElementById("upload-avatar").src = data.data;
//   })
//   .catch(error => {
//     console.error('Upload lỗi:', error);
//   });
// });

