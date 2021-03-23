import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    return res.status(200).json(session.user);
  } else {
    return res.status(403).json({ msg: "needs login" });
  }
};
