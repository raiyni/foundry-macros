// name: Roll Initiative
// type: script

const casterName = 'Pilbo Puppers';

const tokens = canvas.tokens.controlled;
let caster = tokens.map((o) => o.actor)[0];
if (!caster && !!casterName) {
    caster = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
}


caster.sheet.document.rollInitiative({ createCombatants: true })