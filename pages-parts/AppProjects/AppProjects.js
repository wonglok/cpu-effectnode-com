import { useRouter } from "next/router";
import { createState, useState } from "@hookstate/core";
import { session, useSession } from "next-auth/client";
import { useEffect } from "react";
import * as ProjectsAPI from "../../util/apis/ProjectsAPI";

const ProjectsState = createState([]);
const SessionState = createState(false);

export function ProjectItem({ item }) {
  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 inline-block mr-3 mb-3">
      {item.name}
    </div>
  );
}

export function CreateProject() {
  const projects = useState(ProjectsState);
  const session = useState(SessionState);
  const title = useState("My Project Title");
  const errMsg = useState("");

  const addProject = async () => {
    let newProject = await ProjectsAPI.create({
      userID: session.value?.user?.uid,
      displayName: title.value || "new project",
    }).then(
      (e) => {
        errMsg.set("");
        return e;
      },
      (err) => {
        errMsg.set(err);
        return Promise.reject(err);
      }
    );

    projects.set((e) => {
      e.unshift(newProject);
      return e;
    });
    title.set("");
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        value={title.value}
        onInput={(e) => {
          title.set(e.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.code === "Enter") {
            addProject();
          }
        }}
        className="p-2 px-4 bg-gray-100 rounded-lg mr-3 placeholder-gray-400"
        placeholder="My New Project Title"
      ></input>

      <button
        className="p-2 px-4 bg-gray-600 text-white rounded-lg mr-3"
        onClick={() => {
          addProject();
        }}
      >
        Add Project
      </button>
      <div className={"py-2 px-4 text-red-500"}>{errMsg.get()}</div>
    </div>
  );
}

function PageActions({ data }) {
  const router = useRouter();
  const mode = useState("ready");
  const projects = useState(ProjectsState);
  const session = useState(SessionState);
  const loading = useState(false);
  const errMsg = useState("");
  const originalDisplayName = useState(data.displayName);
  const displayName = useState(data.displayName);
  const onSaveDisplayName = async () => {
    if (loading.value) {
      return;
    }
    loading.set(true);

    let updated = await ProjectsAPI.update({
      _id: data._id,
      userID: session.value?.user?.uid,
      updates: {
        displayName: displayName.value,
      },
    }).then(
      (e) => e,
      (err) => {
        errMsg.set(err);
        loading.set(false);
        return Promise.reject(err);
      }
    );

    projects.set((rows) => {
      let idx = rows.findIndex((i) => i._id === data._id);
      rows[idx] = updated;
      return rows;
    });
    errMsg.set("");
    loading.set(false);
    mode.set("ready");
  };

  return (
    <>
      <div className="flex items-center">
        {mode.value === "ready" && (
          <>
            <button
              className={`bg-${"green"}-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {
                router.push("/editor/" + data._id);
              }}
            >
              {"Enter"}
            </button>
            <button
              className={`bg-${"red"}-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={async () => {
                if (
                  window.prompt(
                    `type in "delete" to confirm removal of "${data.displayName}"`
                  ) !== "delete"
                ) {
                  return;
                }

                if (loading.value) {
                  return;
                }

                loading.set(true);

                await ProjectsAPI.remove({
                  _id: data._id,
                  userID: session.value?.user?.uid,
                });

                projects.set((e) => {
                  e.splice(
                    e.findIndex((a) => a._id === data._id),
                    1
                  );

                  e = e.slice();
                  return e;
                });
                loading.set(false);
              }}
            >
              {loading.value ? "Loading" : "Delete"}
            </button>
          </>
        )}

        {mode.value === "ready" && (
          <button
            className={`bg-${"blue"}-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => {
              originalDisplayName.set(displayName.value);
              mode.set("slug");
            }}
          >
            {loading.value ? "Loading" : "Rename"}
          </button>
        )}
        {mode.value === "slug" && (
          <>
            <input
              type="text"
              value={displayName.value}
              onInput={(e) => {
                displayName.set(e.target.value);
              }}
              className="p-2 px-4 bg-gray-100 rounded-lg mr-3 placeholder-gray-400"
              placeholder="My New Project Title"
            ></input>

            <button
              className={`bg-${"yellow"}-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={onSaveDisplayName}
            >
              {"Save"}
            </button>

            <button
              className={`bg-${"gray"}-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={async () => {
                displayName.set(originalDisplayName.value);
                mode.set("ready");
                errMsg.set("");
              }}
            >
              {"Cancel"}
            </button>
          </>
        )}
      </div>
      {errMsg.value && (
        <div className={"px-4 py-2 text-red-500"}>{errMsg.value}</div>
      )}
    </>
  );
}

function PageRow({ data }) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div>{data.displayName}</div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div>{data.slug}</div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Active</span>
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <PageActions data={data}></PageActions>
      </td>
    </tr>
  );
}

export function ListProjects() {
  const projects = useState(ProjectsState);
  const session = useState(SessionState);

  const pageAt = useState(0);

  useEffect(() => {
    let at = pageAt.value;
    ProjectsAPI.list({
      userID: session.get()?.user?.uid,
      pageAt: pageAt.value,
      perPage: 25,
    }).then((prjs) => {
      if (at === pageAt.value) {
        // console.log(prjs);
        projects.set(prjs);
      }
    });
  }, [pageAt.value]);

  return (
    <div>
      <div className="mb-3">
        <button
          className="p-2 px-4 bg-gray-400 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => (e - 1 <= 0 ? 0 : e - 1));
          }}
        >
          Back
        </button>
        <button
          className="p-2 px-4 bg-gray-600 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => e + 1);
          }}
        >
          Next →
        </button>
        <span className="mr-3 inline-block">Page: {pageAt.value}</span>
      </div>

      {/*

      {projects.get().map((e) => (
        <div key={e._id}>
          {e.displayName}
          {e.slug}
        </div>
      ))}

      */}

      <div className="w-full overflow-x-scroll">
        <table className="w-full leading-normal inline-block rounded-lg">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Display Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.get().map((e) => (
              <PageRow key={e._id} data={e}></PageRow>
            ))}
            {/* <PageDataRows reload={revalidate} data={data}></PageDataRows> */}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <button
          className="p-2 px-4 bg-gray-400 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => (e - 1 <= 0 ? 0 : e - 1));
          }}
        >
          Back
        </button>
        <button
          className="p-2 px-4 bg-gray-600 text-white rounded-lg mr-3"
          onClick={() => {
            pageAt.set((e) => e + 1);
          }}
        >
          Next →
        </button>
        <span className="mr-3 inline-block">Page: {pageAt.value}</span>
      </div>
    </div>
  );
}

export default function AppProjects() {
  const [sessionOriginal, loading] = useSession();
  const session = useState(SessionState);

  useEffect(() => {
    if (sessionOriginal) {
      session.set(sessionOriginal);
    }
  }, [sessionOriginal, loading]);

  return !loading && session.value ? (
    <div>
      <CreateProject></CreateProject>
      <ListProjects></ListProjects>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

//
