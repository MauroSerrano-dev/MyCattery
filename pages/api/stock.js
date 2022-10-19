import { addToStock, deleteItem, getAllItems } from "../../src/backend-data/stock";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const id = await addToStock(req.body);
    res.status(201).json({
      message: "Item Adicionado ao Stock com Sucesso!",
    });
  }
  else if (req.method === "DELETE") {
    const { id } = req.body;
    await deleteItem(id);
    res.status(200).json({ mensagem: "Item deleted." });
  }
  else if (req.method === "GET") {
    return res.status(200).json({ items: await getAllItems() });
  }
}
