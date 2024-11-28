import { Request, Response } from "express";

import { deleteById, findAll, insert, update } from "../services/food";
import { Food } from "../interfaces/food";

// Obtener todos los alumnos
export const getFoods = async (req: Request, res: Response) => {
  try {
    // obtener parametros de paginación con valores por defecto
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000000000;

    //calcular offset
    const offset = (page - 1) * limit;

    const courses = await findAll(limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener comida", error });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const food: Food = req.body;
    const newFood = await insert(food);

    const io = req.app.get("io");
    io.emit("newFoodData", newFood);
    res.status(201).json({ message: "Comida creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear comida", error });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const food: Food = req.body;
    await update(id, food);
    res.status(201).json({ message: "Comida actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la comida", error });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Comida eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar al comida", error });
  }
};
