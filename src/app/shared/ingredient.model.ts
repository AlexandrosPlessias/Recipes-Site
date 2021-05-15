export class Ingredient {
  constructor(public name: string, public amount: number) {}

  toString(){
    return this.name + ' (' +this.amount + ')';
  }
}
