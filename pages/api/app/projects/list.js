// import { Models } from "../../../../util/mongo";
import { getSession } from "next-auth/client";
import * as Operations from "../../../../util/Operations";

export const ModelName = "projects";

export default async (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  await Operations.run(
    async () => {
      if (!req.body.userID) {
        throw new Error("missing userID");
      }

      let data = await Operations.query({
        //
        name: ModelName,
        perPage: req.body.perPage,
        pageAt: req.body.pageAt,
        query: {
          userID: req.body.userID,
          published: true,
        },
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
