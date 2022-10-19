const express = require("express");
const { ObjectId } = require("mongodb");
import { insertUser } from "../backend-data/authentication";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// app.post("/signup", async (req, res) => {
async function signup(u) {
  const user = {
    email,
    password,
    passwordConfirmation,
  };
  // = req.body;
  await insertUser({
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
  });

  const validation = validateFields(req.body);
  if (validation.success) {
    const id = await addUser({
      email,
      password,
      passwordConfirmation,
    });
    res.status(201).json({
      message: "Utilizador Criado com Sucesso!",
      _id: id,
    });
  } else {
    res.status(400).json({
      message: "Os dados introduzidos não são válidos.",
      errors: validation.errors,
    });
  }
  return user;
}

app.listen(PORT, () => console.log("À escuta na porta " + PORT));

export { signup };
