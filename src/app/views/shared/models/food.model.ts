/**
 * @interface Food
 * @property {number} id : Identificador único de la receta
 * @property {string} name : Nombre de la receta
 * @property {number} author : Identificador único del autor
 * @property {string[]} ingredients : Arreglo con los nombres de los ingredientes de la receta
 * @property {string} image : Url de la imagen de la receta
 * @property {string} category : Nombre de la categoría a la cual pertenece la receta
 * @property {string[]} process : Arreglo de pasos para realizar la receta
 * @property {number} rating : Calificación de la receta
 * @property {string} description : Descripción de la receta
 * @property {string} creationDate : Fecha de creación de la receta en forma dd-MM-yyyy
 * @property {string} lastModified : Fecha de última actualización de la receta en forma dd-MM-yyyy
 */
export interface Food{
  id: number,
  name: string,
  author: number,
  ingredients: string[],
  image?: string,
  category?: string,
  process: string[];
  rating: number;
  description: string;
  creationDate: string,
  lastModified: string,
}
