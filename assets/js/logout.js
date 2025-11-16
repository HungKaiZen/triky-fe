document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
        // 1. Xóa token và userId khỏi localStorage
        console.log(logoutBtn)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        // Nếu bạn lưu thêm dữ liệu user khác, xóa luôn
        localStorage.removeItem("userEmail");
        // hoặc xóa tất cả: localStorage.clear();

        // 2. Chuyển hướng về trang login
        window.location.href = "/login.html"; // sửa đường dẫn login của bạn

        // 3. (Tùy chọn) Gọi API logout backend
        /*
        fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        }).then(() => {
            window.location.href = "/login.html";
        });
        */
    });
});
