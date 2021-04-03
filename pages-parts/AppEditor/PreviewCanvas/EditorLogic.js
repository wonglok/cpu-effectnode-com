import { BoxBufferGeometry, Mesh, MeshNormalMaterial } from "three";

export class EditorLogic {
  constructor(mini) {
    this.mini = mini;
    this.setup();
  }
  async setup() {
    let mini = this.mini;
    let ready = mini.ready;
    let renderer = await ready.renderer;
    let scene = await ready.scene;
    let camera = await ready.camera;

    let box = new Mesh(
      new BoxBufferGeometry(1, 1, 1),
      new MeshNormalMaterial()
    );

    scene.add(box);

    camera.position.z = 15;
    renderer.autoClear = false;
    mini.onLoop(() => {
      renderer.render(scene, camera);
    });
  }
}

// if (module.hot) {
//   module.hot.dispose(() => {
//     window.location.reload();
//   });
// }
