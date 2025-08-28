import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { changePasswordController, deleteProfileController, getUserController, updatePasswordController, updateUserController } from "../controllers/userController.js";

const router=express.Router();

router.get("/getUser",authMiddleware,getUserController)
router.post("/updateUser",authMiddleware,updateUserController)
router.post("/updatePassword",authMiddleware,updatePasswordController)
router.post("/changePassword",authMiddleware,changePasswordController)
router.get("/deleteProfile",deleteProfileController)

export default router;