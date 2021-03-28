// import { Models } from "../../../../util/mongo";
import { getToken } from "next-auth/jwt";
import * as Operations from "../../../../util/Operations";

export const ModelName = require("./list").ModelName;

export default async (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  await Operations.run(
    async () => {
      let token = await getToken({ req, secret: process.env.JWT_SECRET });
      if (!token) {
        throw new Error("needs login");
      }

      if (!req.body._id) {
        throw new Error("missing object _id");
      }

      if (token.uid !== req.body.userID) {
        throw new Error("bad access right");
      }

      let data = await Operations.deleteOneByID({
        name: ModelName,
        _id: req.body._id,
      });

      res.status(200).json(data);
    },
    async (err) => {
      res.status(500).json({
        isError: true,
        message: err.message,
      });
    }
  );
};
