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
      if (!req.body._id) {
        throw new Error("missing object _id");
      }

      let token = await getToken({ req, secret: process.env.JWT_SECRET });
      if (!token.isAdmin) {
        if (!token) {
          throw new Error("needs login");
        }

        if (token.uid !== req.body.userID) {
          throw new Error("bad access right");
        }
      }
      let updates = req.body.updates;
      if (updates.displayName) {
        let slug = Operations.getSlug(updates.displayName); //
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
          updates.slug = slug;
        }
      }

      await Operations.updateOne({
        name: ModelName,
        _id: req.body._id,
        updates,
      });

      let dataset = await Operations.query({
        name: ModelName,
        perPage: 25,
        pageAt: 0,
        query: {
          _id: req.body._id,
        },
      });

      let data = dataset[0];

      console.log(data);

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
