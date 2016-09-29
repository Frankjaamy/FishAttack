var baitNumber;

GameManager = {
	createNew:function(){
		var gm = {};
		gm.name = "Manager";
		gm.preload = function(){
    		game.load.image('bullet','assets/bullet_temp.png');
			game.load.image('backGround','assets/background.png');

			game.load.spritesheet('newBullet','assets/bullet_v2.png',3,28, 9);

    		game.load.spritesheet('fish','assets/Fish_v2.png',32,32);
    		game.load.spritesheet('tigerFish','assets/TigerFish_v3.png',32,32);
			game.load.spritesheet('tigerFishDive','assets/TigerFishDive_v1.png',32,32);

			game.load.spritesheet('obstacle0','assets/CoralSprite_v3.png',32,32);
    		game.load.spritesheet('bait0','assets/CoralSprite_v3.png',32,32);

			game.load.spritesheet('obstacle1','assets/CoralSprite_v4.png',32,32);
    		game.load.spritesheet('bait1','assets/CoralSprite_v4.png',32,32);

			game.load.spritesheet('obstacle2','assets/CoralSprite_v5.png',32,32);
    		game.load.spritesheet('bait2','assets/CoralSprite_v5.png',32,32);

			game.load.spritesheet('obstacle3','assets/CoralSprite_v6.png',32,32);
    		game.load.spritesheet('bait3','assets/CoralSprite_v6.png',32,32);

			game.load.spritesheet('obstacle4','assets/CoralSprite_v7.png',32,32);
    		game.load.spritesheet('bait4','assets/CoralSprite_v7.png',32,32);

			game.load.spritesheet('obstacle5','assets/CoralSprite_v8.png',32,32);
    		game.load.spritesheet('bait5','assets/CoralSprite_v8.png',32,32);

			game.load.spritesheet('obstacle6','assets/CoralSprite_v9.png',32,32);
    		game.load.spritesheet('bait6','assets/CoralSprite_v9.png',32,32);

			game.load.spritesheet('obstacle7','assets/CoralSprite_v10.png',32,32);
    		game.load.spritesheet('bait7','assets/CoralSprite_v10.png',32,32);

    		game.load.spritesheet('bobbit','assets/Bobbit_V1.png',32,32);
			game.load.spritesheet('explode','assets/DeathSprite.png',32,32);

    		game.load.bitmapFont('carrier_command','assets/fonts/carrier_command.png','assets/fonts/carrier_command.xml');

    		game.load.audio('shoot', 'assets/audio/Laser_Shoot5.wav');
    		game.load.audio('die', 'assets/audio/Hit_Hurt3.wav');
    		game.load.audio('dive', 'assets/audio/Attacking_Fish1.wav');
		}
		gm.initInput = function(game){
			cursors = game.input.keyboard.createCursorKeys();
   			fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		}
		gm.initMap = function(game){

			var background = game.add.sprite(0, 0, 'backGround');
			background.scale.setTo(768/1024,832/1024);
			soundShoot = game.add.audio('shoot');
			soundHit = game.add.audio('die');
			soundDive = game.add.audio('dive');

			soundShoot.volume = 0.3;
			soundHit.volume = 0.3;
			soundDive.volume = 0.2;

			mapRows = Math.round(game.world.height/obstacleHeight);
			mapCols = Math.round(game.world.width/obstacleWidth);
			map = new Array(mapRows);
			for(var i=0;i<mapRows;i++){
				map[i] = new Array(mapCols);
				for(var j=0;j<mapCols;j++){
					map[i][j]=0;
				}
			}
		}
		gm.createBaits = function(game,isResetMode = false){
			if(!isResetMode){
				baits = game.add.group();
	    		baits.enableBody = true;
	    		baits.physicsBodyType = Phaser.Physics.P2JS;
	    		//baits.createMultiple(20,'obstacle',0,false);
	    		baits.setAll('outOfBoundsKill', true);
	    		baits.setAll('checkWorldBounds', true);

	    		obstacles = game.add.group();
	    		obstacles.enableBody = true;
    			obstacles.physicsBodyType = Phaser.Physics.P2JS;
			}
			else{
				;
			}
			var randomBait = game.rnd.integerInRange(0, 7);
			baitNumber = randomBait;
	    	for(var i =0;i<24;i++){
		        var indexX = game.rnd.integerInRange(2,mapCols-2);
		        var indexY = game.rnd.integerInRange(2,mapRows-4);
		        var offsetX = new Array(
		        	-1,-1,-1,0,0,1,1,1
		        	);
		        var offsetY = new Array(
		        	-1,0,1,1,-1,-1,0,1
		        	);
		        for(var j =0;j<8;j++){
		        	if(map[indexY+offsetY[j]][indexX+offsetX[j]]==1){
		        		break;
		        	}
		        	if(map[indexY][indexX] == 0){

						var randomBait = Math.random() * (7 - 0) + 0;
				        var ob = game.add.sprite(indexX*obstacleWidth,indexY*obstacleHeight,'bait0');
				        switch (baitNumber)
						{
							case 0:
								ob.loadTexture('bait0', 0, false)
								break;
							case 1:
								ob.loadTexture('bait1', 0, false)
								break;
							case 2:
								ob.loadTexture('bait2', 0, false)
								break;
							case 3:
								ob.loadTexture('bait3', 0, false)
								break;
							case 4:
								ob.loadTexture('bait4', 0, false)
								break;
							case 5:
								ob.loadTexture('bait5', 0, false)
								break;
							case 6:
								ob.loadTexture('bait6', 0, false)
								break;
							case 7:
								ob.loadTexture('bait7', 0, false)
								break;

						}
				        baits.add(ob);
				    	map[indexY][indexX] = 1;
				        ob.name = i.toString();
				        ob.body.setCircle(18);
				        ob.body.static = true;
				        ob.body.setCollisionGroup(coralCollision);
				        ob.body.collides([fishCollision,tigerFishCollision,playerCollision,bulletCollision]);
		        	}
		        }
	    	}

		}
		gm.createFishs = function(game){
			fishs = [];
			tigerFishs = [];
			fishSprites = game.add.group();
			tigerFishSprites = game.add.group();

			headWorm = new Worm('headfishOne',(8-4+1+4)*fishWith,0,0,true,null,false,fishSprites,game,player,bullets);
			headWorm1 = new Worm('headfishTwo',(8-4+1+4)*fishWith,100,5,true,null,false,fishSprites,game,player,bullets);
			headWorm2 = new Worm('headfishThree',(8-4+1+4)*fishWith,150,8,true,null,false,fishSprites,game,player,bullets);
			var nameIndex = 0;
			for(var y = 1; y < 4; y++ ){
				for(var x = 0; x<2*y-1;x++){

					var fish = new Worm(nameIndex,(x-y+1+4)*fishWith,fishHeight*y,y,false,headWorm,false,fishSprites,game,player,bullets);
					fish.calDistanceToHead();
					fishs.push(fish);
					nameIndex++;
				}
			}
			var index = 0;
			for(var y = 3; y >= 1; y-- ){
				for(var x = 0; x<2*y-1;x++){
					var fish = new Worm(nameIndex,(x-y+1+4)*fishWith,fishHeight*(4+index),y,false,headWorm,false,fishSprites,game,player,bullets);
					fish.calDistanceToHead();
					fishs.push(fish);
					nameIndex++;
				}
				index++;
			}

			tigerFishs = [];
			for(var y = 1; y < 3; y++ ){
				for(var x = 0; x<2*y-1;x++){

					var fish = new Worm(nameIndex,(x-y+1+4)*fishWith,0,y,false,headWorm,true,tigerFishSprites,game,player,bullets);
					fish.calDistanceToHead();
					tigerFishs.push(fish);
					nameIndex++;
				}
			}
			index = 0;
			for(var y = 2; y >= 1; y-- ){
				for(var x = 0; x<2*y-1;x++){
					var fish = new Worm(nameIndex,(x-y+1+4)*fishWith,0,y,false,headWorm,true,tigerFishSprites,game,player,bullets);
					fish.calDistanceToHead();
					tigerFishs.push(fish);
					nameIndex++;
				}
				index++;
			}

			for(var z =0 ;z<6;z++){
				var fish = new Worm(nameIndex,game.world.width-(z)*fishWith,80,3,false,headWorm,true,tigerFishSprites,game,player,bullets,true);
					fish.calDistanceToHead();
					tigerFishs.push(fish);
					nameIndex++;
			}

		}
		gm.resetfishs = function(){
		    for (var i = 0; i < fishs.length; i++)
		    {

		    }
		}
		gm.createPlayer = function(game){
			player = game.add.sprite(game.world.width/2-playerWidth, game.world.height*4/5, 'bobbit');
    		game.physics.p2.enable(player);
    		player.body.fixedRotation = true;
    		//player.body.setCircle(16);
    		//  Our two animations, walking left and right.
    		player.animations.add('idle', [0, 1, 2, 3], 10, true);

    		player.body.setCollisionGroup(playerCollision);
    		player.body.collides([fishCollision,tigerFishCollision,coralCollision,obstacleCollision]);
		}

		gm.createBullets = function(game){
			bullets = game.add.group();
    		bullets.enableBody = true;
    		bullets.physicsBodyType = Phaser.Physics.P2JS;
    		bullets.createMultiple(1,'newBullet',0,false);

			bullets.callAll('animations.add', 'animations', 'newShoot', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);

    		bullets.setAll('outOfBoundsKill', true);
   			bullets.setAll('checkWorldBounds', true);

   			hitExplode = game.add.group();
    		hitExplode.enableBody = true;
    		hitExplode.physicsBodyType = Phaser.Physics.P2JS;
    		hitExplode.createMultiple(2,'explode',0,false);
    		hitExplode.setAll('outOfBoundsKill', true);
   			hitExplode.setAll('checkWorldBounds', true);

		}
		gm.fireBullet = function(game){
			if (game.time.now > bulletTime)
		    {
		        if(bullets.countDead()>0){
		        	soundShoot.play();
		            var bullet = bullets.getFirstExists(false);
		            bullet.reset(player.x,player.y);


					bullet.body.fixedRotation = true;
					bullet.animations.play('newShoot');

		            bullet.body.moveUp(1800);
					bullet.body.setCollisionGroup(bulletCollision);
		            //game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);

		            bullet.body.collides(coralCollision,bulletHitBait,this);
		            bullet.body.collides(obstacleCollision,bulletHitObstacle,this);
		            bullet.body.collides(fishCollision,bulletHitWorm,this);
		            bullet.body.collides(tigerFishCollision,bulletHitWorm,this);
		        }
		        bulletTime = game.time.now ;
		    }
		}
		gm.updateInput = function(game){
			//  Reset the players velocity (movement)
			var curPosX = player.x;
    		var curPosY = player.y;
		    player.body.setZeroVelocity();
		    if (cursors.left.isDown){
		        //  Move to the left
		        if(curPosX>0){
		        	player.body.moveLeft(300);
		        }
		    }
		    else if (cursors.right.isDown){
		        //  Move to the right
		        if(curPosX<game.world.width){
		         	player.body.moveRight(300);
		        }
		    }

		    if (cursors.up.isDown){
		        //  Move to the left
		        if(curPosY<game.world.height*3/4){
		        	;
		        }
		        else{
		        	player.body.moveUp(300);
		        }
		    }
		    else if (cursors.down.isDown){
		        //  Move to the right
		        if(curPosY<game.world.height){
		        	player.body.moveDown(300);
		        }
		    }
		    player.animations.play('idle');
		    if(fireButton.isDown){
		        gameManager.fireBullet(game);
		    }
		}
		gm.updateGame = function(){
			if(shouldResetfishs){
		        this.resetfishs();
		        shouldResetfishs = false;
		    }
		    headWorm.update(true);
		    headWorm1.update(true);
		    headWorm2.update(true);
		    for(var i =0;i<fishs.length;i++){
		        if(fishs[i].isAlive){
		            fishs[i].update(false);

		        }
		    }
		    for(var i =0;i<tigerFishs.length;i++){
		        if(tigerFishs[i].isAlive){
		            tigerFishs[i].update(false);

		        }
		    }


		    for(var i =0;i<fishs.length;i++){
		        if(fishs[i].isAlive){
		            shouldResetfishs = false;
		            break;
		        }
		        shouldResetfishs = true;
		    }
		    for(var i =0;i<tigerFishs.length;i++){
		        if(tigerFishs[i].isAlive){
		            shouldResetTigerfishs = false;
		            break;
		        }
		        shouldResetTigerfishs = true;
		    }
		    if(shouldResetfishs&&shouldResetTigerfishs){
		    	this.createBaits(game,true);
		    	this.createFishs(game);
		    }
		}
		gm.initUIInterface = function(game){
			UI = UIInterface.createNew(game);
			UI.initUI(game);
		}
		gm.debugUpdate = function(game){
			game.debug.body(player);
			game.debug.body(headWorm.fishSprite);
			game.debug.body(headWorm1.fishSprite);
			game.debug.body(headWorm2.fishSprite);
			 for(var i = 0;i<baits.length;i++){
			 	var ob = baits.getAt(i);
			 	game.debug.body(ob);
			 }

			 for(var i = 0;i<fishSprites.length;i++){
			 	var ob = fishSprites.getAt(i);
			 	game.debug.body(ob);
			 }
		}
		return gm;
	}
};
