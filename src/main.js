/*
Name: Cromwell De Guzman
Title: Rocket Patrol 2 (working title)
Completed: TBA
Mods: TBA
Citations: TBA
*/

let config  = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let highscore = 0;