var menuState = {
    create: function(){
        
        var nameLabel = game.add.text(game.world.centerX,-50,'Fuzzy Bear',{font: '70px Geo', fill: '#ffffff'});
        nameLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(nameLabel).to({y:250},1500).easing(Phaser.Easing.Bounce.Out).start();
        
        var startLabel = game.add.text(game.world.centerX, game.world.height-150,
            'Press the UP arrow key to start', 
            { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(startLabel).to({angle:-2},1000).to({angle:2},1000).to({angle:0},500).loop().start(
);
        
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        // Start the actual game
        game.state.start('play');   
    }
};