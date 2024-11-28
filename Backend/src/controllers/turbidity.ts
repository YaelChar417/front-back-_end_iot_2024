import { Request, Response } from "express";

import { deleteById, findAll, insert, update } from "../services/turbidity";
import { Turbidity } from "../interfaces/turbidity";

// Obtener todos los alumnos
export const getTurbidities = async (req: Request, res: Response) => {
  try {
    // obtener parametros de paginación con valores por defecto
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000000000;

    //calcular offset
    const offset = (page - 1) * limit;

    const courses = await findAll(limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener turbidez", error });
  }
};

export const createTurbidity = async (req: Request, res: Response) => {
  try {
    const turbidity: Turbidity = req.body;
    const newTurbidity = await insert(turbidity);

    const io = req.app.get("io");
    io.emit("newCourseData", newTurbidity);
    res.status(201).json({ message: "Turbidez creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear turbidez", error });
  }
};

export const updateTurbidity = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const turbidity: Turbidity = req.body;
    await update(id, turbidity);
    res.status(201).json({ message: "Turbidez actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la turbidez", error });
  }
};

export const deleteTurbidity = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Turbidez eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar al turbidez", error });
  }
};
