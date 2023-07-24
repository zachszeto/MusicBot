const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Stops the bot and clears the queue"),
    
        run: async ({client, interaction}) => {
            const queue = client.player.nodes.get(interaction.guildID)
            
            //Error Handling(there is no queue to end)
            if (!queue) return await interaction.editReply("There are no songs in the queue")
            
            //Ends queue and sends a message
            queue.destroy()
            await interaction.editReply("Bye!")
    },
}