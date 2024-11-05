import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";
import { verifyToken } from "../../middlewares/authMiddleware";

// Products endpoints
const router = Router();

router.get("/", listProducts);
router.post("/", verifyToken, validateData(createProductSchema), createProduct);
router.get("/:id", verifyToken, getProductById);
router.put(
  "/:id",
  verifyToken,
  validateData(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
