import { BoxBufferGeometry, Mesh, MeshNormalMaterial } from "three";

export class Box {
  constructor(mini) {
    this.mini = mini;
    this.setup();
  }
  async setup() {
    this.mesh = new Mesh(
      new BoxBufferGeometry(1, 1, 1),
      new MeshNormalMaterial()
    );
    this.mini.set("box", this);
  }
}

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
