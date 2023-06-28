module.exports = {
  name: "ping",
  description: "Muestra la latencia del bot",
  async execute(interaction) {
    const latency = Date.now() - interaction.createdTimestamp;
    try {
      await interaction.reply(`🏓 Pong! La latencia es de ${latency}ms.`);
    } catch (error) {
      console.error("Error al responder a la interacción:", error);
    }
  },
};
