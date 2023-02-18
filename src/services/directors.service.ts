import { Types } from 'mongoose';
import { IDirector, Director } from '../models/director.model';

export function getDirectors() {
  return Director.find().lean();
}

export function getDirector(id: string | Types.ObjectId) {
  return Director.findById(id).lean();
}

export function createDirector(director: IDirector) {
  return Director.create(director);
}

export function updateDirector(
  id: Types.ObjectId | string,
  data: Partial<IDirector>
) {
  return Director.findByIdAndUpdate(id, data, { new: true });
}

export function deleteDirector(id: string | Types.ObjectId) {
  return Director.findByIdAndDelete(id);
}
