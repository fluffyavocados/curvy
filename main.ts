import "./style.css";
import { Application, Assets, Sprite, Graphics } from "pixi.js";

const app = new Application();
document.body.appendChild(app.view as HTMLCanvasElement);

const centerX = app.renderer.width / 2;
const centerY = app.renderer.height / 2;

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
const directionXs: number[] = [];
const directionYs: number[] = [];

function spawnPoop() {
  const poop = new Sprite(poopTexture);
  poop.x = Math.random() * app.renderer.width;
  poop.y = 0;
  poop.anchor.x = 0.5;
  poop.anchor.y = 0.5;
  poop.height = 64;
  poop.width = 64;

  app.stage.addChild(poop);
  poops.push(poop);
  const directionX = centerX - poop.x;
  const directionY = centerY - poop.y;
  directionXs.push(directionX / (directionY ** 2 + directionX ** 2) ** 0.5);
  directionYs.push(directionY / (directionY ** 2 + directionX ** 2) ** 0.5);
}

app.ticker.add(() => {
  player.y -= 1;
  player.x -= 1;
  player.rotation += 0.05;

  if (Math.random() < 0.05) {
    spawnPoop();
  }
  for (let i = 0; i < poops.length; i++) {
    const poop = poops[i];
    const directionX = directionXs[i];
    const directionY = directionYs[i];
    poop.x += directionX;
    poop.y += directionY;
  }
});
