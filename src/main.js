/*
Name: Cromwell De Guzman
Title: Ribbet Patrol
Completed: ~10 hours
Mods:
- Track a high score that persists across scenes and display it in the UI (5)
- Implement the 'FIRE' UI text from the original game (5)
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
- Implement the speed increase that happens after 30 seconds in the original game (5)
- Randomize each spaceship's movement direction at the start of each play (5)
> Create a new scrolling tile sprite for the background (5)
- Allow the player to control the Rocket after it's fired (5)
> Create 4 new explosion sound effects and randomize which one plays on impact (10)
- Display the time remaining (in seconds) on the screen (10)
- Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
- Create a new title screen (e.g., new artwork, typography, layout) (10)
> Implement parallax scrolling for the background (10)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)

Citations:
- Beatrice Yu (CMPM 120-01)
- Jentsen Maniti (CMPM 120-02)
- Brad Gilbertson (https://brad-gilbertson.itch.io/16bit-race-car-set)
- Chasersgaming (https://opengameart.org/content/2d-bike-sprite-2)
- smolblockboi (https://smolblockboi.itch.io/smol-froggies-sprites-pack)
- qubodup (Sword Hit Sound Effect from Pixabay)
- SergeQuadrado (Oh, No! Sound Effect from Pixabay)
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