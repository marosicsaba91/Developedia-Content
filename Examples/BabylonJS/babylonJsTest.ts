import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder} from "@babylonjs/core";

class App {
  constructor() {
    console.log('Hello World!!!')
    // create the canvas html element and attach it to the webpage
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

    // initialize babylon scene and engine
    const babylonEngine: Engine = new Engine(canvas, true);
    const scene: Scene = new Scene(babylonEngine);


    const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    const sphere: Mesh = MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    // run the main render loop
    babylonEngine.runRenderLoop(() => {
      scene.render();
    });
  }
}

new App();

/*
// constants
const zero3 = new BABYLON.Vector3(0, 0, 0)
const right3 = new BABYLON.Vector3(1, 0, 0)
const left3 = new BABYLON.Vector3(-1, 0, 0)
const up3 = new BABYLON.Vector3(0, 1, 0)
const down3 = new BABYLON.Vector3(0, -1, 0)
const forward3 = new BABYLON.Vector3(0, 0, 1)
const backward3 = new BABYLON.Vector3(0, 0, -1)
const backgroundColor = new BABYLON.Color4(0.5, 0.8, 0.5, 1);

function VectorSubtraction(a, b) {
  return new BABYLON.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
}

function createScene() {
  const scene = new BABYLON.Scene(engine);

  const cameraPos = new BABYLON.Vector3(0, 2, -5)
  const mainCamera = new BABYLON.FreeCamera('Camera', cameraPos, scene)
  mainCamera.attachControl(canvas, true);
  scene.clearColor = backgroundColor;
  // mainCamera.rotation = BABYLON.Quaternion.FromLookDirectionLH(forward3, up3).toEulerAngles();

  const directionalLight = new BABYLON.HemisphericLight('DirectionalLight', down3, scene)


  const boxOptions = {size: 1}
  const cube = BABYLON.MeshBuilder.CreateBox('Box', boxOptions, scene);
  cube.position = new BABYLON.Vector3(-2, 1, 0);

  const sphere = BABYLON.MeshBuilder.CreateSphere('Sphere', {}, scene);
  sphere.position = new BABYLON.Vector3(2, 1, 0);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

  mainCamera.setTarget(ground.position);


  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
*/
