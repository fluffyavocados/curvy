import "./style.css";
import { Application, Assets, Sprite, Graphics } from "pixi.js";

const PLAYER_SPEED = 3;
const POOP_SPEED = 1;

const keyboard = {
  w: false,
  a: false,
  s: false,
  d: false,
};

document.addEventListener("keydown", (e) => {
  if (keyboard[e.key] != undefined) {
    keyboard[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (keyboard[e.key] != undefined) {
    keyboard[e.key] = false;
  }
});

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
player.height = 64;
player.width = 64;

app.stage.addChild(player);

const poops: Sprite[] = [];
const directionXs: number[] = [];
const directionYs: number[] = [];

function spawnPoop() {
  const radius =
    (app.renderer.width ** 2 + app.renderer.height ** 2) ** 0.5 / 2;
  const angle = Math.random() * 2 * Math.PI;
  const poop = new Sprite(poopTexture);
  poop.x = Math.cos(angle) * radius + app.renderer.width / 2;
  poop.y = Math.sin(angle) * radius + app.renderer.height / 2;
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

const startTime = Date.now();

app.ticker.add(() => {
  const currentTime = Date.now();
  const time = currentTime - startTime;
  if (keyboard.w) {
    player.y -= PLAYER_SPEED;
  }
  if (keyboard.s) {
    player.y += PLAYER_SPEED;
  }
  if (keyboard.d) {
    player.x += PLAYER_SPEED;
  }
  if (keyboard.a) {
    player.x -= PLAYER_SPEED;
  }
  player.rotation += 0.05;

  if (Math.random() < 0.03) {
    spawnPoop();
  }
  for (let i = 0; i < poops.length; i++) {
    const poop = poops[i];
    const directionX = directionXs[i];
    const directionY = directionYs[i];
    const multiplier = 1 + time / 60000;
    poop.x += directionX * POOP_SPEED * POOP_SPEED * multiplier;
    poop.y += directionY * POOP_SPEED * POOP_SPEED * multiplier;

    const playerDirX = poop.x - player.x;
    const playerDirY = poop.y - player.y;
    const length = Math.sqrt(playerDirX ** 2 + playerDirY ** 2);
    if (length < 48) {
      document.body.innerHTML = "";
      document.location.reload();
    }
  }
});

const timerElement = document.querySelector(".timer")!;
app.ticker.add(() => {
  const currentTime = Date.now();

  const time = currentTime - startTime;

  timerElement.innerHTML = (time / 1000).toFixed(0) + " s";
});
