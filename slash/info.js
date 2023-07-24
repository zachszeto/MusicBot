const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Displays info about the currently playing song"),
    
        run: async ({client, interaction}) => {
            const queue = client.player.nodes.get(interaction.guildID)
            
            //Error Handling(there is no queue to get info from)
            if (!queue) return await interaction.editReply("There are no songs in the queue")
            
            //Gets info and creates a progress bar
            let bar = queue.createProgressBar({
                queue: false,
                length: 19
            })

            const song = queue.current

            await interaction.editReply({
                embeds: [new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription('Currently Playing [${song.title}](${song.url})/n/n' + bar)
            ],
            })
    },
}