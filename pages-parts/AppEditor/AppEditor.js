import { useState } from "@hookstate/core";
import { useEffect } from "react";
import * as EditorState from "./EditorState";
import dynamic from "next/dynamic";

const PreviewCanvas = dynamic(
  () => import("./PreviewCanvas/PreviewCanvas.js").then((e) => e.PreviewCanvas),
  {
    ssr: false,
  }
);

// import { HeaderBodyFooter, Sidebar, SidebarLayout, Tabs } from "./EditorLayout";

import { useRef, useState as useReactState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useReactState(false);
  const [active, setActive] = useReactState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function RenderLoop() {
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera);
  }, 1);
  return <></>;
}

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
        <div className="flex h-full">
          <div className="h-full w-1/2">
            {/* <Canvas>
              <RenderLoop></RenderLoop>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas> */}

            <PreviewCanvas></PreviewCanvas>
          </div>
          <div className="h-full w-1/2">
            <Canvas>
              <RenderLoop></RenderLoop>

              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas>
          </div>
        </div>
      </>
    )
  );
}
