// Tipo para representar un Curso
export interface Turbidity {
  id?: number;
  turbidez: number;
}

export interface PaginatedTurbidity {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Turbidity[];
}
