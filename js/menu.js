var menuState = {
    create: function(){
        
        var background = game.add.sprite(0,0,'background');
        background.width = game.world.width;
        background.height = game.world.height;

        this.menuMusic = game.add.audio('menuMusic');
        this.menuMusic.play();
        this.menuMusic.loop = true;

        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', 0);
        }
        
        if (game.global.score > localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', game.global.score);   
        }

        this.text = 'Score: ' + game.global.score + ' seconds\nHigh score: ' + localStorage.getItem('bestScore') + ' seconds';
        this.scoreLabel = game.add.text(game.world.centerX, game.world.centerY-30, this.text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
        this.scoreLabel.anchor.setTo(0.5, 0.5);

        this.nameLabel = game.add.text(game.world.centerX,-50,'Fuzzy Bear',{font: '50px Geo', fill: '#ffffff'});
        this.nameLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(this.nameLabel).to({y:200},1500).easing(Phaser.Easing.Bounce.Out).start();

        var startLabel = game.add.text(game.world.centerX, game.world.height-200,
            'Press the UP arrow key to start', 
            { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);

        var clearLabel = game.add.text(game.world.centerX, game.world.height-150,
            'Press the DOWN arrow key to reset high score', 
            { font: '25px Arial', fill: '#ffffff' });
        clearLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(startLabel).to({angle:-2},1000).to({angle:2},1000).to({angle:0},500).loop().start();
        game.add.tween(clearLabel).to({angle:-2},1000).to({angle:2},1000).to({angle:0},500).loop().start();        
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);

        downKey.onDown.addOnce(this.clearHighScore, this);
    },

    clearHighScore: function(){
        localStorage.setItem('bestScore', 0);
        this.text = 'Score: ' + game.global.score + ' seconds\nHigh score: 0 seconds';
        this.scoreLabel.setText(this.text);
    },

    start: function() {
        this.menuMusic.stop();
        // Start the actual game
        game.state.start('play');   
    }
};