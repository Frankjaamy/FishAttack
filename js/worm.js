var obstacles;
var baits;
var player;
var fishSprites;
var tigerFishSprites;
Worm = function(index,x,y,z,isHeadFish,headfish,isTigerFish,fishSpriteManage,game,player,bullets,patrolMode=false,biteNeed = 3){
    this.game = game;
    this.health = 1;
    this.biteNeed = biteNeed;
    this.fishWayPointIndex = z;
    this.movingUp = false;
    this.isAlive = true;
    this.distanceToHeadFish = 0;
    this.offsetX=0;
    this.offsetY=0;
    this.runPosX = 0;
    this.runPosY = 0;
    this.patrolMode = patrolMode;

    this.speed = 1/60;
    this.player = player;
    this.bullets = bullets;
    this.previousObstacleHitten = null;

    this.moveTime = 1000;
    this.isScared = false;
    this.isTigerFish = isTigerFish;
    if(isTigerFish == true){
        this.fishSprite = game.add.sprite(x,y,'tigerFish');
    }
    else{
        this.fishSprite = game.add.sprite(x,y,'fish');
    }
    this.fishSprite.anchor.set(0.5,0.0);
    this.fishSprite.name = index.toString();
    if(isTigerFish == true){
        this.fishSprite.animations.add('swim',[0,1,2,3,4,5,6,7,8],10,true);
        this.fishSprite.animations.add('dive',[9,10,11,12,13,14,15],10,true);
    }
    else {
        this.fishSprite.animations.add('swim',[0,1,2,3],10,true);
    }

    game.physics.p2.enable(this.fishSprite,false);
    this.fishSprite.body.setCircle(12);
    this.fishSprite.body.fixedRotation = true;
    this.fishSprite.body.collideWorldBounds = true;
    if(this.isTigerFish){
    	this.fishSprite.body.setCollisionGroup(tigerFishCollision);
    	this.fishSprite.body.collides([tigerFishCollision,obstacleCollision,bulletCollision]);
    }
    else{
		this.fishSprite.body.setCollisionGroup(fishCollision);
		this.fishSprite.body.collides([obstacleCollision,bulletCollision]);
		this.fishSprite.body.collides(fishCollision,onFishCollision,this);
    }
    this.fishSprite.body.collides(coralCollision,fishEatingBaits,this);
    this.fishSprite.body.collides(playerCollision,playerHitWorm,this);

    this.isHeadFish = isHeadFish;
    if(isHeadFish){
        this.headFish = null;
        this.fishSprite.alpha = 0; 
        this.fishSprite.body.setCollisionGroup(wayPointCollision);
    }
    else{
        this.headFish = headfish;
        fishSpriteManage.add(this.fishSprite);
    }
}
Worm.prototype.calDistanceToHead = function(){
    if(this.headFish != null){
        this.distanceToHeadFish = this.game.physics.arcade.distanceBetween(this.fishSprite,this.headFish.fishSprite);
    }
}
var wayPointsX = new Array(896,-128,896,-128,896,-128,896,-128,896,-128,896);
var wayPointsY = new Array(128,256,256,384,384,512,512,640,640, 768,768);


Worm.prototype.update = function(isHeadFish){
    if(isHeadFish){
        if(game.time.now>this.moveTime){
            var x = wayPointsX[this.fishWayPointIndex];//game.rnd.integerInRange(50,game.world.width-50);
            var y = wayPointsY[this.fishWayPointIndex];//game.rnd.integerInRange(100,game.world.height-100);
            this.fishSprite.rotation = game.physics.arcade.moveToXY(this.fishSprite,x,y,160,3000);
            this.moveTime = game.time.now+3000;
            if(!this.movingUp){
                this.fishWayPointIndex++;
                if(this.fishWayPointIndex>=10){
                    this.movingUp = true;
                }
            }
            else{
                this.fishWayPointIndex--;
                if(this.fishWayPointIndex<=0){
                    this.movingUp = false;
                }
            }
        }
    }
    else{
        if(!this.isScared){
    		if(!this.patrolMode){
	            this.fishSprite.play('swim');
	            var rotation = this.headFish.fishSprite.rotation;
	            var x = this.headFish.fishSprite.x;//+this.distanceToHeadFish * Math.cos(rotation);
	            var y = this.headFish.fishSprite.y;//+this.distanceToHeadFish * Math.sin(rotation);
	            this.fishSprite.rotation = game.physics.arcade.moveToXY(this.fishSprite, x,y,200); 
    		}
    		else{
		        if(game.time.now>this.moveTime){
		            this.runPosX = wayPointsX[this.fishWayPointIndex]+256;//game.rnd.integerInRange(50,game.world.width-50);
		            this.runPosY = wayPointsY[this.fishWayPointIndex]-300;//game.rnd.integerInRange(100,game.world.height-100)
		            this.moveTime = game.time.now+3000;
		            if(!this.movingUp){
		                this.fishWayPointIndex++;
		                if(this.fishWayPointIndex>=4){
		                    this.movingUp = true;
		                }
		            }
		            else{
		                this.fishWayPointIndex--;
		                if(this.fishWayPointIndex<=3){
		                    this.movingUp = false;
		                }
		            }
		        }
		        this.fishSprite.rotation = game.physics.arcade.moveToXY(this.fishSprite,this.runPosX,this.runPosY,240);
    			this.fishSprite.play('swim');
    		}
        }
        else{
            if(!this.isTigerFish){
                this.fishSprite.play('swim');
                this.fishSprite.rotation = game.physics.arcade.moveToXY(this.fishSprite, this.runPosX,this.runPosY,200);
                var point = new Phaser.Point(this.runPosX,this.runPosY);
                if(point.distance(this.fishSprite)<100){
                    this.isScared = false;
                }
                if(game.time.now>this.moveTime){
                    this.isScared = false;
                }
            }
            else{
                this.fishSprite.play('dive');
                this.fishSprite.rotation = game.physics.arcade.moveToXY(this.fishSprite, this.runPosX,this.runPosY,480);
                if(game.time.now>this.moveTime){
                    this.isScared = false;
                }                
            }

        }
    }
    return;
}