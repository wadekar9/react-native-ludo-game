declare module '*.jpg';
declare module '*.png';
declare module '*.mp3';

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare type SOUND_NAME = "dice_roll" | "cheer" | "collide" | "game_start" | "sound_girl1" | "sound_girl2" | "sound_girl3" | "sound_girl0" | "home" | "home_win" | "pile_move" | "safe_spot" | "ui";
declare type PLAYER_PIECE = { id: string; pos: number; travelCount: number; };

declare type INITIAL_STATE = {
  player1: PLAYER_PIECE[];
  player2: PLAYER_PIECE[];
  player3: PLAYER_PIECE[];
  player4: PLAYER_PIECE[];
  chancePlayer: number;
  diceNo: number;
  isDiceRolled: boolean;
  pileSelectionPlayer: number;
  cellSelectionPlayer: number;
  touchDiceBlock: boolean;
  currentPosition: PLAYER_PIECE[];
  fireworks: boolean;
  winner: any;
}

