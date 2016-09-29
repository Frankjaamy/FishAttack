function explode(x,y)
{
    if(hitExplode.countDead()>0){
        var explode = hitExplode.getFirstExists(false);
        var anim = explode.animations.add('boom',[0,1,2,3],10,false);
        anim.onComplete.add(explodeOver, this);
        explode.play('boom');
        explode.reset(x,y);
        //game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);        
    }

}
function explodeOver(explode,boom){
    explode.kill();
}
function fishHit (worm1, worm2) {

}
function onFishCollision(body1,body2){
	var fish1 = body1.sprite;
	var fish2 = body2.sprite;

	var thisFish = fishs[fish1.name];
	var thisFish2 = fishs[fish2.name];


	thisFish.headFish = thisFish2.headFish;
}

function playerHitWorm (body1, body2) {
	player.kill();
    soundHit.play();
    explode(player.x,player.y);
    UI.updateUI(0);
	playerLives--;
	
	player.reset(game.world.width/2-playerWidth, game.world.height - playerHeight);

    if(playerLives<=0){
        isGameEnd = true;
        isGameStart = false;
    }
}

function bulletHitBait (bullet, bait) {
    // Removes the star from the screen
    if(bullet.sprite.isAlive == false){
    	return;
    }
    bullet.sprite.kill();
    if(bait.sprite.frame >= 3){
        var x_Index = Math.round(bait.x/obstacleWidth);
        var y_Index = Math.round(bait.y/obstacleHeight);
        map[y_Index][x_Index] = 0;
        explode(bait.sprite.x,bait.sprite.y);
        bait.sprite.kill();
        bait.frame = 0;
        baits.removeChild(bait.sprite);
        UI.updateUI(1);

        for(var i=0;i<tigerFishs.length;i++){
            var tmpFish = tigerFishs[i];
            if(game.physics.arcade.distanceBetween(tmpFish.fishSprite,bait.sprite)<=200){
                if(!tmpFish.isScared && tmpFish.isAlive){
                    tmpFish.isScared = true;
                    tmpFish.runPosX = player.x+game.rnd.integerInRange(0,30)-15;
                    tmpFish.runPosY = player.y+game.rnd.integerInRange(0,30);
                    tmpFish.moveTime = game.time.now + 2000;
                }                
            }
        }
    }    
    bait.sprite.frame ++;
}

function fishEatingBaits (body1, body2) {
	var fish = body1.sprite;
	var bait = body2.sprite;
    var thisFish = fishs[fish.name];
    if(thisFish == undefined){
        thisFish = tigerFishs[fish.name-fishs.length];
    }
    thisFish.biteNeed -= 0.2;
    if(thisFish.biteNeed<=0){
        bait.frame ++;
        thisFish.biteNeed = 3;
    }
    if(bait.frame >= 3){
    	var x_Index = Math.round(bait.x/obstacleWidth);
        var y_Index = Math.round(bait.y/obstacleHeight);
        map[y_Index][x_Index] = 0;
    	bait.kill();
    	bait.frame = 0;
        baits.removeChild(bait);
    }    

}

function bulletHitObstacle (body1, body2) {
    // Removes the star from the screen
    var obstacle = body2.sprite;
    var bullet = body1.sprite;
    if(bullet.isAlive == false){
    	return;
    }
    bullet.kill();
    if(obstacle.frame >= 3){
        var x_Index = Math.round(obstacle.x/obstacleWidth);
        var y_Index = Math.round(obstacle.y/obstacleHeight);
        map[y_Index][x_Index] = 0;
        explode(obstacle.x,obstacle.y);
        obstacle.kill();
        obstacle.frame = 0;
        obstacles.removeChild(obstacle);
        UI.updateUI(1);
    }    
    obstacle.frame ++;
}


function bulletHitWorm (body1, body2) {
	var fish = body2.sprite;
    var bullet = body1.sprite;
    // Removes the star from the screen
    if(bullet.isAlive == false){
    	return;
    }
    bullet.kill();   
    var thisFish = fishs[fish.name];
    if(thisFish == undefined){
        thisFish = tigerFishs[fish.name-fishs.length];
    }
    if(thisFish){
        thisFish.isAlive = false; 

        var x_Index = Math.round(fish.x/obstacleWidth);
        var y_Index = Math.round(fish.y/obstacleHeight);
        if(map[y_Index][x_Index] == 0){
	        var actualPosX = Math.round(x_Index)*obstacleWidth;
	        var actualPosY = Math.round(y_Index)*obstacleHeight;
	        obstacles.create(actualPosX,actualPosY,'obstacle');   
	        var ob = obstacles.getAt(obstacles.length-1);
	        switch (baitNumber)
			{
				case 0:
					ob.loadTexture('obstacle0', 0, false)
					break;
				case 1:
					ob.loadTexture('obstacle1', 0, false)
					break;
				case 2:
					ob.loadTexture('obstacle2', 0, false)
					break;
				case 3:
					ob.loadTexture('obstacle3', 0, false)
					break;
				case 4:
					ob.loadTexture('obstacle4', 0, false)
					break;
				case 5:
					ob.loadTexture('obstacle5', 0, false)
					break;
				case 6:
					ob.loadTexture('obstacle6', 0, false)
					break;
				case 7:
					ob.loadTexture('obstacle7', 0, false)
					break;
				
			}
            ob.body.setCircle(18);
            ob.body.static = true;
            ob.body.setCollisionGroup(obstacleCollision);
            ob.body.collides([fishCollision,tigerFishCollision,playerCollision,bulletCollision]);
        }

        scoreTrack.push([y_Index,x_Index]);
        UI.updateUI(2);
    }
    soundHit.play();
    explode(fish.x,fish.y);
    fish.kill();
    fishSprites.removeChild(fish);
    if(!thisFish.isTigerFish){
        for(var i=0;i<fishs.length;i++){
                var tmpFish = fishs[i];
                if(!tmpFish.isScared && tmpFish.isAlive && game.physics.arcade.distanceBetween(tmpFish.fishSprite,fish)<=50){
                    tmpFish.isScared = true;
                    
                    tmpFish.runPosX = game.rnd.integerInRange(50,game.world.width-50);
                    tmpFish.runPosY = game.rnd.integerInRange(100,game.world.height-100);
                    tmpFish.moveTime = game.time.now + 3000;

                    var index = game.rnd.integerInRange(0,2);
            		if(!tmpFish.isHeadFish){
            			if(index == 0)
            				tmpFish.headFish = headWorm;
            			else if(index == 1)
            				tmpFish.headFish = headWorm1;
            			else if(index == 2)
            				tmpFish.headFish = headWorm2;
            		}
                }
            }
    }
    else{
        soundDive.play();
        for(var i=0;i<tigerFishs.length;i++){
        var tmpFish = tigerFishs[i];
        if(!tmpFish.isScared && tmpFish.isAlive){
            tmpFish.isScared = true;
            
            tmpFish.runPosX = player.x+game.rnd.integerInRange(0,60)-30;
            tmpFish.runPosY = player.y+game.rnd.integerInRange(0,60)-30;

            tmpFish.moveTime = game.time.now + 2000;
            tmpFish.fishSprite.play('dive');
        }
        }
    }
    
}
