import express from "express";
import UserDao from "../data/UserDao.js";
import { factory } from "../debug.js";

const debug = factory(import.meta.url);
const router = express.Router();
export const userDao = new UserDao();
const endpoint = "/login";



router.post(endpoint, async (req, res, next) => {
    try {
        debug(`${req.method} ${req.path} called..`);

        debug(`Validate payload..`);
        const { email, password } = req.body;
        if (!email || !passowrd) {
            throw new ApiError(400, "You must provide email and password!")
        }

        debug(`Find user..`);
        const users = await userDao.readAll({ email });
        if (users.length === 0) {
            throw new ApiError(403, "Incorrect email or password!")
        }
        // we know email is unique
        const user = users[0];

        debug(`Verify password..`);
        //    - password does not match? 403
        const valid = verifyPassword(password, user.password);
        if (!valid) {
            throw new ApiError(403, "Incorrect email or password!")
        }

        debug(`Prepare response..`);
        const token = createToken({ user: {
                id: user.id
            }})
        res.status(201).json(
            {
                status: 201,
                message: "Successfully authenticated!",
                data: {
                    name: user.name,
                    email: user.email
                }

            }
        )

    } catch (err) {
        next(err);
    }
});

export default router;

