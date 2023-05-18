/**
 * @interface Food
 * @property {number} id : Identificador único de la receta
 * @property {string} title : Nombre de la receta
 * @property {User} user : Identificador único del user con su información
 * @property {string[]} ingredients : Arreglo con los nombres de los ingredientes de la receta
 * @property {string} image : Url de la imagen de la receta
 * @property {string} steps : Pasos para realizar la receta
 * @property {number} rate : Calificación de la receta
 * @property {string} description : Descripción de la receta
 * @property {string} createdAt : Fecha de creación de la receta en forma dd-MM-yyyy
 * @property {string} lastModified : Fecha de última actualización de la receta en forma dd-MM-yyyy
 */
export interface Food{
  id: number,
  title: string,
  user: {
    id: number
    username: string,
    icon: string,
  },
  ingredients: string[],
  image?: string,
  steps: string;
  rate: number;
  description: string;
  createdAt: Date,
  lastModified: string,
}
