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
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        var npc = this;
    
        if (players.length > 0 && npc) {
            players.forEach(player => {
                if (player.position?.x !== undefined && player.position?.y !== undefined) {
                    // Get actual hitbox dimensions
                    const npcHitboxWidth = npc.pixels.width * (npc.hitbox?.widthPercentage || 1);
                    const npcHitboxHeight = npc.pixels.height * (npc.hitbox?.heightPercentage || 1);
    
                    // Adjust hitbox position
                    const npcHitboxX = npc.position.x - npcHitboxWidth / 2;
                    const npcHitboxY = npc.position.y - npcHitboxHeight / 2;
    
                    // Check if player is inside the hitbox
                    const withinX = player.position.x >= npcHitboxX && player.position.x <= npcHitboxX + npcHitboxWidth;
                    const withinY = player.position.y >= npcHitboxY && player.position.y <= npcHitboxY + npcHitboxHeight;
    
                    if (withinX && withinY) {
                        const hintBox = document.getElementById("hint-box");
                        const hintText = document.getElementById("hint-text");
    
                        if (hintBox && hintText) {
                            hintText.innerText = `${this.name || "NPC"}: "${this.hint}"`;
                            hintText.classList.remove("hidden");
                            hintBox.style.display = "block";
    
                            document.getElementById("hint-close").onclick = () => {
                                hintBox.classList.add("hidden");
                                hintBox.style.display = "none";
                            };
                        }
    
                        console.log(`${this.name} interacted with: "${player.name || "Player"}"`);
                    } else {
                        console.warn(`Player is outside ${this.name}'s hitbox.`);
                    }
                }
            });
        }
    }
}
export default Npc;