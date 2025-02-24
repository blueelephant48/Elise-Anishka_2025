import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";
class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.name = data?.name || "Random NPC";
        this.hint = data?.hint || "Hello, adventurer!"; // default hint
        this.hintKey = data?.hintKey || 69; // makes default key "E"
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
        if (keyCode === this.hintKey) {// Player 1 interaction
                this.handleKeyInteract();
        }
    }
    /**
     * Handle keyup events to stop player actions.
     * @param {Object} event - The keyup event.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case this.keypress.hint:
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
    }

}
export default Npc;