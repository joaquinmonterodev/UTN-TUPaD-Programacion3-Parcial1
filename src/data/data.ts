import type { ICategoria } from "../types/categoria";
import type { IProduct } from "../types/product";

const CATEGORIES: ICategoria[] = [
    {
        id: 1,
        nombre: "Hamburguesas",
        descripcion: "Hamburguesas"
    },
    {
        id: 2,
        nombre: "Pizzas",
        descripcion: "Pizzas"
    },
    {
        id: 3,
        nombre: "Papas Fritas",
        descripcion: "Papas Fritas"
    },
    {
        id: 4,
        nombre: "Bebidas",
        descripcion: "Bebidas"
    },
    {
        id: 5,
        nombre: "Milanesas",
        descripcion: "Milanesas"
    },
    {
        id: 6,
        nombre: "Sandwiches",
        descripcion: "Sandwiches"
    },
    {
        id: 7,
        nombre: "Empanadas",
        descripcion: "Empanadas"
    },

]
const PRODUCTS: IProduct[] = [
    {
        id: 1,
        nombre: "Hamburguesa triple",
        descripcion: "Hamburguesa triple smash con mucho cheddar.",
        precio: 25000,
        imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/triple_smash_meat_burger.jpg",
        categoria: CATEGORIES[0]
    },
    {
        id: 2,
        nombre: "Pizza muzzarella",
        descripcion: "Salsa de tomate casera y muzzarella abundante.",
        precio: 18000,
        imagen: "https://quem.com.ar/tienda/wp-content/uploads/2018/05/Pizza-e1584547627773.jpg",
        categoria: CATEGORIES[1]
    },
    {
        id: 3,
        nombre: "Hamburguesa doble con cheddar",
        descripcion: "Doble medallón de carne vacuna, queso cheddar fundido, panceta crocante y salsa especial.",
        precio: 22500,
        imagen: "https://bcnresto.com/img/002189/00000009.jpg?1",
        categoria: CATEGORIES[0]
    },
    {
        id: 4,
        nombre: "Milanesa napolitana con papas",
        descripcion: "Milanesa de ternera con salsa de tomate, jamón cocido, muzzarella gratinada y orégano.",
        precio: 26000,
        imagen: "https://media.a24.com/p/bf7cf44c6a368f7d15dc3a30b8c5c419/adjuntos/296/imagenes/009/236/0009236858/1200x675/smart/el-plato-que-aman-todos-mila-napo-fritas-secretitos-que-ayudan.png",
        categoria: CATEGORIES[4]
    },
    {
        id: 5,
        nombre: "Empanadas de carne cortada a cuchillo",
        descripcion: "Docena de empanadas tradicionales de lomo con cebolla de verdeo, huevo duro y comino.",
        precio: 19500,
        imagen: "https://resizer.glanacion.com/resizer/v2/empanadas-de-carne-cortada-a-cuchillo-con-mix-YTRLESEOGZFU5LU3G4AOBZ2EP4.jpeg?auth=1bc85880de7b6e0e41370aa13090c3d1e8e04fbc6b564b783626d40a493f821f&width=880&height=586&quality=70&smart=true",
        categoria: CATEGORIES[6]
    },
    {
        id: 6,
        nombre: "Lomito completo",
        descripcion: "Bife de lomo tierno con lechuga, tomate, jamón, queso, huevo frito y mayonesa casera.",
        precio: 24000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4nvWNIGfXTysIFNfH5iwlVBEPTvpdcDCgyuHt40dtRA&s=10",
        categoria: CATEGORIES[5]
    }
];
export const getCategories = () => {
    return CATEGORIES;
}
export const getProducts = () => {
    return PRODUCTS;
}
export const crearCategoria = (categoria: ICategoria) => {
    CATEGORIES.push(categoria);
}