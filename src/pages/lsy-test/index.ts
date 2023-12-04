import './styles.scss'

import * as PIXI from 'pixi.js';
// import sampleImage from './sample';
import sampleImage from './sample.png'

const app = new PIXI.Application<HTMLCanvasElement>({
    background: '#1099bb',
    resizeTo: window,
});
document.body.appendChild(app.view);

const basicText = new PIXI.Text('Basic text in pixi1');
basicText.x = 50;
// basicText.y = 100;
app.stage.addChild(basicText);

const basicText2 = new PIXI.Text('Basic text in pixi2');
basicText2.x = 50;
basicText2.y = 100;
app.stage.addChild(basicText2);

const texture = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

for (let i = 0; i < 10; i++) {
    createBunny(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
    );
}

function createBunny(x: number, y: number) {
    const bunny = new PIXI.Sprite(texture);
    bunny.interactive = true;
    // bunny.buttonMode = true;
    bunny.anchor.set(0.5);
    bunny.scale.set(3);
    bunny.on('pointerdown', onDragStart);
    bunny.x = x;
    bunny.y = y;
    app.stage.addChild(bunny);
}

let dragTarget: PIXI.Sprite | null = null;

app.stage.interactive = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event: any) {
    if (dragTarget) {
        dragTarget.parent?.toLocal(event.data.global, undefined, dragTarget.position);
    }
}

function onDragStart(this: PIXI.Sprite, event: any) {
  this.alpha = 0.5;
  dragTarget = this;
  app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}


let sprite = PIXI.Sprite.from(sampleImage);
sprite.on('click', ()=>{
  console.log('good')
})
sprite.eventMode = 'static'

app.stage.addChild(sprite); 


import santaIdle1 from './assets/sprite/santa/Idle (1).png';
import santaIdle2 from './assets/sprite/santa/Idle (2).png';
import santaIdle3 from './assets/sprite/santa/Idle (3).png';
import santaIdle4 from './assets/sprite/santa/Idle (4).png';
import santaIdle5 from './assets/sprite/santa/Idle (5).png';
import santaIdle6 from './assets/sprite/santa/Idle (6).png';
import santaIdle7 from './assets/sprite/santa/Idle (7).png';
import santaIdle8 from './assets/sprite/santa/Idle (8).png';
import santaIdle9 from './assets/sprite/santa/Idle (9).png';
import santaIdle10 from './assets/sprite/santa/Idle (10).png';
import santaIdle11 from './assets/sprite/santa/Idle (11).png';
import santaIdle12 from './assets/sprite/santa/Idle (12).png';
import santaIdle13 from './assets/sprite/santa/Idle (13).png';
import santaIdle14 from './assets/sprite/santa/Idle (14).png';
import santaIdle15 from './assets/sprite/santa/Idle (15).png';
import santaIdle16 from './assets/sprite/santa/Idle (16).png';

const santaImages = [
  santaIdle1, santaIdle2, santaIdle3, santaIdle4, santaIdle5, santaIdle6, santaIdle7, santaIdle8,
  santaIdle9, santaIdle10, santaIdle11, santaIdle12, santaIdle12, santaIdle13, santaIdle14, santaIdle15, santaIdle16
]

const textureArray = []

for (let i = 0; i < santaImages.length; i++) {
  const texture = PIXI.Texture.from(santaImages[i])
  textureArray.push(texture);
}

const animatedSprite = new PIXI.AnimatedSprite(textureArray);
animatedSprite.play()
// app.stage.addChild(animatedSprite); 


// 버튼 생성
const button = new PIXI.Graphics();
button.beginFill(0x3498db); // 버튼 색상
button.drawRect(0, 0, 100, 50); // 버튼 크기
button.endFill();
button.interactive = true; // 이벤트 활성화

// 버튼에 텍스트 추가
const buttonText = new PIXI.Text('Click me', {
  fill: 0xFFFFFF, // 텍스트 색상
  fontSize: 16, // 텍스트 크기
  fontWeight: 'bold', // 텍스트 굵기
});
buttonText.anchor.set(0.5, 0.5); // 텍스트의 중심을 기준으로 설정
buttonText.position.set(button.width / 2, button.height / 2); // 텍스트 위치 설정
button.addChild(buttonText);

// 클릭 이벤트 처리
button.on('pointerdown', () => {
  console.log('버튼이 클릭되었습니다!');
  // buttonText.alpha = 0
});

app.stage.addChild(button);
