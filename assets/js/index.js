const baseURL  = "http://localhost:8080";
// Khi trang được load
window.addEventListener("load", () => {
  const accessToken = localStorage.getItem("accessToken");
  const fullName = localStorage.getItem("fullName");
  const username = localStorage.getItem("username");
  if (!accessToken) {
    // Chưa đăng nhập → hiện nút login và ẩn logout, avatar
    document.getElementById("login-btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("user-avatar").style.display = "none";
    

    // document.getElementById("login-btn").onclick = () => {
    //   window.location.href = "login.html";
    // };
  } else {
    // Đã có token → ẩn login, hiện logout, avatar
    
    document.getElementById("register-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
    document.getElementById("avatar").style.visibility = "visible";

    document.getElementById("user__info-fullName").innerText = fullName;
    document.getElementById("user__info-username").innerText = "@" +username;

    // Lấy avatar từ localStorage hoặc gọi API
    const avatarUrl = localStorage.getItem("avatarUrl");
    if (avatarUrl) {
      // const img = document.getElementById("user-avatar");
      const imgs = document.getElementsByClassName("user__avatar");
      for(let img of imgs) {
        img.src=avatarUrl;
      }
      // img.src = avatarUrl;
    }

    document.getElementById("logout-btn").onclick = () => {
      // Xóa token và avatar
      localStorage.removeItem("accessToken");
      localStorage.removeItem("avatar");

      // Chuyển về trang login
      window.location.href = "index.html";
    };
  }
});


// document.addEventListener("DOMContentLoaded", function() {
//     const accessToken = localStorage.getItem("accessToken");
//     const userId = localStorage.getItem("userId");


//     if(!accessToken || !userId) {
//         alert("Bạn chưa đăng nhập!");
//         window.location.href = "login.html";
//         return;
//     }

//     fetch(`${baseURL}/user/${userId}`, {
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + accessToken,
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if(!response) {
//             throw new Error("Không thể lấy thông tin user!");
//         }
//         return response.json();
//     })
//     .then(data => {
//         document.getElementById("fullName").innerText = data.data.firstName + " " + data.data.lastName
//         document.getElementById("phoneNumber").innerText = data.data.phoneNumber
//         document.getElementById("email").innerText = data.data.email

//         const address = data.data.addresses[0];
//         if(address) {
//             const addressString = 
//             `Phòng số ${address.apartmentNumber}, Tầng ${address.floor}, Tòa ${address.building}, ` +
//             `Số ${address.streetNumber} ${address.street}, ${address.city}, ${address.country}`;
//              document.getElementById("address").innerText = addressString;
//         } else {
//             document.getElementById("address").innerText = "Chưa có địa chỉ";
        
//             }
//         })
//     .catch(error => {
//         console.error(error);
//         alert("Có lỗi khi lấy thông tin user");
//     });

// });




// Xử lý khi user nhấn nút Back mà trình duyệt load cache (pageshow event)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Reload lại trang để cập nhật trạng thái login
    window.location.reload();
  }
});