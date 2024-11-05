import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

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
