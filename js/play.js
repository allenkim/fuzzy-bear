var playState = {

	create: function() { 
        
        this.createWorld();
        
        this.explosions = game.add.group();
        for (var i = 0; i < 30; i++){
            var explosionAnimation = this.explosions.create(0,0,'explosion',[0],false);
            explosionAnimation.anchor.setTo(0.5,0.8);
            explosionAnimation.animations.add('explosion');
        }
        
        this.skull = game.add.sprite(game.world.centerX,game.world.centerY,'skull');
        this.skull.anchor.setTo(0.5,0.5);
        this.skull.scale.setTo(0.1,0.1);
        
        game.physics.arcade.enable(this.skull);

        this.skullSpeed = 500;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
          Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
 
        game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(this.explode,this);
	},

	update: function() {
        this.skullUpdate();
        game.physics.arcade.collide(this.skull,this.layer3);
	},
    
    createWorld: function() {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        this.layer1 = this.map.createLayer('Tile Layer 1');
        this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer3 = this.map.createLayer('Tile Layer 3');
        this.layer1.resizeWorld();
        this.map.setCollisionByExclusion([],true,this.layer3);
        //this.layer3.debug = true;
    },
    
    skullUpdate: function() {
        if (this.cursor.left.isDown && this.cursor.up.isDown){
            this.skull.body.velocity.x = -this.skullSpeed/Math.sqrt(2);
            this.skull.body.velocity.y = -this.skullSpeed/Math.sqrt(2);
        }
        else if (this.cursor.right.isDown && this.cursor.up.isDown){
            this.skull.body.velocity.x = this.skullSpeed/Math.sqrt(2);
            this.skull.body.velocity.y = -this.skullSpeed/Math.sqrt(2);
        }
        else if (this.cursor.left.isDown && this.cursor.down.isDown){
            this.skull.body.velocity.x = -this.skullSpeed/Math.sqrt(2);
            this.skull.body.velocity.y = this.skullSpeed/Math.sqrt(2);
        }
        else if (this.cursor.right.isDown && this.cursor.down.isDown){
            this.skull.body.velocity.x = this.skullSpeed/Math.sqrt(2);
            this.skull.body.velocity.y = this.skullSpeed/Math.sqrt(2);
        }
        else if (this.cursor.left.isDown){
            this.skull.body.velocity.x = -this.skullSpeed;
        }
        else if (this.cursor.right.isDown){
            this.skull.body.velocity.x = this.skullSpeed;
        }
        else if (this.cursor.down.isDown){
            this.skull.body.velocity.y = this.skullSpeed;
        }
        else if (this.cursor.up.isDown){
            this.skull.body.velocity.y = -this.skullSpeed;
        }
        else{
            this.skull.body.velocity.x = 0;
            this.skull.body.velocity.y = 0;
        }
    },
    
    explode: function(){
        var explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(this.skull.x,this.skull.y);
        explosionAnimation.play('explosion',30,false,true);
        this.skull.kill();
    }
};
