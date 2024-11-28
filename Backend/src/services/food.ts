import { deleteFood, updateFood } from "../models/food";
import { Food } from "../interfaces/food";
import { findAllFoods, insertFood } from "../models/food";

// Obtener todos los alumnos
export const findAll = async (limit: number, offset: number) => {
  return await findAllFoods(limit, offset);
};

export const insert = async (food: Food) => {
  return await insertFood(food);
};

export const update = async (id: number, food: Food) => {
  return await updateFood(id, food);
};

export const deleteById = async (id: number) => {
  return await deleteFood(id);
};
