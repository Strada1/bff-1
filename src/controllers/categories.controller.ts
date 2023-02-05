import STATUS from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as categoriesService from '../services/categories.service';

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await categoriesService.getCategories();

    res.status(STATUS.OK).send(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;
    const category = await categoriesService.getCategory(categoryId);

    res.status(STATUS.OK).send(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createdCategory = await categoriesService.createCategory(req.body);

    res.status(STATUS.CREATED).send(createdCategory);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;
    const updatedCategory = await categoriesService.updateCategory(
      categoryId,
      req.body
    );

    res.status(STATUS.OK).send(updatedCategory);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;
    await categoriesService.deleteCategory(categoryId);

    res.status(STATUS.NO_CONTENT).send();
  } catch (error: any) {
    next(error);
  }
}
