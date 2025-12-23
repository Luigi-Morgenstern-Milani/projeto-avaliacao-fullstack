document
  .getElementById("form_cadastro_usuario")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
  
    const senha = document.getElementById("senha").value;

    const dados = {
      nome: nome,
      email: email,
 
      senha: senha
    };

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Cadastro realizado!",
          text: "Você já pode fazer login."
        }).then(() => {
          window.location.href = "login.html";
        });
      } else {
        const erro = await response.text();
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar",
          text: erro || "Erro ao cadastrar usuário"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor."
      });
    }
  });
