import { db } from '../ext/db';

export interface ICategory {
  title: string;
  readonly __v?: number;
}

const CategorySchema = new db.Schema<ICategory>({
  title: String,
  __v: { type: Number, select: false },
});

export const Category = db.model<ICategory>('Category', CategorySchema);
