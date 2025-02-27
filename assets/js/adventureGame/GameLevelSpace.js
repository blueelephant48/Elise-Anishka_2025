// To build GameLevels, each contains GameObjects from below imports
import GameEnv from "./GameEnv.js";
import Background from "./Background.js";
import Player from "./Player.js";
import Npc from "./Npc.js";

class GameLevelSpace {
  constructor(path) {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_space = path + "/images/gamify/space.jpg"; // be sure to include the path
    const image_data_space = {
      name: "space",
      greeting: "Ah, the vast expanse of space... Endless possibilites",
      src: image_src_space,
      pixels: { height: 580, width: 1038 },
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/chillguy.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
      id: "Chill Guy",
      greeting:
        "Hi I am Chill Guy, the desert wanderer. I am looking for wisdome and adventure!",
      src: sprite_src_chillguy,
      SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0, y: height - height / CHILLGUY_SCALE_FACTOR },
      pixels: { height: 384, width: 512 },
      orientation: { rows: 3, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
      id: "Chill Guy",
      greeting:
        "Hi I am Chill Guy, the desert wanderer. I am looking for wisdome and adventure!",
      src: sprite_src_chillguy,
      SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 10,
      INIT_POSITION: { x: 0, y: height - height / CHILLGUY_SCALE_FACTOR },
      pixels: { height: 384, width: 512 },
      orientation: { rows: 3, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
    };

    // NPC data for Tux
    const sprite_src_ditto = path + "/images/gamify/ditto.png"; // be sure to include the path
    const sprite_data_ditto = {
        id: 'Ditto',
        name: 'Ditto',
        greeting: "Hi! I'm Ditto! Nice to meet you!",
        hintKey: 90,
        hint: "Planets are Indeed very large aNd you can see some by looKing at the night sky. By the way, my favorite letter is M!",
        src: sprite_src_ditto,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 256},
        INIT_POSITION: { x: (width / 4), y: (height / 4)},
        orientation: {rows: 4, columns: 4 },
        down: {row: 0, start: 0, columns: 4 },
        left: {row: 1, start: 0, columns: 4 },
        right: {row: 2, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      };

    const sprite_src_orange = path + "/images/gamify/Orange_Meteor.png"; // be sure to include the path
    const sprite_data_orange = {
      id: "Orange_Meteor",
      greeting:
        "Zzzz... So sleepy... oh, hi Ditto!",
      src: sprite_src_orange,
      SCALE_FACTOR: 10, // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: { height: 452, width: 494 },
      INIT_POSITION: { x: (width * 3) / 4, y: (height * 3) / 4 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1, spin: 1.5 }, // This is the stationary npc, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
    };

    const sprite_src_pink = path + "/images/gamify/Pink_meteor.png"; // be sure to include the path
    const sprite_data_pink = {
      id: "Pink_Meteor",
      name: 'Pink Meteor',
      hintKey: 77,
      hint: "Hint for something here",
      greeting:
        "Hiiiiii!!!",
      src: sprite_src_pink,
      SCALE_FACTOR: 10, // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: { height: 452, width: 494 },
      INIT_POSITION: { x: width / 2, y: height / 2 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1, spin: 1.5 }, // This is the stationary npc, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
    };

    const sprite_src_purple = path + "/images/gamify/Purple_meteor.png"; // be sure to include the path
    const sprite_data_purple = {
      id: "Purple_Meteor",
      greeting:
        "Hi I am Robot, the Jupyter Notebook mascot.  I am very happy to spend some linux shell time with you!",
      src: sprite_src_purple,
      SCALE_FACTOR: 10, // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: { height: 452, width: 494 },
      INIT_POSITION: { x: (width * 4) / 5, y: (height * 2) / 5 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1, spin: 1.5 }, // This is the stationary npc, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

      // Linux command quiz
    };
    const sprite_src_blue = path + "/images/gamify/blue_meteor.png"; // be sure to include the path
    const sprite_data_blue = {
      id: "Blue_Meteor",
      greeting:
        "Hi I am Robot, the Jupyter Notebook mascot.  I am very happy to spend some linux shell time with you!",
      src: sprite_src_blue,
      SCALE_FACTOR: 10, // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: { height: 452, width: 494 },
      INIT_POSITION: { x: width / 4, y: height / 4 + 450 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1, spin: 1.5 }, // This is the stationary npc, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

      // Linux command quiz
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_space },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_ditto },
      { class: Npc, data: sprite_data_orange },
      { class: Npc, data: sprite_data_pink },
      { class: Npc, data: sprite_data_purple },
      { class: Npc, data: sprite_data_blue },
    ];
  }
}

export default GameLevelSpace;
