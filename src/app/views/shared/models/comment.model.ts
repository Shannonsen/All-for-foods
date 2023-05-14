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
