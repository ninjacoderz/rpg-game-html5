import { Hero } from "./hero.js";
import { Input } from "./input.js";
import { World } from "./world.js";

export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;

const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE/2;

window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    class Game {
        constructor(){
            this.world = new World();
            this.hero = new Hero({
                game: this,
                position: {x: 5 * TILE_SIZE, y: 5 * TILE_SIZE},
                scale: 1,
                sprite: {
                    x: 0, 
                    y: 5, 
                    width: 64, 
                    height:64, 
                    image: document.getElementById("hero1")}
            });
            this.input = new Input(this);
            this.eventUpdate = false;
            this.eventTimer = 0;
            this.eventInterval = 100;
            this.debug = false;
    
        }

        toggleDebug () {
            this.debug = !this.debug;
        }

        render(ctx, deltaTime) {
            this.world.drawBackground(ctx);
            if(this.debug){
                this.world.drawGrid(ctx);
                this.world.drawCollision(ctx);
            }
            this.hero.draw(ctx);
            this.world.drawForeground(ctx);

            if(this.eventTimer < this.eventInterval) {
                this.eventTimer += deltaTime;
                this.eventUpdate = false;
            } else {
                this.eventTimer = 0;
                this.eventUpdate = true;
            }

        }

        update(deltaTime){
            this.hero.update(deltaTime);
        }
    }
    
    const game = new Game();
    let lastTime = 0;
    function animate(timeStamp){
        requestAnimationFrame(animate);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.render(ctx, deltaTime);
        game.update(deltaTime);

        
    }
    this.requestAnimationFrame(animate);
})