import { deleteTemperature, updateTemperature } from "../models/temperature";
import { Temperature } from "../interfaces/temperature";
import { findAllTemperatures, insertTemperature } from "../models/temperature";

// Obtener todos los alumnos
export const findAll = async (limit: number, offset: number) => {
  return await findAllTemperatures(limit, offset);
};

export const insert = async (temperature: Temperature) => {
  return await insertTemperature(temperature);
};

export const update = async (id: number, temperature: Temperature) => {
  return await updateTemperature(id, temperature);
};

export const deleteById = async (id: number) => {
  return await deleteTemperature(id);
};
