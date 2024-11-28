import { z } from "zod";

export const foodSchema = z.object({
  motor: z
    .number()
    .min(0, { message: "La rotacion debe ser un numero positivo" }),
});
