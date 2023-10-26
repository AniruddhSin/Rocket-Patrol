class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //load images and tile sprites
        this.load.image('rocket','./assets/rocket.png')
        this.load.image('spaceship','./assets/spaceship.png')
        this.load.image('starfield','./assets/starfield.png')
        this.load.spritesheet('explosion','./assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9})
        this.load.image('UFO','./assets/UFO.png')
        this.load.atlas('particle', './assets/flares.png', './assets/flares.json');
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
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderPadding - borderUISize, 
        'rocket').setOrigin(0.5,0)

        //add spaceships
        this.ship1 = new Spaceship(this,game.config.width + borderUISize*6, borderUISize*5, 
            'spaceship',0,30).setOrigin(0,0)
        this.ship2 = new Spaceship(this,game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 
            'spaceship',0,20).setOrigin(0,0)
        this.ship3 = new Spaceship(this,game.config.width, borderUISize*7 + borderPadding*4, 
            'spaceship',0,10).setOrigin(0,0)
        this.ufo = new Spaceship(this,game.config.width - borderUISize, borderUISize*4,
            'UFO',0,100).setOrigin(0,0)
        this.ufo.moveSpeed = game.settings.spaceshipSpeed * 1.5

        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        // initialize score
        this.p1Score = 0
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
        this.scoreLeft = this.add.text(borderPadding + borderUISize , borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        //GAME OVER Flag
        this.gameOver = false

        // 60 second play clock
        scoreConfig.fixedWidth = 0
        // parameters are: time to delay in ms, callback function, callbackfunction parameters, callback context (this scene)
        this.clock = this.time.delayedCall(game.settings.gameTimer , () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', 
            scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        //display clock
        this.timeLeft = this.add.text(game.config.width - borderPadding - borderUISize*2, borderUISize + borderPadding*2,
            this.clock.getRemainingSeconds, scoreConfig)


        this.explodeSpeed = 400
        //double spaceship speed after 30 seconds
        this.speedUpShips = this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship1.moveSpeed *= 2
            this.ship2.moveSpeed *= 2
            this.ship3.moveSpeed *= 2
            this.ufo.moveSpeed *= 2
            this.explodeSpeed *= 2
            //console.log("speed!!")
        })

    }

    update(){
        //check key input for restarting
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart()
        }

        this.starfield.tilePositionX -= 4
        if(!this.gameOver){
           this.p1Rocket.update()
            this.ship1.update()
            this.ship2.update()
            this.ship3.update()
            this.ufo.update()
        }

        //Checking Collisions
        if(this.checkCollision(this.p1Rocket, this.ship1)){
            //console.log("RIP Ship 1")
            this.p1Rocket.reset()
            this.shipExplode(this.ship1)
        }
        if(this.checkCollision(this.p1Rocket, this.ship2)){
            //console.log("RIP Ship 2")
            this.p1Rocket.reset()
            this.shipExplode(this.ship2)
        }
        if(this.checkCollision(this.p1Rocket, this.ship3)){
            //console.log("RIP Ship 3")
            this.p1Rocket.reset()
            this.shipExplode(this.ship3)
        }
        if(this.checkCollision(this.p1Rocket, this.ufo)){
            this.p1Rocket.reset()
            this.shipExplode(this.ufo)
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene')
        }

        //Update Timer
        this.timeLeft.text = Math.floor(this.clock.getRemainingSeconds())
    }

    checkCollision(rocket, ship){
        //AABB Checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y){
            
            return true
        }else{
            return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        /*let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })*/
        let emission = this.add.particles(ship.x,ship.y,'particle',{
            frame: ['white'],
            lifespan: 300,
            blendMode: 'ADD',
            gravityY: 50,
            speed: {min: 100, max: this.explodeSpeed},
            scale: {start: 0.3, end: 0},
            emitting: false
        })
        emission.explode(16)
        ship.reset()
        ship.alpha = 1
        // update score
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.clock.delay = this.clock.delay + 1000

        //play explosion sound
        this.sound.play('sfx_explosion')
      }
}