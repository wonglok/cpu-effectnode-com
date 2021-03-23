// import { Models } from "../../../../util/mongo";
import { getSession } from "next-auth/client";
import * as Operations from "../../../../util/Operations";

export const ModelName = "projects";

export default async (req, res) => {
  if (req.method.toUpperCase() !== "GET") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  await Operations.run(
    async () => {
      let data = await Operations.query({
        //
        name: ModelName,
        perPage: req.query.perPage,
        pageAt: req.query.pageAt,
        query: {
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
