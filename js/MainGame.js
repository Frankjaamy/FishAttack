var game = new Phaser.Game(768, 832, Phaser.AUTO, '', { preload: preload, create: create, update: update,render:render });
var gameManager = GameManager.createNew();


function preload() {
    gameManager.preload();
}


function resetMoveStatus(){
    this.isMovingDown = false;
    this.wormSprite.body.velocity.y = 0;
    this.moveDownTime = 1000;
    this.isFacingRight = !this.isFacingRight;
}


function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 0;
    game.physics.p2.restitution = 0.8;
	game.physics.p2.setImpactEvents(true);
	game.paused = false;
	tigerFishCollision = game.physics.p2.createCollisionGroup();
	fishCollision = game.physics.p2.createCollisionGroup();
	wayPointCollision = game.physics.p2.createCollisionGroup();
	coralCollision = game.physics.p2.createCollisionGroup();
	obstacleCollision = game.physics.p2.createCollisionGroup();
 	playerCollision= game.physics.p2.createCollisionGroup();
	bulletCollision= game.physics.p2.createCollisionGroup();

    gameManager.initInput(this.game);
    gameManager.initMap(this.game);
    gameManager.createBaits(this.game);
    gameManager.createFishs(this.game);
    gameManager.createPlayer(this.game);
    gameManager.createBullets(this.game);
    gameManager.initUIInterface(this.game);
}

function update() {  
    if(isGameStart){
        gameManager.updateInput(this.game);
        gameManager.updateGame();      
    }
    else if(isGameEnd){
        UI.updateEndUI(this.game);
    }
    if(fireButton.isDown){
        if(isGameStart == false && isGameEnd == false){
            mainMenuText.kill();
            text1.kill();
            isGameEnd = false;
            isGameStart = true;
            game.paused = false;            
        }
    }

}

function render () {
    //gameManager.debugUpdate(this.game);
}