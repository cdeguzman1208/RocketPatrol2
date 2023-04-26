/*
Name: Cromwell De Guzman
Title: Rocket Patrol 2 (working title)
Completed: TBA
Mods:
- Track a high score that persists across scenes and display it in the UI (5)
- Implement the 'FIRE' UI text from the original game (5)
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
x Implement the speed increase that happens after 30 seconds in the original game (5)
- Randomize each spaceship's movement direction at the start of each play (5)
- Create a new scrolling tile sprite for the background (5)
x Create 4 new explosion sound effects and randomize which one plays on impact (10)
x Display the time remaining (in seconds) on the screen (10)
x Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
x Create a new title screen (e.g., new artwork, typography, layout) (10)
x Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
x Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)

Citations:
- Beatrice Yu (CMPM 120-01)
- Jentsen Maniti (CMPM 120-02)
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