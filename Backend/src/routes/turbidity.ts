// routes/temperature.ts
import { Router } from "express";
import {
  createTurbidity,
  deleteTurbidity,
  getTurbidities,
  updateTurbidity,
} from "../controllers/turbidity";
import validate from "../middlewares/validate";
import { temperatureSchema } from "../schemas/turbidity";
//import { create } from "domain";

const router = Router();

router.get("/", getTurbidities);
router.post("/", validate(temperatureSchema), createTurbidity);
router.put("/:id", validate(temperatureSchema), updateTurbidity);
router.delete("/:id", deleteTurbidity);

export default router;
