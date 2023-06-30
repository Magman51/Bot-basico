const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config.json");


const rest = new REST({ version: "9" }).setToken(token);


const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));


const commands = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data) {
    commands.push(command.data);
  } else {
    console.error(`El archivo de comando ${file} no contiene una propiedad "data".`);
  }
}


(async () => {
  try {
    console.log("Registrando los comandos a nivel global...");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("¡Los comandos han sido registrados correctamente a nivel global!");
  } catch (error) {
    console.error("Ocurrió un error al registrar los comandos a nivel global:", error);
  }
})();
