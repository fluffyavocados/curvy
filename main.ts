import "./style.css";
import { Application, Assets, Sprite, Graphics } from "pixi.js";

const app = new Application();
document.body.appendChild(app.view as HTMLCanvasElement);

const texture = await Assets.load("kirby.png");
const poopTexture = await Assets.load("poop1.png");

const player = new Sprite(texture);

player.x = app.renderer.width / 2;
player.y = app.renderer.height / 2;
player.anchor.x = 0.5;
player.anchor.y = 0.5;
player.height = 128;
player.width = 128;

app.stage.addChild(player);

const poops: Sprite[] = [];

function spawnPoop() {
  const poop = new Sprite(poopTexture);
  poop.x = app.renderer.width / 2;
  poop.y = app.renderer.height / 2;
  poop.anchor.x = 0.5;
  poop.anchor.y = 0.5;
  poop.height = 64;
  poop.width = 64;

  app.stage.addChild(poop);
  poops.push(poop);
}

app.ticker.add(() => {
  player.y -= 1;
  player.x -= 1;
  player.rotation += 0.05;
  // spawnPoop();
  for (const poop of poops) {
    poop.x += 0.5 - Math.random();
    poop.y += 0.5 - Math.random();
  }
});
