import { Router } from "express";
import { createJWT } from "../controller/auth.controller";

const router = Router();

router.post("/jwt", createJWT);

export default router;