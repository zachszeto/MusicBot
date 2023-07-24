const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the music"),
    
        run: async ({client, interaction}) => {
            const queue = client.player.nodes.get(interaction.guildID)
            
            //Error Handling(there is no queue to pause)
            if (!queue) return await interaction.editReply("There are no songs in the queue")
            
            //Pauses music and sends a message
            queue.setPaused(true)
            await interaction.editReply("Music has been paused! '/resume' to resume the music")
    },
}