/*
Aniruddh Sindhu
Rocket Patrol Modular the IXth
3 hours
MODS:
Change speed of game after 30 seconds - 1 point
Control rocket after fired - 1 point
Display the time remaining - 3 points
Adds time to clock for successful hits - 5 points
Add new spacehip that is smaller, faster, and worth more points - 5 points
Explosion using particle emitter - 5 points

*/
//keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)
//set UI Sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

