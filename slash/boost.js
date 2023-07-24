const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer }       = require("discord-player")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.boost.command)
    .setDescription(Language.boost.description),
    run: async ({ interaction }) => {
        const player = useMasterPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                queue.filters.ffmpeg.toggle('bassboost')
                await interaction.editReply(Language.boost.notify)
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}