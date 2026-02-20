// name: Roll Ability
// type: script

const c = {
  actorNames: [''],
  abilities: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
};

const tokens = canvas.tokens.controlled;
let actors = tokens.map((o) => o.actor);
if (!actors.length && c.actorNames.length) actors = game.actors.entities.filter((o) => c.actorNames.includes(o.name));
if (!actors.length) actors = game.actors.entities.filter((o) => o.isPC && o.testUserPermission(game.user, 'OWNER'));
actors = actors.filter((o) => o.testUserPermission(game.user, 'OWNER'));

if (!actors.length) ui.notifications.warn('No applicable actor(s) found');
else {
  const _roll = async function (type) {
    let madeSound = false;
    for (let a = 0; a < actors.length; a++) {
      let o = actors[a];
      await o.rollAbilityCheck(type, { event: new MouseEvent({}), skipDialog: true, noSound: madeSound });
      madeSound = true;
    }
  };

  const buttons = c.abilities.reduce((cur, a) => {
    let abilityName = a.charAt(0).toUpperCase() + a.slice(1);
    cur[a] = {
      label: abilityName,
      callback: () => _roll(a),
    };
    return cur;
  }, {});

  const msg = `Choose an ability to roll for the following actor(s): <strong>${actors.map((o) => o.name).join('</strong>, <strong>')}</strong>`;

  const dialog = new Dialog({
    title: 'Roll Ability',
    content: `<p>${msg}</p>`,
    buttons: buttons,
    options: {
      width: 'auto',
      jQuery: true,
    },
    render: (html) => {
      // Add CSS to make buttons wrap
      const style = document.createElement('style');
      style.textContent = `
        .dialog .dialog-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
        }
        .dialog .dialog-buttons button {
          margin: 2px;
        }
      `;
      html[0].appendChild(style);
    },
  }).render(true);
}
