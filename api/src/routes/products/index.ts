import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../db/productsSchema";

// Products endpoints
const router = Router();

router.get("/", listProducts);
router.post("/", validateData(createProductSchema), createProduct);
router.get("/:id", getProductById);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
