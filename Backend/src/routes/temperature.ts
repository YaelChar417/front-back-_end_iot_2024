// routes/temperature.ts
import { Router } from "express";
import {
  createTemperature,
  deleteTemperature,
  getTemperatures,
  updateTemperature,
} from "../controllers/temperature";
import validate from "../middlewares/validate";
import { temperatureSchema } from "../schemas/temperature";
//import { create } from "domain";

const router = Router();

router.get("/", getTemperatures);
router.post("/", validate(temperatureSchema), createTemperature);
router.put("/:id", validate(temperatureSchema), updateTemperature);
router.delete("/:id", deleteTemperature);

export default router;
