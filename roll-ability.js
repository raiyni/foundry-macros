// name: Roll Ability
// type: script

const casterName = '';

const tokens = canvas.tokens.controlled;
let caster = tokens.map((o) => o.actor)[0];
if (!caster && !!casterName) {
    caster = game.actors.entities.filter((o) => o.name.includes(casterName))[0];
} 


const skillTypes = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

const skillData = [];
skillTypes.forEach((type) => {
  const skillDatum = caster.data.data.abilities[`${type.toLowerCase().substring(0, 3)}`];
  skillDatum.name = type;
  skillData.push(skillDatum);
});

const buttons = {};
skillData.forEach((type) => {
  buttons[type.name] = {
    label: type.name,
    callback: () => {
      rollCheck(type.name, type.mod);
    },
  };
});

new Dialog({
  title: "Roll Ability!",
  content: `<p>Choose an ability</p>`,
  buttons: buttons,
}).render(true);

function rollCheck(name, mod) {
  const roll = new Roll(`1d20 + ${mod}`);
  roll.roll();
  roll.toMessage({
    flavor: `Ability ${name} check`,
    speaker: { alias: caster.data.name },
  });
}