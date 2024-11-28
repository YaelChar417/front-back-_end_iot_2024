// Tipo para representar un Curso
export interface Food {
  id?: number;
  motor: number;
  ultima_comida?: Date;
}

export interface PaginatedFood {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Food[];
}
