import { getProducts } from "../../../data/data";
import type { ICartItem } from "../../../types/product";
import { checkAuhtUser, logout } from "../../../utils/auth";
import { calcularTotal, getCart, removeFromCart } from "../../../utils/cart";
import { getUSer } from "../../../utils/localStorage";

const buttonLogout = document.getElementById("logoutButton") as HTMLLIElement;
const productosContenedor = document.getElementById("productos") as HTMLDivElement;
const storedUser = getUSer();
const user = storedUser ? JSON.parse(storedUser) : {};
const productos = getProducts();
const productosCart = getCart(user);

const mostrarProductos = (listaProductos: ICartItem[]) => {
  productosContenedor.innerHTML = "";
  if(listaProductos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay productos en tu carrito."
    productosContenedor.appendChild(p);
  } else {
    listaProductos.forEach((producto: ICartItem) => {
      const articulo = document.createElement("article");
      articulo.classList.add("cart-item");
      articulo.innerHTML = `
          <img src=${producto.producto.imagen}>
          <h3 class="nombre-producto">${producto.producto.nombre}</h3>
          <p>Cantidad: ${producto.cantidad}</p>
          <p>Subtotal: <strong>$${producto.subtotal}</strong></p>
          <div>
              <button class="agregar-btn" data-id=${producto.producto.id}>Eliminar</button>
          </div>
      `;
      productosContenedor.appendChild(articulo);
    })
  }
  const total = document.createElement("p");
  total.classList.add("productos__subtotal");
  total.innerHTML = `Subtotal: $ ${calcularTotal(user)}`
  productosContenedor.appendChild(total);
}

const buscarProductoPorId = (id: number) => {
  const productoBuscado = productos.find((producto) => {
    return producto.id === id;
  })
  return productoBuscado;
}

const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
};
initPage();
mostrarProductos(productosCart);

buttonLogout?.addEventListener("click", () => {
  logout();
});

productosContenedor.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const enlace = target.closest<HTMLAnchorElement>(".agregar-btn");
  if (enlace) {
    e.preventDefault();
    const id = Number(enlace.dataset.id);
    const productoBuscado = buscarProductoPorId(id);
    if (productoBuscado) {
      removeFromCart(user, productoBuscado);
      mostrarProductos(productosCart);
    }
  }
})