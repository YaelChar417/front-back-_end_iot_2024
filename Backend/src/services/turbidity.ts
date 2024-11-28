import { deleteTurbidity, updateTurbidity } from "../models/turbidity";
import { Turbidity } from "../interfaces/turbidity";
import { findAllTurbidities, insertTurbidity } from "../models/turbidity";

// Obtener todos los alumnos
export const findAll = async (limit: number, offset: number) => {
  return await findAllTurbidities(limit, offset);
};

export const insert = async (turbidity: Turbidity) => {
  return await insertTurbidity(turbidity);
};

export const update = async (id: number, turbidity: Turbidity) => {
  return await updateTurbidity(id, turbidity);
};

export const deleteById = async (id: number) => {
  return await deleteTurbidity(id);
};
