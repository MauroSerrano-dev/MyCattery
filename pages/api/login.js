import { addSession, getSessionByToken } from "../../src/backend-data/sessions";
import {
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../../src/backend-data/users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { usernameOrEmail, password } = req.body;

    const userByUsername = await getUserByUsername(usernameOrEmail);
    const userByEmail = await getUserByEmail(usernameOrEmail);
    let user = null;

    if (!userByEmail && !userByUsername) {
      return res.status(404).json({
        message: "O utilizador não foi encontrado!",
      });
    }
    if (!userByEmail) user = userByUsername;
    else user = userByEmail;

    if (user.password !== password) {
      return res.status(401).json({
        message: "A password introduzida é inválida!",
      });
    }

    const token = await addSession(user._id);
    res.status(200).json({ token });
  }
  
  else if (req.method === "GET") {
    const session = await getSessionByToken(req.headers.token);
    const user = await getUserById(session.username);
    return res.status(200).json({ user: user });
  }
}
