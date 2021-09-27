
export class Game extends Phaser.Scene {
  
    constructor() {
        super({ key: "game",collectedFruit:0 });

        //binding context to callbacks
        this.pickFruit = this.pickFruit.bind(this)
    }

    preload() {
        //path of images

        //this.load.setBaseURL('http://labs.phaser.io');
        //alert("preload");

        //this.load.image('cherry', 'assets\img\Frutas\cereza.png');
        //this.load.image("canon","assets/img/canon.png");
        this.load.image("cherry","assets/img/Frutas/cereza.png");
        this.load.spritesheet("chopper","assets/img/chopper.png",{
            frameWidth:32,
            frameHeight:32
        });
        
        
        //sound
        this.load.audio("shot","assets/sfx/singleshot.wav");
    }


    create() {
        //event to retunr to main menu
        //this.input.on("pointerdown",( )=>this.scene.start("main-menu"));
        this.fruitschopped=0

        //test text indicate current scene
        this.add.text(400,16,"game")
            .setOrigin(0.5,0.5);
        
        
        
        //chopper==============>
        //used to eat the fruits 0> follow the cursor when is looked
        this.chopper = this.physics.add.sprite(400, 100, "chopper");
        this.chopper.setCollideWorldBounds(true);
        this.chopper.body.setAllowGravity(false);

        //chopper==============> animations
        this.anims.create({
            key:"stand",
            frames: this.anims.generateFrameNumbers("chopper",{
                start:0,
                end:0
        
                }),
            framerate:20,
            repeat:-1
        })

        this.anims.create({
            key:"chop",
            frames: this.anims.generateFrameNumbers("chopper",{
                start:1,
                end:2
        
                }),
            framerate:1,
            repeat:2
        })
        //chopper==============>

        //hide//lookc cursor
        this.input.on('pointerdown', function (pointer) {

            this.input.mouse.requestPointerLock();
    
        }, this);
    
        // When locked, you will have to use the movementX and movementY properties of the pointer
        // (since a locked cursor's xy position does not update)
        this.input.on('pointermove', function (pointer) {
    
            if (this.input.mouse.locked)
            {
                this.chopper.x += pointer.movementX;
                this.chopper.y += pointer.movementY;
    
    
                // Force the sprite to stay on screen
                this.chopper.x = Phaser.Math.Wrap(this.chopper.x, 0, 800);
                this.chopper.y = Phaser.Math.Wrap(this.chopper.y, 0, 600);
    
                // if (pointer.movementX > 0) { sprite.setRotation(0.1); }
                // else if (pointer.movementX < 0) { sprite.setRotation(-0.1); }
                // else { sprite.setRotation(0); }
            }
           
        }, this);
        

  
        

       

        //sft at create a fruit/cherry
        this.shotSfx= this.sound.add("shot",{volume:0.5});
        

 
     
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.fruitschopped = 0;
        this.CountText = this.add.text(32, 16);
        this.CountText.setText("Fruits Collected:"+this.fruitschopped.toString());
        
        this.text = this.add.text(32, 32);

        this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);


        this.fruits = this.physics.add.group()
        //collitions
        //this.physics.add.collider(this.chopper,this.fruits)
        //overlap used instead because don't want the choper bounce
        this.physics.add.overlap(this.chopper,this.fruits,this.pickFruit)
        
      
      
    }
   
    update(){
    

            this.text.setText('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4));
            this.CountText.setText("Fruits Collected:"+this.fruitschopped.toString().substr(0,2));

            if (Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                this.onEvent()
            }

    }

    //test version to add colletible fruits
    onEvent ()
    {
        
        
        let rand =100+Math.random()*2900
        let randx =Math.round( Math.random()*800/40)*16;
        ;
        // need to add poling
        let cherry = this.physics.add.image(0,0,"cherry");
        cherry.setRandomPosition(100,0,600,200);
        cherry.setPosition(cherry.x,600)
        
        let cherryXvel= 100;
        
      
      
        this.shotSfx.play();
        this.fruits.add(cherry)
        
        if(cherry.x>400){
            cherryXvel=-100;
        }
        cherry.setVelocity(cherryXvel,-400);
        
        this.timedEvent = this.time.delayedCall(rand, this.onEvent, [], this);
    }

    pickFruit(chop,fruit){
        chop.anims.play("chop");
        this.fruitschopped+=1;
        console.log(this.fruitschopped)
        
        
        fruit.disableBody(true,true);
        
        
    }


}

