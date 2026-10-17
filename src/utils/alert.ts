const body = document.querySelector("body") as HTMLBodyElement;

export const mensaje = (nombre: string) => {
  const div = document.createElement("div");
  div.classList.add("popup-bg");
  div.innerHTML = `
  <div class="popup">
    <p>${nombre} ha sido agregado al carrito!</p>
  </div>
  `
  body.appendChild(div);
  setTimeout(() => {div.remove();}, 1000);
}