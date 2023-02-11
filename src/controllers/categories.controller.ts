import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import { SortOrder } from 'mongoose';
import * as categoriesService from '../services/categories.service';
import ApiError from '../shared/ApiError';

export const getCategories = asyncHandler(async (req, res) => {
  const { sort } = req.query as {
    sort: SortOrder;
  };

  const categories = await categoriesService.getCategories({ sortOrder: sort });

  res.status(STATUS.OK).send(categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await categoriesService.getCategory(categoryId);

  if (!category) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  res.status(STATUS.OK).send(category);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const createdCategory = await categoriesService.createCategory({ title });

  res.status(STATUS.CREATED).send(createdCategory);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { title } = req.body;
  const updatedCategory = await categoriesService.updateCategory(categoryId, {
    title,
  });

  if (!updatedCategory) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  res.status(STATUS.OK).send(updatedCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const deletedCategory = await categoriesService.deleteCategory(categoryId);

  if (!deletedCategory) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  res.status(STATUS.NO_CONTENT).send();
});
