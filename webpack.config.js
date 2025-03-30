import e, { request } from "express";
import * as express from "express";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const app = express();

app.use(bodyParser.json());
app.route("https://www.api.4gul.kanemia.com/auth/login").post(loginRoute);

const RSA_PRIVATE_KEY = fs.readFileSync("./private.pem");

export function loginRoute(req: express.Request, res: express.Response){

}

