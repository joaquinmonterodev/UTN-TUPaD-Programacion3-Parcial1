import type { IUser } from "../../../types/IUser";
import { actualizarUsers, getUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const storedUsers = getUsers();
const users: IUser[] = storedUsers ? JSON.parse(storedUsers) : [{email: "admin@admin.com", password: "admin", loggedIn: true, role: "admin"}];

actualizarUsers(users);

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const valueEmail = inputEmail.value;
    const valuePassword = inputPassword.value;

    if(users.some(u => u.email === valueEmail)) {
        alert("Usuario ya existente");
        return;
    }

    const user: IUser = {
        email: valueEmail,
        password: valuePassword,
        loggedIn: true,
        role: "client",
        cart: []
    }

    users.push(user);
    actualizarUsers(users);
    navigate("/src/pages/auth/login/login.html");
})