import { addCat, deleteCat, getAllCats } from "../../src/backend-data/cats";

export default async function handler(req, res) {
  if (req.method === "POST") {
      const id = await addCat(req.body);
      res.status(201).json({
        message: "Gatinho Criado com Sucesso!",
        _id: id,
      });
  }
  else if (req.method === "DELETE") {
    const { id } = req.body;
    await deleteCat(id);
    res.status(200).json({ mensagem: "Cat deleted."});
  }
  else if (req.method === "GET") {
    return res.status(200).json({ cats: await getAllCats() });
  }
}
