import { createState } from "@hookstate/core";
import { getSession } from "next-auth/client";
import * as ProjectsAPI from "../../util/apis/ProjectsAPI";

export const Session = createState(null);
export const Project = createState(null);

export const loadProject = ({ projectID }) => {
  return Promise.all([
    //
    getSession(),
    ProjectsAPI.detail({ _id: projectID }),
  ]).then(
    ([
      //
      session,
      project,
    ]) => {
      Session.set(session);
      Project.set(project);

      return module.exports;
    }
  );
};
