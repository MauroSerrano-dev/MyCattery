import { addCat } from "../../src/backend-data/cats";

export default async function handler(req, res) {
  if (req.method === "POST") {
      const id = await addCat(req.body);
      res.status(201).json({
        message: "Gatinho Criado com Sucesso!",
        _id: id,
      });
  }
}
