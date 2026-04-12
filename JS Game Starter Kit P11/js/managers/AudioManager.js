export class AudioManager {
    constructor(){
        this.sounds = {};
    }

    load(name, path){
        return new Promise((resolve) => {
            const audio = new Audio(path);
            this.sounds[name] = { audio, loaded:false };
    
            audio.onloadeddata = () => {
                this.sounds[name].loaded = true;
                console.log(`Audio loaded: ${name}`);
                resolve();
            }
            audio.onerror = () => {
                console.log(`Audio failed: ${name} (will skip)`);
                resolve();
            }
        })
    }

    play(name){
        const sound = this.sounds[name];
        if (sound && sound.loaded){
            sound.audio.currentTime = 0;
            sound.audio.play().catch(err => {
                console.log(`Could not play ${name}:`, err);
            })
        }
    }

    async loadAll(){
        await Promise.all([
            this.load('pause', './audio/pause.mp3'),
            this.load('unpause', './audio/unpause.mp3'),
            this.load('button_hover', './audio/button_hover.mp3'),
            this.load('button_click', './audio/button_click.mp3'),
        ]);
    }
}