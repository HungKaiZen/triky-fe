const baseURL  = "https://backend-serive-v1.onrender.com";
fetch(`${baseURL}/auth/access`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: username,
    password: password,
    platform: "WEB",
    deviceToken: "string"
  })
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(`Error ${response.status}: ${text}`);
    });
  }
  return response.json();
})
.then(data => {
  const token = data.data.accessToken;
  const userId = data.data.userId;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  window.location.href = "index-logined.html";
  console.log('Đăng nhập thành công:', data);
})
.catch(error => {
  alert(error.message);
});
