import './style.css'
import { Application, Assets, Sprite } from 'pixi.js';

const app = new Application();

document.body.appendChild(app.view);

const texture = await Assets.load('bunny.png');

const bunny = new Sprite(texture);
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

app.stage.addChild(bunny);

app.ticker.add(() => {
  bunny.y -= 1;
  bunny.x -= 1;
  bunny.rotation += 1;
});