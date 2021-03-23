import { ModelName } from "./index";
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
    let userID = Operations.getID(token.uid);
    let made = await Operations.create({
      name: ModelName,
      data: {
        _id: projectID,
        userID,
        displayName: data.displayName,
        slug: Operations.getSlug(data.displayName),
      },
    });

    res.json(made);
  }, Operations.getErrorHandler({ res }));
};

// mongoose.Types.ObjectId
