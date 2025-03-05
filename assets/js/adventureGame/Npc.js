import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";
import Player from "./Player.js";
class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.name = data?.name || "Random NPC";
        this.hint = data?.hint || null; // default hint
        this.hintKey = data?.hintKey || 69; // makes default key "E"
        GameEnv.gameObjects.push(this);
        this.player = GameEnv.player;
        this.bindInteractKeyListeners();
    }
    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }
    /**
     * Bind key event listeners for proximity interaction.
     */
    bindInteractKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    /**
     * Handle keydown events for interaction.
     * @param {Object} event - The keydown event.
     */
    handleKeyDown({ keyCode }) {
        if (keyCode === this.hintKey && this.hint) {// Player 1 interaction          
            this.handleKeyInteract();
        }
    }
    /**
     * Handle keyup events to stop player actions.
     * @param {Object} event - The keyup event.
     */
    handleKeyUp({ keyCode }) {
        if (keyCode === this.hintKey) {
            // Clear any active timeouts when the interaction key is released
                if (this.alertTimeout) {
                    clearTimeout(this.alertTimeout);
                    this.alertTimeout = null;
                }
        }
    }
 
    /**
     * Handle proximity interaction and share a quiz.
     */
    handleKeyInteract() {
        if (hintBox && hintText) {
            hintText.innerText = `${this.name || "NPC"}: "${this.hint}"`;
            hintText.classList.remove("hidden");
            hintBox.style.display = "block";

            document.getElementById("hint-close").onclick = () => {
                hintBox.classList.add("hidden");
                hintBox.style.display = "none";
            };
        }
        // var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        // var npc = this;
        // var names = [];
    
        // if (players.length > 0 && npc) {
        //     players.forEach(player => {
        //         if (player.position.x !== undefined && player.position.y !== undefined) {
        //             var distance = Math.sqrt(
        //                 Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
        //             );
    
        //             console.log(`Checking distance to ${this.name}: ${distance}`);
    
        //             if (distance <= 100) {
        //                 names.push(player.name || "Player");
    
        //                 const hintBox = document.getElementById("hint-box");
        //                 const hintText = document.getElementById("hint-text");

    
        //                 console.log(`${this.name} interacted with: "${player.name || "Player"}"`);
        //             } else {
        //                 console.warn(` Player too far from ${this.name} (${distance}px away)`);
        //             }
        //         }
        //     });
        // }
    }

}
export default Npc;