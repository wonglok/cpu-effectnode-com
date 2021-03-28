import { ModelName } from "./list";
import { getToken } from "next-auth/jwt";
import * as Operations from "../../../../util/Operations";

export default async (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  await Operations.run(async () => {
    let token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
      throw new Error("needs login");
    }

    let data = req.body;
    let slug = Operations.getSlug(data.displayName);
    let takenRes = await Operations.query({
      name: ModelName,
      perPage: 25,
      pageAt: 0,
      query: {
        slug,
      },
    });

    if (takenRes.length >= 1) {
      throw new Error("name already taken");
    } else {
      res.json({ ok: true });
    }
  }, Operations.getErrorHandler({ res }));
};

// mongoose.Types.ObjectId
