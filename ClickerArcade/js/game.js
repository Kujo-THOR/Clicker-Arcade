"use strict";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1100,
    height: 830,
    scene: {
        preload,
        create,
        update
    }
};
let donutCount = 69;
let info;
let timer;
let time = 900;
const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', './img/sky.png');
    this.load.image('donut', './img/donut.png');
}

function create() {
    this.add.image(550, 410, 'sky').setScale(1.4);
    for (let i = 0; i < donutCount; i++) {
        let donut = this.add.sprite(Math.random() * config.width, Math.random() * config.height, 'donut');
        donut.setScale(0.3, 0.3);
        donut.setInteractive();
        donut.on('pointerdown', hide);
    }
    info = this.add.text(15, 15, 'Donuts: ' + donutCount, { fontSize: 24, fontFamily: 'cursive' });
    timer = this.add.text(10, 50, 'Time: ' + time, { fontSize: 24, fontFamily: 'cursive' });
}

function hide() {
    if (time > 0 && donutCount > 0) {
        this.visible = false;
        donutCount--;
        info.setText('Donuts:' + donutCount);
    } else {
        this.hide.pause();
    }
}

function update() {
    if (donutCount <= 0 && time > 0) {
        this.add.text(400, 250, 'You Won', { fontSize: 60, fontFamily: 'cursive' });
        this.add.text(360, 400, 'Click to Restart', { fontSize: 45, fontFamily: 'cursive' });
        this.input.on('pointerdown', () => {
            donutCount = 69;
            time = 900;
            this.scene.restart();
        });
    } else if (time <= 0 && donutCount > 0) {
        this.add.text(250, 200, 'Game Over', { fontSize: 60, fontFamily: 'cursive' });
        this.add.text(240, 300, 'Click to Restart', { fontSize: 45, fontFamily: 'cursive' });
        this.input.on('pointerup', () => {
            donutCount = 69;
            time = 900;
            this.scene.restart();
        });
    } else if (time > 0 && donutCount > 0) {
        time -= 1;
    }
    timer.setText("Time: " + time);
}