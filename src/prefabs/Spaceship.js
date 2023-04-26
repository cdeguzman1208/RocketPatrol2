// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed; // pixels per frame
    }

    update() {
        if (this.flipX == false) {
            // move spaceship left
            this.x -= this.moveSpeed;
            
            // wrap around from left edge to right edge
            if(this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        } else {
            // move spaceship right
            this.x += this.moveSpeed;
            
            // wrap around from right edge to left edge
            if(this.x >= game.config.width) {
                this.x = 0 - this.width;
            }
        }

        if (this.scene.time.now > 30000) {
            this.moveSpeed = game.settings.spaceshipSpeed * 2;
        }
    }

    // position reset
    reset() {
        let randomNum = Math.floor(Math.random() * 5);
        if (randomNum >= 3) {
            this.x = game.config.width;
            this.flipX = true;
        } else {
            this.x = 0 - this.width;
            this.flipX = false;
        }
    }
}