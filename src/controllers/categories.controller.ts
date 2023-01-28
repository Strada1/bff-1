import STATUS from 'http-status';
import { Request, Response } from 'express';
import { Category } from '../models/Category.model';

export async function getCategories(req: Request, res: Response) {
  try {
    res.status(STATUS.OK).send({ categories: [] });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { category } = req.body;

    if (!category) {
      return res
        .status(STATUS.BAD_REQUEST)
        .send({ meta: 'required fields are missing' });
    }

    const createdCategory = await Category.create({ category });

    res.status(STATUS.CREATED).send(createdCategory);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function editCategory(req: Request, res: Response) {
  try {
    res.status(STATUS.OK).send({});
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    res.status(STATUS.NO_CONTENT).send({});
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}
