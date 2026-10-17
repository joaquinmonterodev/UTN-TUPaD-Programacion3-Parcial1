import { crearCategoria } from "../../../data/data";
import type { ICategoria } from "../../../types/categoria";
import { logout } from "../../../utils/auth";

const buttonLogout = document.getElementById("logoutButton") as HTMLLIElement;
const crearCategoriaBtn = document.getElementById("crear-categoria-btn") as HTMLButtonElement;
const crearProductoBtn = document.getElementById("crear-producto-btn") as HTMLButtonElement;
const body = document.querySelector("body") as HTMLBodyElement;
const form = document.getElementById("form-creacion") as HTMLFormElement;

crearCategoriaBtn.addEventListener("click", () => {
  const form = document.createElement("form");
  form.classList.add("form-creacion-bg");
  form.id = "form-creacion";
  form.innerHTML = `
    <div class="form-creacion">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre-categoria">
      </div>
      <div>
        <label for="desc">Descripcion:</label>
        <textarea name="desc" id="desc-categoria" cols="30" rows="10" placeholder="Escribe una descripción aquí"></textarea>
      </div>
      <div>
        <button class="agregar-btn" type="submit">Crear</button>
      </div>
      <div id="close-btn" class="close-btn">
        x
      </div>
    </div>
  `;
  body.appendChild(form);
  const cerrarBtn = document.getElementById("close-btn") as HTMLButtonElement;
  cerrarBtn.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    form.remove();
  })
  const nombreCategoria = document.getElementById("nombre-categoria") as HTMLInputElement;
  const descCategoria = document.getElementById("desc-categoria") as HTMLTextAreaElement;

  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const nuevaCategoria: ICategoria = {
      id: 1,
      nombre: nombreCategoria.value,
      descripcion: descCategoria.value
    }
    crearCategoria(nuevaCategoria);
    form.remove();
  })
});

buttonLogout?.addEventListener("click", () => {
  logout();
});