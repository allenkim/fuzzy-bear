var playState = {

	create: function() {

        this.createWorld();

				this.spriteDimension = 32;

        this.counter = 0;
        this.counterText = game.add.text(10,10,'Time Survived: 0 seconds',{font: '20px Arial', fill: '#ffffff'});
        this.timerLoop = game.time.events.loop(1000,this.updateTime,this);

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
        for (var i = 0; i < 1000; i++){
            var teddy = this.teddies.create(0,0,'teddy',0,false);
            teddy.anchor.setTo(0.5,0.5);
						teddy.height = this.spriteDimension;
						teddy.width = this.spriteDimension;
            game.physics.arcade.enable(teddy);
        }
        this.teddies.setAll('checkWorldBounds',true);
        this.teddies.setAll('outOfBoundsKill',true);

        this.skull = game.add.sprite(game.world.centerX,game.world.centerY,'skull');
        this.skull.anchor.setTo(0.5,0.5);
        this.skull.height = this.spriteDimension;
				this.skull.width = this.spriteDimension;

        game.physics.arcade.enable(this.skull);

        this.cursor = game.input.keyboard.createCursorKeys();

        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
          Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

        game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(this.skullExplode,this);

        this.skullSpeed = 400;
        this.teddySpeed = 150;
        this.cooldownTime = 400;

        this.nextTeddy = 0;
				this.nextNeuralCheck = 0;

				this.neuralCooldown = 10;

				// note that left bound = 172.7
				// right bound = 627.3
				this.leftBound = 172.7;
				this.rightBound = 627.3;
    },

	update: function() {
		console.log(this.skull.x);
				if (this.nextTeddy < game.time.now){
						this.createRandomTeddy();
						this.nextTeddy = game.time.now + this.cooldownTime;
				}
        game.physics.arcade.collide(this.skull,this.layer3);
        game.physics.arcade.overlap(this.skull,this.teddies,this.skullExplode,null,this);
				this.teddies.forEachAlive(function(teddy){
					var diffX = teddy.x - this.skull.x;
					var diffY = teddy.y - this.skull.y;
					var diff = Math.sqrt(diffX*diffX + diffY*diffY);
					var location = 0.5;
					if (this.skull.x < this.leftBound + this.spriteDimension)
						location = 0;
					else if (this.skull.x > this.rightBound - this.spriteDimension)
						location = 1;
					if (diff < 70){
						this.skull.body.velocity.x = this.skullSpeed * 2 * (myPerceptron.activate([diffX,diffY,location]) - 0.5);
					}
					if (this.nextNeuralCheck < game.time.now){
						var sample = {};
						sample.input = [diffX,diffY,location];
						if (diff < 70){
							if (location != 0.5 && diffX < this.spriteDimension && diffX > -this.spriteDimension)
								sample.output = [1-location];
							else if (diffX > 0)
								sample.output = [0];
							else
								sample.output = [1];
							trainingSet.push(sample);
						}

						this.nextNeuralCheck = game.time.now + this.neuralCooldown;
					}
				},this);
	},

    updateTime: function() {
        this.counterText.setText('Time Survived: ' + (this.counter++) + ' seconds');
    },

    createRandomTeddy: function(){
        var teddy = this.teddies.getFirstExists(false);
				var offset = 250;
        var x = this.skull.x + (2 * game.rnd.frac() * offset) - offset;
        var y = (game.rnd.frac() < 0.5) ? 0 : game.world.height;
        teddy.reset(x,y);
				teddy.body.velocity.y = (y == 0) ? this.teddySpeed : -this.teddySpeed;
        //game.physics.arcade.moveToXY(teddy,this.skull.x,this.skull.y,this.teddySpeed);
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
        // if (this.cursor.left.isDown && this.cursor.right.isDown && this.cursor.down.isDown && this.cursor.up.isDown){
        //     this.skull.body.velocity.x = 0;
        //     this.skull.body.velocity.y = 0;
        // }
        // else if (this.cursor.right.isDown && this.cursor.left.isDown && this.cursor.up.isDown){
        //     this.skull.body.velocity.y = -this.skullSpeed;
        // }
        // else if (this.cursor.right.isDown && this.cursor.left.isDown && this.cursor.down.isDown){
        //     this.skull.body.velocity.y = this.skullSpeed;
        // }
        // else if (this.cursor.right.isDown && this.cursor.down.isDown && this.cursor.up.isDown){
        //     this.skull.body.velocity.x = this.skullSpeed;
        // }
        // else if (this.cursor.left.isDown && this.cursor.down.isDown && this.cursor.up.isDown){
        //     this.skull.body.velocity.x = -this.skullSpeed;
        // }
/*
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
        }*/
    },

    skullExplode: function(skull,skullKiller){
				var explosionAnimation = this.explosions.getFirstExists(false);
				explosionAnimation.reset(this.skull.x,this.skull.y);
				explosionAnimation.play('explosion',30,false,true);
				skull.kill();
				skullKiller.kill();

        game.global.score = this.counter;
        game.time.events.remove(this.timerLoop);

        game.time.events.add(2000, this.quitGame, this);
    },

    quitGame: function(){
        this.gameMusic.stop();
				console.log(trainingSet);
				myTrainer.train(trainingSet);
				trainingSet = [];
        game.state.start('play');
    }
};
