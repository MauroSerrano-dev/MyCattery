import { addToStock } from "../../src/backend-data/stock";

export default async function handler(req, res) {
  if (req.method === "POST") {
      const id = await addToStock(req.body);
      res.status(201).json({
        message: "Item Adicionado ao Stock com Sucesso!",
            });
  }
}
