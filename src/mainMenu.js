export class MainMenu extends Phaser.Scene {
    constructor(){
        super({key:"main-menu"});
        //binding context
        this.startGame = this.startGame.bind(this);
    }

    preload(){
    
        
    }

    create(){
        //test text indicate current scene
        var text = this.add.text(400,200,"Main menu")
                .setOrigin(0.5,0)      
                ;
        
                //start text/fake button
        this.startTxt = this.add.text(400,300,"Start")
                .setOrigin(0.5,0)  
                .setInteractive()
                .on('pointerdown',   this.startGame)
                .on('pointerover', function (event) {
                    //add a tint
                    this.setTint(0xf97306);
            
                })
                .on('pointerout', function (event) {
                    //add a tint
                    this.clearTint();
            
                })
                ;

    }
    update(){
        
    }

    startGame(){
       
       this.scene.start("game")
    }

}