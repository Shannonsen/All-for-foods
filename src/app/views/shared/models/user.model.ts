export interface User {
    id: number,
    email: string,
    user: string,
    description: string,
    password: string,
    token: string,
    follows: number[],
    favorites: number[],
    myRecipes: number[],
    myFollowRecipes: number[],
}
