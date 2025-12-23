document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) {
        alert("Email ou senha inválidos");
        return;
      }

      const data = await response.json();

   
      localStorage.setItem("accessToken", data.accessToken);

  
      window.location.href = "clientes.html";

    } catch (err) {
      alert("Erro ao conectar com o servidor");
    }
  });
});
