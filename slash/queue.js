const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("displays the current song queue")
        .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),

        run: async ({ client, interaction}) => {
            //Run only if there is a queue or the queue is playing
            const queue = client.player.nodes.get(interaction.guildID)
            if (!queue || !queue.playing){
                return await interaction.editReply("There are no songs in the queue")
            }

            //Two constants that keep track of current page and total pages
            const totalPages = Math.ceil(queue.tracks.length / 10) || 1
            const page = (interaction.option.getNumber("page") || 1) - 1
            
            //Error Handling (If they enter a page number that is too big)
            if (page > totalPages)
                return await interaction.editReply('Invalid Page. There are only a total of ${totalPages} pages of songs')

            const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return '**${page * 10 + i + 1}.** \'[${song.duration}]\' ${song.title} -- <@${song.requestedBy.id}>'
            }).join("/n")

            const currentSong = queue.currentSong
            
            //Shows song information when playing
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('**Currently Playing**\n' + (currentSong ? '\'[${currentSong.duration}]\' ${currentSong.title} -- <@${currentSong.requestedBy.id}>' : "None") + 
                            '/n/n**Queue**/n${queueString}'
                        )
                        .setFooter({
                            test: 'Page ${page + 1} of ${totalPages}'
                        })
                        .setThumnail(currentSong.thumbnail)
                ]
            })
        }
}