// routes/temperature.ts
import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFoods,
  updateFood,
} from "../controllers/food";
import validate from "../middlewares/validate";
import { foodSchema } from "../schemas/food";
//import { create } from "domain";

const router = Router();

router.get("/", getFoods);
router.post("/", validate(foodSchema), createFood);
router.put("/:id", validate(foodSchema), updateFood);
router.delete("/:id", deleteFood);

export default router;
