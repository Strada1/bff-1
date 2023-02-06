import { db } from '../ext/db';

export interface ICategory {
  title: string;
  readonly __v?: number;
}

const CategorySchema = new db.Schema<ICategory>({
  title: { type: 'String', required: true },
  __v: { type: Number, select: false },
});

export const Category = db.model<ICategory>('Category', CategorySchema);
