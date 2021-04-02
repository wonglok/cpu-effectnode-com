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
    let itemQuery = await Operations.findOne({
      name: ModelName,
      _id: Operations.getID(data._id),
    });

    if (itemQuery) {
      res.json(itemQuery);
    } else {
      res.status(404).json({ isError: true, msg: "not found" });
    }
  }, Operations.getErrorHandler({ res }));
};

// mongoose.Types.ObjectId
