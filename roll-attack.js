// name: Roll Attack
// type: script

// Needs item id to be set in the code below.
// This can be found by dragging the item from the actor sheet into the macro editor,
// which will insert the correct id.

const casterName = '';

const tokens = canvas.tokens.controlled;
let token = tokens.map((o) => o.actor)[0];
if (!token && !!casterName) {
  token = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
}

token.items.get('').use({
  ev: null,
  token: token,
});
