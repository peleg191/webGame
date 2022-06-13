let actions = { resetMoving: player?.resetMoving };
let touchType = { touches: 'touches', changedTouches: 'changedTouches' };
var mobileControl = {
    xKey: {
        x: 600,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'x'
    },
    zKey: {
        x: 700,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'z'
    },
    upKey: {
        x: 100,
        y: 300,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowUp',
        actionOnKeyUp: actions.resetMoving
    },
    rightKey: {
        x: 150,
        y: 350,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowRight',
        actionOnKeyUp: actions.resetMoving

    },
    downKey: {
        x: 100,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowDown',
        actionOnKeyUp: actions.resetMoving

    },
    leftKey: {
        x: 50,
        y: 350,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowLeft',
        actionOnKeyUp: actions.resetMoving
    },
    drawControl(ctx) {
        ctx.drawImage(mobileControl.xKey.sprite, mobileControl.xKey.x, mobileControl.xKey.y, mobileControl.xKey.width, mobileControl.xKey.height);
        ctx.drawImage(mobileControl.zKey.sprite, mobileControl.zKey.x, mobileControl.zKey.y, mobileControl.zKey.width, mobileControl.zKey.height);
        ctx.drawImage(mobileControl.upKey.sprite, mobileControl.upKey.x, mobileControl.upKey.y, mobileControl.upKey.width, mobileControl.upKey.height);
        ctx.drawImage(mobileControl.downKey.sprite, mobileControl.downKey.x, mobileControl.downKey.y, mobileControl.downKey.width, mobileControl.downKey.height);
        ctx.drawImage(mobileControl.rightKey.sprite, mobileControl.rightKey.x, mobileControl.rightKey.y, mobileControl.rightKey.width, mobileControl.rightKey.height);
        ctx.drawImage(mobileControl.leftKey.sprite, mobileControl.leftKey.x, mobileControl.leftKey.y, mobileControl.leftKey.width, mobileControl.leftKey.height);

    }
};
mobileControl.xKey.sprite.src = './assets/xKey.png';
mobileControl.zKey.sprite.src = './assets/zKey.png';
mobileControl.upKey.sprite.src = './assets/keyUp.png';
mobileControl.downKey.sprite.src = './assets/keyDown.png';
mobileControl.rightKey.sprite.src = './assets/keyRight.png';
mobileControl.leftKey.sprite.src = './assets/keyLeft.png';
var canvasTouched = (event, ctx) => {
    checkForTouch(event, true, null, ctx);
};
var canvasTouchedEnded = (event) => {
    checkForTouch(event, false, function (element) {
        if (!element.actionOnKeyUp)
            return;
        element.actionOnKeyUp();
    });
};
function checkForTouch(event, valueToKeys, actionIfTouched, ctx) {
    if (!isMobile())
        return;
    let touches = [];
    if (event.touches?.length > 0) {
        handleTouch(event, 0, touchType.touches, touches);

    }
    else {
        for (let i = 0; i < event.changedTouches.length; i++) {
            handleTouch(event, i, touchType.changedTouches, touches);
        }
    }
    let mobileControlArray = Object.values(mobileControl);
    mobileControlArray = mobileControlArray.filter(elem => typeof elem != 'function');
    touches.forEach(touch => {
        let x = touch.x;
        let y = touch.y;
        if (ctx) {
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.stroke();
        }
        mobileControlArray.forEach(element => {
            if (Math.abs(x - element.x) <= element.width && x - element.x > 0 && Math.abs(y - element.y) <= element.height) {
                keys[element.key] = valueToKeys;
                if (actionIfTouched)
                    actionIfTouched(element);
            }
        });
    })
}
const rect = canvas.getBoundingClientRect();
let canvasLeft = rect.left;
let canvasTop = rect.top;
function handleTouch(event, i, touchType, touches) {
    let touch = event[touchType].item(i);
    let item = {};
    item.x = Math.floor((touch.clientX  - canvasLeft) * 1.1);
    item.y = Math.floor((touch.clientY - canvasTop) * 1.1);
    item.x += item.x > 320 ? 50 :0; 
    item.y += item.y > 200 ? 50 : 0; 
    item.height = 50;
    item.width = 50;
    console.log('x: ' + item.x +' y: ' + item.y );
    touches.push(item);
}


