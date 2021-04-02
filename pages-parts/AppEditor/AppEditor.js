import { useState } from "@hookstate/core";
import { useEffect } from "react";
import * as EditorState from "./EditorState";
import dynamic from "next/dynamic";

const EditorCanvas = dynamic(
  () => import("./EditorCanvas/EditorCanvas.js").then((e) => e.EditorCanvas),
  {
    ssr: false,
  }
);

// import { HeaderBodyFooter, Sidebar, SidebarLayout, Tabs } from "./EditorLayout";

export default function AppEditor({ projectID }) {
  const localReady = useState(false);
  useEffect(() => {
    EditorState.loadProject({ projectID }).then(() => {
      localReady.set(true);
    });
  }, []);

  return (
    localReady.get() && (
      <>
        <div className="h-full">
          <EditorCanvas></EditorCanvas>
        </div>
      </>
    )
  );
}

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
