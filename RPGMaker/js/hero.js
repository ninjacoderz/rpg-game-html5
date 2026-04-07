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
        this.speed = 1;
    }

    update() {
        const distance = this.moveTowards(this.destinationPosition, this.speed);
        const arrived = distance <= this.speed; 
        if(arrived){
            if(this.game.input.lastKey === UP){
                this.destinationPosition.y -= TILE_SIZE;
            } else if(this.game.input.lastKey === DOWN){
                this.destinationPosition.y += TILE_SIZE;
            }
            else if(this.game.input.lastKey === LEFT){
                this.destinationPosition.x -= TILE_SIZE;
            }
            else if(this.game.input.lastKey === RIGHT){
                this.destinationPosition.x += TILE_SIZE;
            }
        }
    }
}