
const baseURL  = "https://triky-be.onrender.com";
// const baseURL = "http://localhost:8080";
document.getElementById("setPassword").addEventListener("submit", function(event) {
event.preventDefault()
let password = document.getElementById("password").value
let confirmPassword = document.getElementById("rePassword").value
let token =document.getElementById("verify-token").value;

if(password === confirmPassword) {
    const userData = {
    token: token,
    password: password,
    confirmPassword: confirmPassword
    };


    fetch(`${baseURL}/auth/verify-and-set-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Raw API response:", data);
        if(data.data && data.data.toLowerCase() === "password saved") {
            document.getElementById("msg").innerText = "Xác thực và cài đặt mật nhẩu thành công";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        }else if (data.data.toLowerCase() === "user already enabled"){
            document.getElementById("msg").innerText = "Tài khoản đã được xác thực thành công, Mời bạn đăng nhập";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        }else if (data.data.toLowerCase() === "invalid token"){
            document.getElementById("form__error-verify").innerText = "Mã xác thực không hợp lệ";

        }else if (data.data.toLowerCase() === "token expired"){
            document.getElementById("form__error-verify").innerText = "Mã xác thực đã hết hạn";

        }else if (data.data) { // Nếu API trả lỗi
            let errorMsg = document.getElementById("form__error");
            errorMsg.style.display = "block";
            errorMsg.innerText = data.data;
        }else {
            document.getElementById("form__error-verify").innerText = "Mã xác thực đã hết hạn";
        }
    })
    .catch(error => {
        let errorMsg = document.getElementById("form__error");
        errorMsg.style.display = "block";
        errorMsg.innerText = "Có lỗi xảy ra khi kết nối server!";
    })

}else {
    let errorMsg = document.getElementById("form__error");
    errorMsg.style.display = "block";
    errorMsg.innerText = "Mật khẩu không khớp."
}

})