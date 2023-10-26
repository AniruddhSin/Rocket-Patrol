//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        // add object to existing scene
        scene.add.existing(this);   //adds to existing, displayList, updateList
        this.isFiring = false       //firing status
        this.moveSpeed = 2          //pixels per frame

        this.sfxRocket = scene.sound.add('sfx_rocket')
    }

    update(){
        //left/right movement
        //if(!this.isFiring){     //Remove to add control on spaceship after firing
        if(keyLEFT.isDown && this.x >= borderUISize + this.width/2 + 4){  //why not this.width/2 since rocket collision detection is top middle?
            this.x -= this.moveSpeed
        }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width + 4){
            this.x += this.moveSpeed
        }
        //}

        //check firing status
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true
            this.sfxRocket.play()
        }

        //move up if firing
        if(this.isFiring && this.y >= borderUISize*3 + borderPadding){
            this.y -= this.moveSpeed
        }

        //reset when miss
        if(this.y <= borderUISize*3 + borderPadding){
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }
    }

    //reset Rocket to ground upon collision
    reset(){
        this.isFiring = false
        this.y = game.config.height - borderPadding - borderUISize
    }
  }