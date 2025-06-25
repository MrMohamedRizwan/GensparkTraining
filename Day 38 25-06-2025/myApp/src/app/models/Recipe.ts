export class RecipeModel {
  constructor(
    public id: number = 0,
    public image: string = '',
    public name: string = '',
    public cookTimeMinutes: number = 0,
    public cuisine: string = '',
    public ingredients: string[] = []
  ) {}
}
