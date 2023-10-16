class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //load images and tile sprites
        this.load.image('rocket','./assets/rocket.png')
        this.load.image('spaceship','./assets/spaceship.png')
        this.load.image('starfield','./assets/starfield.png')
    }

    create(){
        //this.add.text(20,20,"Rocket Patrol Play")
        
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0)


        // green UI Background
        this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize*2,0X00FF00).setOrigin(0,0)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        //add P1 Rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderPadding - borderUISize, 'rocket').setOrigin(0.5,0)

        //add spaceships
        this.ship1 = new Spaceship(this,game.config.width + borderUISize*6, borderUISize*4, 'spaceship',0,30).setOrigin(0,0)
        this.ship2 = new Spaceship(this,game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship',0,20).setOrigin(0,0)
        this.ship3 = new Spaceship(this,game.config.width, borderUISize*6 + borderPadding*4, 'spaceship',0,10).setOrigin(0,0)

        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


    }

    update(){
        this.starfield.tilePositionX -= 4
        this.p1Rocket.update()
        this.ship1.update()
        this.ship2.update()
        this.ship3.update()
    }
}