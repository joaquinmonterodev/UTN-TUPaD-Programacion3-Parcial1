import type { ICategoria } from "./categoria";

export interface IProduct {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagen: string,
    categoria: ICategoria
}

export interface ICartItem {
    producto: IProduct,
    cantidad: number,
    subtotal: number
}