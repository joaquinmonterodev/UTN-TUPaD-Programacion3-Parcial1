import { getCategories, getProducts } from "../../data/data";
import type { ICategoria } from "../../types/categoria";
import type { IProduct } from "../../types/product";
import { navigate } from "../../utils/navigate";

const buttonLogin = document.getElementById("loginButton") as HTMLLIElement;
const menuCategorias = document.getElementById("categorias-lista") as HTMLUListElement;
const productosContenedor = document.getElementById("productos") as HTMLDivElement;
const productosTitle = document.getElementById("productos-title") as HTMLHeadingElement;
const verTodos = document.getElementById("ver-todos") as HTMLAnchorElement;
const buscador = document.getElementById("buscador") as HTMLFormElement;
const buscadorTexto = document.getElementById("buscador-texto") as HTMLInputElement;
const categorias = getCategories();
const productos = getProducts();

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
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio}</strong></p>
            <div>
                <button class="agregar-btn")">Agregar al carrito</button>
            </div>
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

mostrarProductos(productos);

buttonLogin?.addEventListener("click", () => {
  navigate("/src/pages/auth/login/login.html");
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
    navigate("/src/pages/auth/login/login.html")
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