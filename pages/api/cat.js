import { getCatById } from "../../src/backend-data/cats";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ cat: await getCatById(req.headers.id) });
  }
}
