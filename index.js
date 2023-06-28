const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const colors = require("colors")
const asciiart = (`

██╗░░██╗██╗░░░██╗██████╗░███████╗████████╗██╗░░██╗██████╗░███████╗░█████╗░██████╗░░██████╗
██║░░██║╚██╗░██╔╝██╔══██╗██╔════╝╚══██╔══╝██║░░██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝
███████║░╚████╔╝░██████╔╝█████╗░░░░░██║░░░███████║██████╔╝█████╗░░███████║██║░░██║╚█████╗░
██╔══██║░░╚██╔╝░░██╔═══╝░██╔══╝░░░░░██║░░░██╔══██║██╔══██╗██╔══╝░░██╔══██║██║░░██║░╚═══██╗
██║░░██║░░░██║░░░██║░░░░░███████╗░░░██║░░░██║░░██║██║░░██║███████╗██║░░██║██████╔╝██████╔╝
╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░╚═════╝░
Of Hypethreads
server: https://discord.gg/hypethreads`.cyan)

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(asciiart)
  console.log(`Conectado como ${client.user.tag}`.blue);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "Hubo un error al ejecutar ese comando.", ephemeral: true });
  }
});

client.login(token);