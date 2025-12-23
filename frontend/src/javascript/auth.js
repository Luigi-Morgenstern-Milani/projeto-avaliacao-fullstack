async function fetchComAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado.");
    window.location.href = "login.html";
    return;
  }

  options.headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    alert("Sessão expirada. Faça login novamente.");
    localStorage.clear();
    window.location.href = "login.html";
    return;
  }

  return response;
}
