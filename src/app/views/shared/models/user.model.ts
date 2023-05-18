/**
 * @interface Food
 * @property {number} id : identificador único del usuario
 * @property {string} email : correo electrónico del usuario
 * @property {string} username : alias del usuario
 * @property {string} icon : icono del usuario
 * @property {description} : descripción del usuario
 * @property {string} password : Contraseña del usuario
 * @property {number} status: estatus del usuario: activado o desactivado.
 * @property {string} token : Token del usuario
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
}
