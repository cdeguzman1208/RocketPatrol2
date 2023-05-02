class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // load images/tile sprites
        // this.load.image('rocket', './assets/rocket.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/road.png'); // NEW background
        this.load.image('bike', './assets/spr_bike2man_0.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('car', './assets/spritesheet.png', {frameWidth: 59, frameHeight: 40, startFrame: 0, endFrame: 5});
        this.load.spritesheet('frog', './assets/smolblockboi_froggies_spritesheet.png', {frameWidth: 31.5, frameHeight: 31, startFrame: 8, endFrame: 8});

        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm', './assets/RR bgm.wav');
        this.load.audio('sfx_explosion1', './assets/sword-hit-7160.mp3'); // create 4 new explosion sfx
        this.load.audio('sfx_explosion2', './assets/oh-no-113125.mp3');
        this.load.audio('sfx_explosion3', './assets/explosion-sound.mp3');
        this.load.audio('sfx_explosion4', './assets/explosion-sound-effect-free.mp3');

    }

    create() {
        // play bgm
        this.music = this.sound.add("bgm", { loop: true, volume: 5 });
        this.music.play();

        // tile sprite background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2 - 10, 0x00FF00).setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + 50, 'car', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 75, 'car', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4 + 100, 'car', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*3 - 110, 'bike', 0, 40).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 20, 'frog').setOrigin(0.5, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('car', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        this.ship01.play('drive');
        this.ship02.play('drive');
        this.ship03.play('drive');

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // display highscore
        let highscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(borderUISize + borderPadding * 43.5, borderUISize + borderPadding*2, highscore, highscoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

            if(this.p1Score > highscore) {
                highscore = this.p1Score;
            }
            this.scoreRight.text = highscore;
            
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.music.stop();
        }, null, this);
    }

    update() {

        this.ship04.moveSpeed = this.game.settings.spaceshipSpeed * 2;
        if (this.time.now > this.game.settings.gameTimer / 2) {
            this.ship04.moveSpeed = this.game.settings.spaceshipSpeed * 4;
            this.music.detune = 1200;
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // display FIRE
        let FIREConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
            visible: false,
        }
        let textFIRE = this.add.text(borderUISize + borderPadding * 23.5, borderUISize + borderPadding*20, 'HOP', FIREConfig);
        if (this.p1Rocket.isFiring) {
            textFIRE.visible = true;
            setTimeout(() => {
                textFIRE.visible = false;
            }, 0);
        } else {
            textFIRE.visible = false;
        }

        // show countdown timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: 'red',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
            visible: false,
        }
        let countdownTimer = this.add.text(borderUISize + borderPadding * 23.5, borderUISize + borderPadding*2, Math.floor(this.clock.getRemainingSeconds()), timerConfig);
        if (!this.gameOver) {
            countdownTimer.visible = true;
            setTimeout(() => {
                countdownTimer.visible = false;
            }, 0);
        } else {
            countdownTimer.visible = false;
        }

        this.starfield.tilePositionX -= 4; // update tile sprite
        if (!this.gameOver) {
            this.p1Rocket.update(); // update p1
            this.ship01.update(); // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            // console.log('kaboom ship 04');
            this.p1Rocket.reset();
            // this.ship04.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            // console.log('kaboom ship 03');
            this.p1Rocket.reset();
            // this.ship03.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            // console.log('kaboom ship 02');
            this.p1Rocket.reset();
            // this.ship02.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            // console.log('kaboom ship 01');
            this.p1Rocket.reset();
            // this.ship01.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { // callback after anim completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        
        let randomExplosion = Math.floor(Math.random() * 5);
        switch (randomExplosion) {
            case 0: // rocket patrol explosion
                // console.log("rocket patrol explosion");
                this.sound.play('sfx_explosion');
                break;
            case 1: // clang
                // console.log("clang");
                this.sound.play('sfx_explosion1', {volume: 10});
                break;
            case 2: // oh no!
                // console.log("oh no!");
                this.sound.play('sfx_explosion2', {seek: 0.5});
                break;
            case 3: // boom 1
                // console.log("boom 1");
                this.sound.play('sfx_explosion3');
                break;
            case 4: // boom 2
                // console.log("boom 2");
                this.sound.play('sfx_explosion4');
                break;
        }
    }
}