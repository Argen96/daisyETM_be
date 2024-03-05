import express from "express";
import cors from "cors";
import { errorHandler } from "./src/error/errorHandler.js";
import asyncHandler from "./src/middlewares/asyncHandler.js";
import {
  signUpValidator,
  logInValidator,
} from "./src/validation/validation.users.js";
import { validateInvoice  } from "./src/validation/validation.invoices.js";
import { signUp, logIn } from "./src/controller/user.controller.js";
import auth from "./src/middlewares/auth.js";
import {
  addInvoice,
  showInvoices,
  removeInvoice,
  updateInvoice
} from "./src/controller/invoice.controller.js";

const port = 80;
const app = express();
app.use(cors());
app.use(express.json());

app.post(
  "/api/sign-up",
  signUpValidator,
  asyncHandler(async (request, response) => {
    const newUser = await signUp(request);
    response.status(200);
    response.json(newUser);
  })
);

app.post(
  "/api/log-in",
  logInValidator,
  asyncHandler(async (request, response) => {
    const user = await logIn(request);
    response.status(200);
    response.json(user);
  })
);
app.post(
  "/api/add-invoice",
  auth,validateInvoice,
  asyncHandler(async (request, response) => {
    const newInvoice = await addInvoice(request);
    response.status(200);
    response.json(newInvoice);
  })
);

app.get(
  "/api/invoices",
  auth,
  asyncHandler(async (request, response) => {
    const result = await showInvoices(request);
    response.status(200);
    response.json(result);
  })
);

app.delete(
  "/api/invoice/:id",
  auth,
  asyncHandler(async (request, response) => {
    const result = await removeInvoice(request);
    response.status(200);
    response.json({ message: result });
  })
);

app.put(
  "/api/invoice/:id",
  auth,validateInvoice,
  asyncHandler(async (request, response) => {
    const result = await updateInvoice(request);
    response.status(200);
    response.json({ message: result });
  })
);

app.use(errorHandler);

app.listen(port, () => console.log(`Port is available in port ${port}`));
