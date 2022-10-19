import { insertUser } from "../../src/backend-data/authentication";
import { validateFields } from "../../src/backend-services/validations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const validation = await validateFields(req.body);

    if (validation.success) {
      const id = await insertUser(req.body);
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
  }
}
