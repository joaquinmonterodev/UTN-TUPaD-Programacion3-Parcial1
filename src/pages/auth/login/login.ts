import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { actualizarUsers, getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const storedUsers = getUsers();
const users: IUser[] = storedUsers ? JSON.parse(storedUsers) : [{email: "admin@admin.com", password: "admin", loggedIn: true, role: "admin", cart: []}];

actualizarUsers(users);

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const usuarioBuscado = users.find(u => u.email === valueEmail && u.password === valuePassword);

  if(usuarioBuscado) {
    const user: IUser = {
      email: valueEmail,
      password: valuePassword,
      role: usuarioBuscado.role,
      loggedIn: true,
      cart: usuarioBuscado.cart
    };

    saveUser(user);

    if (usuarioBuscado.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else if (usuarioBuscado.role === "client") {
      navigate("/src/pages/client/home/home.html");
    }
  } else {
    alert("Contraseña incorrecta o usuario inexistente")
  }
});
