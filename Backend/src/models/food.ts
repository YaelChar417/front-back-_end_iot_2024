import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedFood, Food } from "../interfaces/food";

export const findAllFoods = async (
  limit: number,
  offset: number,
): Promise<PaginatedFood> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM food LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Consulta para obtener el total de registros
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM food",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as Food[],
  };
};

export const insertFood = async (food: Food): Promise<Food> => {
  const { motor } = food;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO food (motor) 
     VALUES (?)`,
    [motor],
  );
  const { insertId } = result;
  return { id: insertId, ...food };
};

export const updateFood = async (id: number, food: Food): Promise<Food> => {
  const { motor, ultima_comida } = food;
  await pool.query<ResultSetHeader>(
    `UPDATE food
       SET motor = ?,
       WHERE id = ?;`,
    [motor, ultima_comida, id],
  );

  return { id, ...food };
};

export const deleteFood = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>("DELETE FROM food WHERE id = ?", [id]);
  return id;
};
