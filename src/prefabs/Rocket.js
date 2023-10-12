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
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){  //why not this.width/2 since rocket collision detection is top middle?

            }
        }
    }
  }