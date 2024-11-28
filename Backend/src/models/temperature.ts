import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedTemperature, Temperature } from "../interfaces/temperature";

// Obtener todos los alumnos
export const findAllTemperatures = async (
  limit: number,
  offset: number,
): Promise<PaginatedTemperature> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM temperature LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Consulta para obtener el total de registros
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM temperature",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as Temperature[],
  };
};

export const insertTemperature = async (
  temperature: Temperature,
): Promise<Temperature> => {
  const { temperatura } = temperature;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO temperature (temperatura) 
     VALUES (?)`,
    [temperatura],
  );
  const { insertId } = result;
  return { id: insertId, ...temperature };
};

export const updateTemperature = async (
  id: number,
  temperature: Temperature,
): Promise<Temperature> => {
  const { temperatura } = temperature;
  await pool.query<ResultSetHeader>(
    `UPDATE temperature
       SET temperatura = ?
       WHERE id = ?;`,
    [temperatura, id],
  );

  return { id, ...temperature };
};

export const deleteTemperature = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>("DELETE FROM temperature WHERE id = ?", [
    id,
  ]);
  return id;
};
