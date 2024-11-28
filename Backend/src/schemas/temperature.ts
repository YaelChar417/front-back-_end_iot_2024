import { z } from "zod";

export const temperatureSchema = z.object({
  temperatura: z
    .number()
    .min(-55, { message: "La temperatura no puede ser menor a -55 grados" })
    .max(120, { message: "La temperatura no puede ser mayor a 120 grados" }),
});
