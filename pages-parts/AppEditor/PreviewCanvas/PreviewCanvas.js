import { useEffect, useRef, useState } from "react";
import { Mini, SubMini, Submini } from "../shared/Mini";
import { Base } from "../shared/Base";
import { EditorLogic } from "./EditorLogic";
import { SceneControls } from "../shared/SceneControls";

const sub = (mini) => {
  return new SubMini(mini);
};

export const PreviewCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    let mini = new Mini({ name: "base", domElement: ref.current, window });
    let mods = [
      new Base(sub(mini)),
      new SceneControls(sub(mini)),
      new EditorLogic(sub(mini)),
    ];

    let rAFID = 0;
    let rAF = () => {
      rAFID = requestAnimationFrame(rAF);
      mini.work();
    };
    rAFID = requestAnimationFrame(rAF);

    return () => {
      cancelAnimationFrame(rAFID);
      mini.clean();
      mods.forEach((m) => {
        if (m.clean) {
          m.clean();
        }
      });
    };
  }, []);

  return <div className="w-full h-full relative" ref={ref}></div>;
};
