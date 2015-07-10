var playState = {

	create: function() { 
        
        this.createWorld();

        this.gameMusic = game.add.audio('gameMusic');
        this.gameMusic.play();
        this.gameMusic.loop = true;
        
        this.explosions = game.add.group();
        for (var i = 0; i < 30; i++){
            var explosionAnimation = this.explosions.create(0,0,'explosion',[0],false);
            explosionAnimation.anchor.setTo(0.5,0.8);
            explosionAnimation.animations.add('explosion');
        }

        this.teddies = game.add.group();
        for (var i = 0; i < 10; i++){
            var teddy = this.teddies.create(0,0,'teddy',0,false);
            teddy.anchor.setTo(0.5,0.5);
            game.physics.arcade.enable(teddy);
        }
        this.teddies.setAll('checkWorldBounds',true);
        this.teddies.setAll('outOfBoundsKill',true);
        
        this.skull = game.add.sprite(game.world.centerX,game.world.centerY,'skull');
        this.skull.anchor.setTo(0.5,0.5);
        this.skull.scale.setTo(0.1,0.1);
        
        game.physics.arcade.enable(this.skull);
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
          Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
 
        game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(this.skullExplode,this);
    
        this.skullSpeed = 300;
        this.teddySpeed = 200;
        this.cooldownTime = 1000;

        this.nextTeddy = 0;
    },

	update: function() {
        this.skullUpdate();
        game.physics.arcade.collide(this.skull,this.layer3);
        game.physics.arcade.overlap(this.skull,this.teddies,this.skullExplode,null,this);

        if (this.nextTeddy < game.time.now){
            this.createRandomTeddy();
            this.nextTeddy = game.time.now + this.cooldownTime;
        }
	},

    createRandomTeddy: function(){
        var teddy = this.teddies.getFirstExists(false);
        var x = (game.rnd.frac()<0.5)? 0 : game.world.width;
        var y = (game.rnd.frac()<0.5)? 0 : game.world.height;
        teddy.reset(x,y);
        game.physics.arcade.moveToXY(teddy,this.skull.x,this.skull.y,this.teddySpeed);
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
    
    skullExplode: function(skull,skullKiller){
        var explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(this.skull.x,this.skull.y);
        explosionAnimation.play('explosion',30,false,true);
        skull.kill();
        skullKiller.kill();

        game.time.events.add(2000, this.quitGame, this);
    },

    quitGame: function(){
        this.gameMusic.stop();
        game.state.start('menu');
    }
};
