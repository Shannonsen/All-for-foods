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
