import { z } from "zod";

export const temperatureSchema = z.object({
  turbidez: z
    .number()
    .min(0, { message: "La turbidez debe ser un numero positivo" }),
});
