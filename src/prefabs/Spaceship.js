//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor( scene, x, y, texture, frame, pointValue ){
        super(scene,x,y,texture,frame)
        scene.add.existing(this) //adds to scene
        this.points = pointValue //point value of the ship
        this.moveSpeed = 3       //pixels per frame
    }

    update(){
        //spaceship always moves left
        this.x -= this.moveSpeed

        //if meets left edge, wrap around
        if(this.x <= 0-this.width){
            this.x = game.config.width
        }
    }

    reset(){
        this.x = game.config.width
    }
}