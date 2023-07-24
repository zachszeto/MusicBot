const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the queue"),
    
        run: async ({client, interaction}) => {
            const queue = client.player.nodes.get(interaction.guildID)
            
            //Error Handling(there is no queue to shuffle)
            if (!queue) return await interaction.editReply("There are no songs in the queue")
            
            //Shuffles queue and sends a message
            queue.shuffle()
            await interaction.editReply('The queue of ${queue.tracks.length} songs have been shuffled!')
    },
}