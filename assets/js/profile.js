// const baseURL  = "https://triky-be.onrender.com";
// const baseURL = "http://localhost:8080";
import { baseURL } from './baseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const fullName = localStorage.getItem("fullName");
    const username = localStorage.getItem("username");
    console.log("userId:", userId);
    console.log("accessToken:", accessToken);

    const logoutBtn = document.getElementById("logout-btn");

    const navbarAction = document.getElementById("navbarAction");
    const avatarAction = document.getElementById("avatar");
    const fullNameElement = document.getElementById("user__info-fullName");
    const usernameElement = document.getElementById("user__info-username");
    if (accessToken) {
        navbarAction.style.visibility = "hidden";
        avatarAction.style.visibility = "visible";
        // Đã login -> gọi API lấy thông tin user
        fetch(`${baseURL}/auth/profile/${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}` // gửi token cho backend
            }
        })
        .then(async response => {
            const result = await response.json();
            if (!response.ok) {
                window.location.href = "./login.html";
            }

            if(result.status === 403) {
                logoutBtn.click();
            }

            return result;
        })
        .then(result => {
            const user = result.data;
            // Lưu user detail vào localStorage (nếu cần truyền sang)
            localStorage.setItem("userDetail", JSON.stringify(user));

            // set user information
            // set avatar
            const avatarUrl = baseURL + user.avatarUrl;
            if (avatarUrl) {
                const userAvatars = document.getElementsByClassName("user__avatar");
                for(const avatar of userAvatars) {
                    avatar.src = avatarUrl;
                }
                document.getElementById("upload-avatar").src = avatarUrl;
            }
            // set fullname
            document.getElementById("fullName").innerText = user.firstName + user.lastName;
            fullNameElement.innerText = fullName;
            usernameElement.innerText = "@" +username;
            // set registedred
                let created = new Date(user.created);
                let registedred = created.toLocaleDateString("en-GB");
            document.getElementById("registered").innerText =  registedred;
            // set email
            document.getElementById("email").innerText = user.email;

            // set phone number
            document.getElementById("phoneNumber").innerText = user.phone;

            // set address
            user.addresses.forEach(address => {
                document.getElementById("address").innerText = "Nhà số " + address.apartmentNumber + " Tòa số " + address.building + " Đường số " + address.streetNumber + " "  + address.street + " "  + address.city + " " + address.country;
            });
        })
        .catch(error => {
            console.error("Có lỗi xảy ra:", error);
            alert("Không thể tải thông tin user!");
        });
    } else {
        alert("Bạn chưa login!");
        window.location.href = "./login.html";
    }
});

// avatar update model
document.getElementById("update-avatar").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById('avatarPreview').src = localStorage.getItem("avatarUrl");
    const avatarModel = document.getElementById("avatar-modal");
    console.log("avatarModel")
    avatarModel.classList.add("active");
    closeAvatarModel();
})

function closeAvatarModel() {
    document.getElementById("avatar__modal-close").addEventListener("click", function(event) {
        const avatarModel = document.getElementById("avatar-modal");
        event.preventDefault();
        avatarModel.classList.remove("active");
    })
}

// update avatar
document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('avatarInput');
    const confirmBtn = document.getElementById('confirmAvatarBtn');
    const avatarForm = document.getElementById('avatarForm');
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");


    // 1️⃣ Mở hộp thoại chọn file khi bấm nút "Tải ảnh lên"
    uploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // 2️⃣ Khi chọn file xong -> hiển thị ảnh preview
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const url = URL.createObjectURL(file);
        avatarPreview.src = url;
    });

    // 3️⃣ Xử lý khi bấm "Cập nhật avatar"
    confirmBtn.addEventListener("click", async(e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if(!file) {
            document.getElementById("error-file").innerText = "Please select a avatar to update";
            return;
        }

        // tạo FormData để gửi file
        const formData = new FormData();
        formData.append("file", file);
        // disable nút để tránh bấm nhiều lần
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Đang tải...';

        try {
            const response = await fetch(`${baseURL}/auth/${userId}/avatar`, {
                method: "POST",
                body: formData,
                headers: {"Authorization": "Bearer " + accessToken}

            });
            let result;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                result = {data: await response.text()};
            }

            if(response.ok) {
                const avatarUrl = baseURL + result.data + "?t=" + new Date().getTime(); // bẻ cache
                // cập nhật avatar mới
                updateAllAvatars(avatarUrl);
                localStorage.setItem("avatarUrl", avatarUrl);
            }else {
                alert('Lỗi: ' + (result.error || 'Không thể tải ảnh.'));
            }
        }catch (err) {
            console.error(err);
            alert('Đã xảy ra lỗi khi tải ảnh.');
        }finally {
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Cập nhật avatar';
        }



    });
})

// update all avatar for img.avatr-img classes
function updateAllAvatars(avatarUrl) {
    document.querySelectorAll("img.avatar-img").forEach(img => {
        img.src = avatarUrl;
    })
}


