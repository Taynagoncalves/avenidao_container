const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // 🔐 Credenciais fixas do admin
  const adminEmail = "admin@admin.com";
  const adminSenha = "123456";

  if (email === adminEmail && senha === adminSenha) {
    alert("Login realizado com sucesso!");

    // redireciona para o dashboard
    window.location.href = "index.html";
  } else {
    alert("Email ou senha inválidos");
  }
});