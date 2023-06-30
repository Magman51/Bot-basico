module.exports = {
    data: {
      name: 'ping',
      description: 'Muestra el ping del bot',
    },
    async execute(interaction) {
      try {
        const timestamp = Date.now();
        await interaction.reply({ content: 'Pinging...', ephemeral: true });
        const latency = Date.now() - timestamp;
        await interaction.editReply({ content: `Pong! Latencia: ${latency}ms`, ephemeral: true });
      } catch (error) {
        console.error('Error al responder la interacción:', error);
      }
    },
  };
  
