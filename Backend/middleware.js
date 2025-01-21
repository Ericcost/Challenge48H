/**
 *
 * MIDDLEWARES
 *
 * Functions that run before the controllers to:
 * - enrich the req/res objects
 * - check conditions, such as tokens
 *
 */
import { verify } from "jsonwebtoken";

const middlewares = {
	verifyToken(req, res, next) {
		const authorization = req.headers["authorization"];

		if (!authorization) {
			return res.status(403).send("No token provided");
		}

		const token = authorization.split(" ")[1];

		try {
			const decoded = verify(token, process.env.JWT_SECRET);
			req.username = decoded.username;
		} catch (err) {
			return res.status(401).send("Invalid token");
		}

		next();
	},
};

export default middlewares;
