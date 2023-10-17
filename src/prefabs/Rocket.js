//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        // add object to existing scene
        scene.add.existing(this);   //adds to existing, displayList, updateList
        this.isFiring = false       //firing status
        this.moveSpeed = 2          //pixels per frame
    }

    update(){
        //left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width/2 + 4){  //why not this.width/2 since rocket collision detection is top middle?
                this.x -= this.moveSpeed
                //console.log("left")
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width + 4){
                this.x += this.moveSpeed
                //console.log("right")
            }
        }

        //check firing status
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true
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