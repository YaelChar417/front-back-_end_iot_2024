// Tipo para representar un Curso
export interface Temperature {
  id?: number;
  temperatura: number;
}

export interface PaginatedTemperature {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Temperature[];
}
