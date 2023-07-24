const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the music"),
    
        run: async ({client, interaction}) => {
            const queue = client.player.nodes.get(interaction.guildID)
            
            //Error Handling(there is no queue to resume)
            if (!queue) return await interaction.editReply("There are no songs in the queue")
            
            //Resumes music and sends a message
            queue.setPaused(false)
            await interaction.editReply("Music has been resumed! '/pause' to pause the music")
    },
}