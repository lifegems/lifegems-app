export class Tag {
  constructor(public name: string, public article: string) {}

  public toString() {
     return `${this.name}.${this.article}`;
  }
}