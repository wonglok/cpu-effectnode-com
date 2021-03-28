// import { Models } from "../../../../util/mongo";
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
      let query = {
        userID: req.body.userID,
        published: req.body.published,
        displayName: { $regex: req.body.search || "" },
      };

      if (typeof query.published === "undefined") {
        delete query.published;
      }
      if (typeof req.body.search === "undefined" || !req.body.search) {
        delete req.body.displayName;
      }
      if (typeof query.userID === "undefined") {
        delete query.userID;
        query.published = true;
      }

      let data = await Operations.query({
        //
        name: ModelName,
        perPage: req.body.perPage,
        pageAt: req.body.pageAt,
        query,
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
