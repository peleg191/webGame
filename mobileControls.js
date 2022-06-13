var mobileControl = {
    xKey: {
        x: 250,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'x'
    },
    zKey: {
        x: 320,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'z'
    },
    upKey:{
        x: 100,
        y: 300,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowUp'
    },
    rightKey:{
        x: 150,
        y: 350,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowRight'
    },
    downKey:{
        x: 100,
        y: 400,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowDown'
    },
    leftKey:{
        x: 50,
        y: 350,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        sprite: new Image(),
        key: 'ArrowLeft'
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
var canvasClicked = (event) => {
    if (!isMobile())
        return;
    let canvasLeft = canvas.clientLeft;
    let canvasTop = canvas.clientTop;
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;
    console.log('click!' + ' x is: ' + x +' y is:' + y);
    let mobileControlArray = Object.values(mobileControl);
    mobileControlArray = mobileControlArray.filter(elem => typeof elem != 'function');
    mobileControlArray.forEach(element => {
        if (Math.abs(x-element.x)<=element.width && x-element.x > 0 && Math.abs(y-element.y)<=element.height ) {
            keys[element.key] = true;
        }
        setTimeout(resetKeys, 100);
    });
};
var resetKeys = () => {
   player.resetMoving();
    for (k in keys)
        keys[k] = false;
}

