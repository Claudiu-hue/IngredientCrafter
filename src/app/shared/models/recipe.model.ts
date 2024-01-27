export class Recipe {
  public contribuitor_id: number;
  public description: string;
  public id: number;
  public ingredients: string[];
  public minutes: number;
  public n_ingredients: number;
  public n_steps: number;
  public name: string;
  public nutrition: number[];
  public steps: string[];
  public submitted: string;
  public tags: string[];

  constructor(
    contribuitor_id: number,
    description: string,
    id: number,
    ingredients: string[],
    minutes: number,
    n_ingredients: number,
    n_steps: number,
    name: string,
    nutrition: number[],
    steps: string[],
    submitted: string,
    tags: string[]
  ) {
    this.contribuitor_id = contribuitor_id;
    this.description = description;
    this.id = id;
    this.ingredients = ingredients;
    this.minutes = minutes;
    this.n_ingredients = n_ingredients;
    this.n_steps = n_steps;
    this.name = name;
    this.nutrition = nutrition;
    this.steps = steps;
    this.submitted = submitted;
    this.tags = tags;
  }
}
