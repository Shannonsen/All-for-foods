export interface Food{
  id: number,
  name: string,
  author: string, 
  ingredients: string[],
  image?: string,
  category?: string,
  process: string[];
  rating: number;
  description: string;
}
