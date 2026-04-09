function startScene(event){
    if(requestId) {
        cancelAnimationFrame(requestId);
    }

    class Point {
        constructor (x, y) {
            this.x = x;
            this.y = y;
        }
    }
     
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let floorImage = document.getElementById('floor');
    let wallImage = document.getElementById('wall');

    function cartesianToIsometric(cartPt) {
        var tempPt = new Point();
        tempPt.x = cartPt.x - cartPt.y;
        tempPt.y = (cartPt.x + cartPt.y) / 2;
        return tempPt;
    }

    let floorImageWidth = 103;
    let floorImageHeight = 53;
    let wallImageWidth = 103;
    let wallImageHeight = 98;

    let sceneX = window.innerWidth/2;
    let sceneY = 100;

    let tileWidth = 50;

    function drawScene(time) {
        for ( var x = 0; x < 15; x++) {
            for ( var y = 0; y < 15; y++) {
                let p = new Point();
                p.x = x * tileWidth;
                p.y = y * tileWidth;

                let iso = cartesianToIsometric(p);
                iso.x += sceneX;
                iso.y += sceneY;
                let offset = {x: floorImageWidth/2, y: floorImageHeight}

                ctx.drawImage(floorImage, iso.x - offset.x, iso.y - offset.y );
                

                if(y % 3 == 0 && x % 3 == 0){
                    offset = {x: wallImageWidth/2, y: wallImageHeight} 
                    ctx.drawImage(wall, iso.x - offset.x, iso.y - offset.y);
                   
                    // put some more on second level floor
                    if(y % 6 == 0 && x % 6 == 0){
                        let isoHeight = wallImageHeight - floorImageHeight
                        offset.y += isoHeight
                        ctx.drawImage(wall, iso.x - offset.x, iso.y - offset.y);   
                    }
                    
                }
            }
        }
       
    }

     return requestAnimationFrame(drawScene);
}
let requestId;
window.addEventListener('DOMContentLoaded', (event) => {
    requestId = startScene();
})