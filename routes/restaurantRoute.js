import express from "express"
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantByIdController } from "../controllers/restaurantController.js";

const router=express.Router();

router.post("/create",createRestaurantController)
router.get("/getAll",getAllRestaurantController)
router.get("/getById",getRestaurantByIdController)
router.delete("/delete",deleteRestaurantController)

export default router;