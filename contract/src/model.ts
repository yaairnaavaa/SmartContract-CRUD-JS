export class Model {
  sender: string;
  id: number;
  prop1: string;

  constructor({ sender, id, prop1 }: Model) {
    this.sender = sender;
    this.id = id;
    this.prop1 = prop1;
  }
}