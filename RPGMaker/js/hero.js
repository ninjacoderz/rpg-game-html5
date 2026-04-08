import { GameObject } from "./gameObject.js";
import { DOWN, UP, LEFT, RIGHT } from "./input.js";
import { TILE_SIZE } from "./main.js";

export class Hero extends GameObject{
    constructor({
        game,
        sprite,
        position,
        scale
    }) {
        super({
            game,
            sprite,
            position,
            scale
        });
        this.speed = 100;
        this.maxFrame = 8;
        this.moving = false;
    }

    update(deltaTime) {
        const scaledSpeed = this.speed * (deltaTime/1000 );

        const distance = this.moveTowards(this.destinationPosition, scaledSpeed);

        const arrived = distance <= scaledSpeed; 
        

        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        if(arrived){
            if(this.game.input.lastKey === UP){
                nextY-= TILE_SIZE;
                this.sprite.y = 8;
            } else if(this.game.input.lastKey === DOWN){
                nextY += TILE_SIZE;
                this.sprite.y = 10;
            }
            else if(this.game.input.lastKey === LEFT){
                nextX -= TILE_SIZE;
                this.sprite.y = 9;
            }
            else if(this.game.input.lastKey === RIGHT){
                nextX += TILE_SIZE;
                this.sprite.y = 11;
            }
            const col = nextX / TILE_SIZE;
            const row = nextY / TILE_SIZE;
            const isCollision = this.game.world.checkCollision(row, col);
            
            if(isCollision !== 1) {
                this.destinationPosition.x = nextX;
                this.destinationPosition.y = nextY;
            }
        }

        if(this.game.input.keys.length > 0 || !arrived){
            this.moving = true;
        } else {
            this.moving = false;
        }
        if(this.game.eventUpdate && this.moving) {
            this.sprite.x < this.maxFrame ? this.sprite.x++ : this.sprite.x = 0;
        } else if(!this.moving) {
            this.sprite.x = 0;
        }
        
    }
}