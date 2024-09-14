import { Router } from "express";
import usersRouter from "./user.mjs";
import productsRouter from "./product.mjs";
import authRouter from "./auth.mjs";
import cartRouter from "./cart.mjs";
const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);
router.use(cartRouter);

export default router;
