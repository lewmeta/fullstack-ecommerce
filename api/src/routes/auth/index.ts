import { Router } from "express";
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { validateData } from "../../middlewares/validationMiddleware";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema";
import { db } from "../../db";

const router = Router();

const generateUserToken = (user: any) => {
    return jwt.sign({ userId: user.id, role: user.role }, 'your-secret', {
      expiresIn: '30d',
    });
  };

router.post("/register", validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody;
        data.password = await bcrypt.hash(data.password, 10);
    
        const [user] = await db.insert(usersTable).values(data).returning();
    
        // @ts-ignore
        delete user.password;
        const token = generateUserToken(user);
    
        res.status(201).json({ user, token });
      } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
      }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res.status(401).json({ error: "Authentication failed!" });

      return;
    }

    // create a jwt token;
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your-secret",
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });

    console.log(email, password);
    res.send(200);
  } catch (error) {
    res.status(500).send("Something went wrong, that's all we know!");
  }
});
export default router;
