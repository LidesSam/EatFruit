import { MainMenu } from "./mainMenu.js";
import { Game } from "./game.js";

var audioContext;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.error(e);
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
   // parent:"container",
    
    scene:[MainMenu,Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    pixelArt: true,
    audio: {
        context: audioContext
    }
};
//var menu = new Phaser.MainMenu(config);
var game = new Phaser.Game(config);