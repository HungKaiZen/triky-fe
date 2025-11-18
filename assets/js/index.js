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
      const userAvatars = document.getElementsByClassName("user__avatar");
      for(const avatar of userAvatars) {
          avatar.src = avatarUrl;
      }
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

// Xử lý khi user nhấn nút Back mà trình duyệt load cache (pageshow event)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Reload lại trang để cập nhật trạng thái login
    window.location.reload();
  }
});