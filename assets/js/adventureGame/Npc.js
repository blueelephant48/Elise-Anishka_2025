import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";
class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.name = data?.name || "Random NPC";
        this.hint = data?.hint || null; // default hint
        this.hintKey = data?.hintKey || 69; // makes default key "E"
        GameEnv.gameObjects.push(this);
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
            if (!GameEnv.player) {
                console.error("🚨 No player found in GameEnv!");
                return;
            }
    
            const player = GameEnv.player;
    
            // Log positions to debug
            console.log(`📍 Player Position: (${player.x}, ${player.y})`);
            console.log(`📍 NPC Position: (${this.x}, ${this.y})`);
    
            // Calculate distance
            const distance = Math.sqrt(
                Math.pow(this.x - player.velocity.x, 2) + Math.pow(this.y - player.velocity.y, 2)
            );
    
            console.log(`📏 Distance to ${this.name}: ${distance}`);
    
            if (distance > 50) { // ✅ Prevents interaction from far away
                console.warn(`🚫 Player too far from ${this.name} to interact.`);
                return;
            }
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
        if(!GameEnv.player) {
            console.error("No player found in GameEnv!");
            return;
        }

        // Check if the player is in range of the NPC
        const player = GameEnv.player;
        // const distance = Math.sqrt(
        //     Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)
        // );

        // if (distance > 50) { 
        //     console.warn(`Player too far from ${this.name} to interact.`);
        //     return;
        // }

        const hintBox = document.getElementById("hint-box");
        const hintText = document.getElementById("hint-text");

        if (hintBox && hintText) {
            hintText.innerText = `${this.name || "NPC"}: "${this.hint}"`;
            hintText.classList.remove("hidden");
            hintBox.style.display = "block";

            document.getElementById("hint-close").onclick = () => {
                hintBox.classList.add("hidden");
                hintBox.style.display = "none";
            }
        }

        console.log(`${this.name} interacted with: "${this.player}"`);
    }

}
export default Npc;