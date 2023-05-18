/**
 * @interface Comment
 * @property {number} id : Identificador unico del comentario
 * @property {recipeId} id: Identificador unico de la receta
 * @property {User} user : usuario que comento
 * @property {string} comment : comentario
 * @property {Date} createdAt : fecha de creación
 * @property {Date} modifiedAt : fecha de modificación
 */
export interface Comment {
    id: number,
    recipeId: number,
    user: {
      id: number
      username: string
    }
    comment: string,
    createdAt: Date,
    modifiedAt: Date,
}
