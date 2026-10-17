import { getCategories, getProducts } from "../../../data/data";
import type { ICategoria } from "../../../types/categoria";
import type { IProduct } from "../../../types/product";
import { mensaje } from "../../../utils/alert";
import { checkAuhtUser, logout } from "../../../utils/auth";
import { addToCart } from "../../../utils/cart";
import { getUSer } from "../../../utils/localStorage";

const buttonLogout = document.getElementById("logoutButton") as HTMLLIElement;
const menuCategorias = document.getElementById("categorias-lista") as HTMLUListElement;
const productosContenedor = document.getElementById("productos") as HTMLDivElement;
const productosTitle = document.getElementById("productos-title") as HTMLHeadingElement;
const verTodos = document.getElementById("ver-todos") as HTMLAnchorElement;
const buscador = document.getElementById("buscador") as HTMLFormElement;
const buscadorTexto = document.getElementById("buscador-texto") as HTMLInputElement;
const categorias = getCategories();
const productos = getProducts();
const storedUser = getUSer();
const user = storedUser ? JSON.parse(storedUser) : {};

const mostrarProductos = (listaProductos: IProduct[]) => {
  productosContenedor.innerHTML = "";
  if(listaProductos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay productos que coincidan con la búsqueda."
    productosContenedor.appendChild(p);
  } else {
    listaProductos.forEach((producto: IProduct) => {
      const articulo = document.createElement("article");
        articulo.classList.add("producto");
        articulo.innerHTML = `
            <img src=${producto.imagen}>
            <h3 class="nombre-producto">${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio}</strong></p>
        `;
        productosContenedor.appendChild(articulo);
    })
  }
}

const buscarProductosPorCategoria = (nombre: string) => {
  const productosBuscados = productos.filter((producto) => {
    return producto.categoria.nombre === nombre;
  })
  return productosBuscados;
}

const buscarProductoPorNombre = (nombre: string) => {
  const query = nombre.trim().toLowerCase();
  const productosBuscados = productos.filter((producto) => {
    return producto.nombre.toLowerCase().includes(query);
  })
  return productosBuscados;
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
    "admin"
  );
};
initPage();
mostrarProductos(productos);

buttonLogout?.addEventListener("click", () => {
  logout();
});

categorias.forEach((categoria: ICategoria) => {
  const li = document.createElement("li");
  li.innerHTML = `<a class="categoria__enlace">${categoria.nombre}</a>`
  menuCategorias.appendChild(li);
})

menuCategorias.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const enlace = target.closest<HTMLAnchorElement>(".categoria__enlace");
  if (enlace) {
    e.preventDefault();
    const categoria = enlace.textContent?.trim();

    if (categoria) {
      mostrarProductos(buscarProductosPorCategoria(categoria));
      productosTitle.innerText = categoria;
    }
  }
})

productosContenedor.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const enlace = target.closest<HTMLAnchorElement>(".agregar-btn");
  if (enlace) {
    e.preventDefault();
    const id = Number(enlace.dataset.id);
    const productoBuscado = buscarProductoPorId(id);
    if (productoBuscado) {
      addToCart(user, productoBuscado);
      mensaje(productoBuscado.nombre);
    }
  }
})

verTodos.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  mostrarProductos(productos);
  productosTitle.innerText = "Todos los productos";
})

buscador.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  mostrarProductos(buscarProductoPorNombre(buscadorTexto.value));
  productosTitle.innerText = `Buscaste: ${buscadorTexto.value}`;
  buscadorTexto.value = "";
})