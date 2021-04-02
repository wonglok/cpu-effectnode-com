import { useEffect, useRef } from "react";
import { Mini } from "../shared/Mini";
import { Base } from "../shared/Base";
import { EditorLogic } from "./EditorLogic";
import { Box } from "./Box";
import { SceneControls } from "../shared/SceneControls";

//
// import { SceneControls } from "../shared/SceneControls";

export const EditorCanvas = () => {
  const ref = useRef(null);
  //
  useEffect(() => {
    let mini = new Mini({ name: "base", domElement: ref.current, window });
    let mods = [
      new Base(mini),
      new SceneControls(mini),
      new EditorLogic(mini),
      new Box(mini),
    ];

    //, new SceneControls(mini)

    let rAFID = 0;

    Promise.all([
      mini.get("renderer"),
      mini.get("camera"),
      mini.get("scene"),
    ]).then(([renderer, camera, scene]) => {
      let rAF = () => {
        rAFID = requestAnimationFrame(rAF);
        mini.work();
      };
      rAFID = requestAnimationFrame(rAF);
    });

    let cleaner = () => {
      cancelAnimationFrame(rAFID);
      mini.clean();
      mods.forEach((m) => {
        if (m.clean) {
          m.clean();
        }
      });
    };

    if (module.hot) {
      module.hot.dispose(() => {
        cleaner();
      });
    }

    return cleaner;
  }, []);

  return <div className="w-full h-full" ref={ref}></div>;
};

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
