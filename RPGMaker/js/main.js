import { Hero } from "./hero.js";
import { Input } from "./input.js";
import { World } from "./world.js";

export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;

const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;

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
                position: {x: 5, y: 5},
                sprite: {
                    x: 0, 
                    y:0, 
                    width: 64, 
                    height:64, 
                    image: document.getElementById("hero1")}
            });
            this.input = new Input();
        }

        render(ctx) {
            this.hero.update();
            this.world.drawBackground(ctx);
            this.world.drawGrid(ctx);
            this.hero.draw(ctx);
            this.world.drawForeground(ctx);
        }

        update(){
            this.hero.update();
        }
    }
    
    const game = new Game();
    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.render(ctx);
        game.update();
    }
    this.requestAnimationFrame(animate);
})