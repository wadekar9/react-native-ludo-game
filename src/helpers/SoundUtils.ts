import { SOUNDS } from "$assets/sfx";
import SoundPlayer from "react-native-sound-player";

export const getSoundPath = (soundName: SOUND_NAME): any => {
    switch(soundName){
        case "dice_roll" :
            return SOUNDS.DiceRoll
        case "cheer" :
            return SOUNDS.Cheer
        case "collide" :
            return SOUNDS.Collide
        case "game_start" :
            return SOUNDS.GameStart
        case "sound_girl1" :
            return SOUNDS.Girl1
        case "sound_girl2" :
            return SOUNDS.Girl2
        case "sound_girl3" :
            return SOUNDS.Girl3
        case "sound_girl0" :
            return SOUNDS.Girl4
        case "home" :
            return SOUNDS.Home
        case "home_win" :
            return SOUNDS.HomeWin
        case "pile_move" :
            return SOUNDS.PileMove
        case "safe_spot" :
            return SOUNDS.SafeSpot
        case "ui" :
            return SOUNDS.UI
        default :
            throw new Error(`Sound ${soundName} not found`);
    }
}

export const playSound = (soundName: SOUND_NAME) => {
    try {
        const soundPath = getSoundPath(soundName);
        SoundPlayer.playAsset(soundPath);
    } catch (err) {
        console.error("Can't play the sound file", err);
    }
}

export const stopSound = () => {
    try {
        SoundPlayer.stop();
    } catch (err) {
        console.error("Can't stop the sound", err);
    }
}