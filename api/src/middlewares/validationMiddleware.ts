import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { createProductSchema } from "../db/productsSchema";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(req.body, Object.keys(createProductSchema.shape));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        res.status(400).json({ error: "Invalid data", details: errorMessage });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
