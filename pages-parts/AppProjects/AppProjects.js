import { createState, useState } from "@hookstate/core";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import * as Projects from "../../util/apis/Projects";

const projects = createState([]);

export function ProjectItem({ item }) {
  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 inline-block mr-3 mb-3">
      {item.name}
    </div>
  );
}

export function CreateProject({ session, projects }) {
  const state = useState(projects);
  const projectTitle = useState("");

  const addProject = async () => {
    let newProject = await Projects.create({
      userID: session?.user?.uid,
      displayName: projectTitle.value,
    });
    state.set((e) => {
      e.unshift(newProject);
      return e;
    });
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        value={projectTitle.value}
        onInput={(e) => projectTitle.set(e.target.value)}
        className="p-2 px-4 bg-gray-100 rounded-lg mr-3"
      ></input>
      <button
        className="p-2 px-4 bg-gray-600 text-white rounded-lg mr-3"
        onClick={() => {
          addProject();
        }}
      >
        Add Project
      </button>
    </div>
  );
}

export function ListProjects({ session, projects }) {
  const state = useState(projects);
  const pageAt = useState(0);

  useEffect(() => {
    Projects.list({
      userID: session?.user?.uid,
      pageAt: pageAt.value,
      perPage: 25,
    }).then((prjs) => {
      console.log(prjs);
      state.set(prjs);
    });
  }, [pageAt.value]);

  return (
    <div>
      <div className="mb-3">
        <button
          className="p-2 px-4 bg-gray-500 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => (e - 1 <= 0 ? 0 : e - 1));
          }}
        >
          Back
        </button>
        <button
          className="p-2 px-4 bg-gray-500 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => e + 1);
          }}
        >
          Next
        </button>
      </div>
      {state.get().map((e) => (
        <div key={e._id}>
          {e.displayName}
          {e.slug}
        </div>
      ))}
    </div>
  );
}

export default function AppProjects() {
  const [session, loading] = useSession();
  const state = useState(projects);

  return !loading && session ? (
    <div>
      <CreateProject session={session} projects={state}></CreateProject>
      <ListProjects session={session} projects={state}></ListProjects>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

//

//

//
