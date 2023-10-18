class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        //loaded here so they can be used in multiple scenes
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav')
        this.load.audio('sfx_explosion', './assets/explosion38.wav')
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav')
    }

    create(){
        // Menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Show Menu Text
        this.add.text(game.config.width/2,game.config.height/2 - borderPadding - borderUISize,
                      "ROCKET PATROL", menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2,game.config.height/2, "Use <--> keys to move & (F) to fire", menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2,game.config.height/2 + borderPadding + borderUISize, 
                      'Press <- for Novice or -> for Expert',menuConfig).setOrigin(0.5)
        
        //Defining Keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)



    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy Mode
            game.settings = {
                spaceshipSpeed : 3,
                gameTimer : 60000
            }
            this.sound.play('sfx_select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard Mode
            game.settings = {
                spaceshipSpeed : 5,
                gameTimer : 45000
            }
            this.sound.play('sfx_select')
            this.scene.start('playScene')
        }
    }
}

