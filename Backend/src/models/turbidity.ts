import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedTurbidity, Turbidity } from "../interfaces/turbidity";

// Obtener todos los alumnos
export const findAllTurbidities = async (
  limit: number,
  offset: number,
): Promise<PaginatedTurbidity> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM turbidity LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Consulta para obtener el total de registros
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM turbidity",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as Turbidity[],
  };
};

export const insertTurbidity = async (
  turbidity: Turbidity,
): Promise<Turbidity> => {
  const { turbidez } = turbidity;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO turbidity (turbidez) 
     VALUES (?)`,
    [turbidez],
  );
  const { insertId } = result;
  return { id: insertId, ...turbidity };
};

export const updateTurbidity = async (
  id: number,
  turbidity: Turbidity,
): Promise<Turbidity> => {
  const { turbidez } = turbidity;
  await pool.query<ResultSetHeader>(
    `UPDATE turbidity
       SET turbidez = ?
       WHERE id = ?;`,
    [turbidez, id],
  );

  return { id, ...turbidity };
};

export const deleteTurbidity = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>("DELETE FROM turbidity WHERE id = ?", [id]);
  return id;
};
