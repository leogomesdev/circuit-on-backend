import { ObjectId } from 'mongodb';

export class ImageNestedDocument {
  public backgroundColor?: string;
  constructor(
    public _id: ObjectId,
    public title: string,
    public category: string,
    paramBackgroundColor: string,
  ) {
    if (paramBackgroundColor && paramBackgroundColor !== null) {
      this.backgroundColor = paramBackgroundColor;
    }
  }
}
