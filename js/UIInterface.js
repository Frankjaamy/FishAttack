var scoreText;
var mainMenuText;
var endGameText;

var text1;
var text2;
var endScoreText;

var playerLivesUI;
UIInterface = {
	createNew:function(game){
		var ui = {};
		ui.name = "UIInterface";
		ui.game = game;
		ui.initUI = function(game){
			scoreText = game.add.bitmapText(0,8,'carrier_command','Score:'+ score,16);
			scoreText.inputEnable = true;

			mainMenuText = game.add.bitmapText(game.world.width/2 - 128,game.world.height/2-80,'carrier_command','Fish Attack',32);
			text1 = game.add.bitmapText(game.world.width/2 - 240,game.world.height/2,'carrier_command','Press Space to Start',24);

			playerLivesUI = game.add.group();
			playerLivesUI.createMultiple(playerLives,'bobbit',false);

			for(var i =0;i<playerLivesUI.length;i++){
				var live = playerLivesUI.getAt(i);
				live.reset(game.world.width/5 + i*playerWidth,0+playerHeight/2-16);
			}
		}

		ui.updateUI = function(event){
			if(event == 0){
				var live = playerLivesUI.getAt(playerLives-1);
				live.kill();
			}
			else if(event ==1){
				score += 10;
				scoreText.setText('Score:'+ score);
			}
			else if(event ==2){
				score += 20;
				scoreText.setText('Score:'+ score);
			}

		}

		ui.updateEndUI = function(game){
			if(!isGameFinish)
				mainMenuText = game.add.bitmapText(game.world.width/2 - 144,game.world.height/2-100,'carrier_command','Game Over',32);
			else
				mainMenuText = game.add.bitmapText(game.world.width/2 - 128,game.world.height/2-100,'carrier_command','Good Job',32);
			endScoreText = game.add.bitmapText(game.world.width/2 - 144,game.world.height/2-60,'carrier_command','Score:'+score,32);
			if(!isGameFinish)
				text1 = game.add.bitmapText(game.world.width/2 - 298,game.world.height/2,'carrier_command','Press F5 to Start Again.',24);
			else
				text1 = game.add.bitmapText(game.world.width/2 - 244,game.world.height/2,'carrier_command','Press Space to Restart',24);
		}
		return ui;
	}
}
