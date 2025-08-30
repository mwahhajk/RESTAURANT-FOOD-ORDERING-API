import express from "express"
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantByIdController } from "../controllers/restaurantController.js";

const router=express.Router();

router.post("/create",createRestaurantController)
router.get("/getAll",getAllRestaurantController)
router.get("/getById/:id",getRestaurantByIdController)
router.delete("/delete/:id",deleteRestaurantController)

export default router;