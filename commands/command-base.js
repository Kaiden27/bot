const { prefix } = require("../config.json");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];
};

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "Nope",
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;
  //check command array
  if (typeof commands == "string") {
    commands = [commands];
  }

  console.log(`Registering Command "${commands[0]}"`);
  //check permission array
  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }
  }
  //listen message
  client.on("message", (message) => {
    const { member, content, guild } = message;

    for (const alias of commands) {
      if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
        //run

        //permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permissions)) {
            message.reply(permissionError);
          }
        }

        //required role
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command`
            );
            return;
          }
        }

        const arguments = content.split(/[ ]+/);

        //remove the command
        arguments.shift();

        //ensure
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorect Syntax! Use ${prefix}${alias} ${expectedArgs}`
          );
          return;
        }

        //handle custom

        callback(message, arguments, arguments.join(" "));

        return;
      }
    }
  });
};
