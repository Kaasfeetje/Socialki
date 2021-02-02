import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from "../controllers/userController";
import { currentUser } from "../middlewares/currentUser";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = express.Router();

router.use(currentUser, requireAdmin);

//@desc   Gets all users
//@route  GET /api/v1/users
//@access Admin
router.get("/", getAllUsers);
//@desc   Creates a user
//@route  POST /api/v1/users
//@access Admin
router.post("/", createUser);

//@desc   Gets a user
//@route  GET /api/v1/users/:userId
//@access Admin
router.get("/:userId", getUser);
//@desc   Updates a user
//@route  PUT /api/v1/users/:userId
//@access Admin
router.put("/:userId", updateUser);
//@desc   Deletes a user
//@route  DELETE /api/v1/users/:userId
//@access Admin
router.delete("/:userId", deleteUser);

export { router as userRouter };
