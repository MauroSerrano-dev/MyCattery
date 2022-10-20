import { addToStock, deleteItem, getAllItems, updateStock } from "../../src/backend-data/stock";

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
  else if (req.method === "PATCH") {
    const { itemAtt } = req.body;
    const itemId = itemAtt.newItem._id;
    delete itemAtt.newItem._id;
    const stock = await updateStock(itemId, itemAtt);
    return res.status(200).json({ stock: stock });
  }
}
