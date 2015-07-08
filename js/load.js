var loadState = {

    preload: function(){
        var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading...', {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5,0.5);
        
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5,0.5);
        
        game.load.setPreloadSprite(progressBar);
        
        game.load.spritesheet('skull','assets/skull.png');
        game.load.spritesheet('explosion','assets/explosion.png',128,128);
        game.load.image('tileset','assets/tileset.png');
        game.load.image('teddy','assets/teddybearprojectile.png');
        game.load.tilemap('map','assets/map.json',null,Phaser.Tilemap.TILED_JSON);
        },
    
    create: function(){
        game.state.start('menu');
    }
};