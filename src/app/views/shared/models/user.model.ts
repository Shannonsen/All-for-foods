/**
 * @interface Food
 * @property {number} id : Identificador único del usuario
 * @property {string} email : Correo electrónico del usuario
 * @property {string} user : Alias del usuario
 * @property {string} password : Contraseña del usuario
 * @property {string} token : Token del usuario
 * @property {number[]} follows : Arreglo con los id de los autores a los que sigue el usuario
 * @property {number[]} favorites : Arreglo con los id de las recetas guardadas como favoritas por el usuario
 * @property {number[]} myRecipes : Arreglo con los id de las recetas creadas por el usuario
 * @property {number[]} myFollowRecipes: Arreglo con los id de las recetas de usuarios seguidos
 */
export interface User {
    id: number,
    email: string,
    username: string,
    icon: string,
    description: string,
    password: string,
    status: number,
    token: string,
    follows: number[],
    favorites: number[],
    myRecipes: number[],
    myFollowRecipes: number[],
}
