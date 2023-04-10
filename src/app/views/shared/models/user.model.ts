export interface User {
    id: number,
    email: string,
    user: string,
    password: string,
    token: string,
    follows: number[],
    favorites: number[],
    myRecipes: number[]
}
