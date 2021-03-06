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
    let projectID = Operations.getID();
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
      data.displayName += `-${Operations.getID()}`;
      // throw new Error("name already taken");
    }

    let userID = Operations.getID(token.uid);
    let made = await Operations.create({
      name: ModelName,
      data: {
        _id: projectID,
        userID,
        displayName: data.displayName,
        slug,
      },
    });

    res.json(made);
  }, Operations.getErrorHandler({ res }));
};

// mongoose.Types.ObjectId
