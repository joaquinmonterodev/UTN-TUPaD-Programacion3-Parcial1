import type { IUser } from "../types/IUser";
import type { ICartItem, IProduct } from "../types/product";
import { actualizarUsers, getUsers, saveUser } from "./localStorage"

const storedUsers = getUsers();
const users: IUser[] = storedUsers ? JSON.parse(storedUsers) : [];

const buscarUsuario = (usuario: IUser) => {
  return users.find((u) => u.email === usuario.email);
}

export const getCart = (usuario: IUser) => {
  const usuarioBuscado = buscarUsuario(usuario);
  const cart = usuarioBuscado ? usuarioBuscado.cart : [];
  return cart;
}

export const addToCart = (usuario: IUser, producto: IProduct) => {
  const usuarioBuscado = buscarUsuario(usuario);
  if (usuarioBuscado) {
    const cart = getCart(usuario);
    const productoBuscado = cart.find((p) => {return p.producto.id === producto.id;});
    if(productoBuscado){
      productoBuscado.cantidad++;
      productoBuscado.subtotal = productoBuscado.cantidad * producto.precio;
    } else {
      const item: ICartItem = {
        producto: producto,
        cantidad: 1,
        subtotal: producto.precio
      }
      cart.push(item);
    }
    saveUser(usuarioBuscado);
    actualizarUsers(users);
  }
}

export const removeFromCart = (usuario: IUser, producto: IProduct) => {
  const usuarioBuscado = buscarUsuario(usuario);

  if (usuarioBuscado) {
    const cart = getCart(usuario);
    const productoIndex = cart.findIndex((p) => p.producto.id === producto.id);

    if (productoIndex !== -1) {
      cart.splice(productoIndex, 1);

      saveUser(usuarioBuscado);
      actualizarUsers(users);
    }
  }
};

export const calcularTotal = (usuario: IUser) => {
  const cart = getCart(usuario);
  let total = 0;
  if (cart) {
      total = cart.reduce((acumulador, producto) => {
      return acumulador + producto.subtotal;
    }, 0)
  }
  return total;
}