import { Request, Response } from "express";

import { deleteById, findAll, insert, update } from "../services/temperature";
import { Temperature } from "../interfaces/temperature";

// Obtener todos los alumnos
export const getTemperatures = async (req: Request, res: Response) => {
  try {
    // obtener parametros de paginación con valores por defecto
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000000000;

    //calcular offset
    const offset = (page - 1) * limit;

    const courses = await findAll(limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener temperatura", error });
  }
};

export const createTemperature = async (req: Request, res: Response) => {
  try {
    const course: Temperature = req.body;
    const newTemperature = await insert(course);

    const io = req.app.get("io");
    io.emit("newCourseData", newTemperature);
    res.status(201).json({ message: "Temperatura creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear temperatura", error });
  }
};

export const updateTemperature = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const temperature: Temperature = req.body;
    await update(id, temperature);
    res.status(201).json({ message: "Temperatura actualizado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar el temperatura", error });
  }
};

export const deleteTemperature = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Temperatura eliminado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al eliminar al temperatura", error });
  }
};
