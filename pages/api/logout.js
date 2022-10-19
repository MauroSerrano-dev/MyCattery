import { deleteSession } from "../../src/backend-data/sessions";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;
    await deleteSession(token);
    res.status(200).json({ mensagem: "Sessão terminada."});
  }
}
