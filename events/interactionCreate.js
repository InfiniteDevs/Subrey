const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
            client.ecoAddUser = interaction.member.user.id;
        const command = client.slashcommands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: 'An Error Occurred' });

        const args = [];

        /*if(command.VoteOnly){
            let vote = await client.votecmd.hasVoted(interaction.member.user.id)

            if(!vote){
                let embed = new EmbedBuilder()
                    .setColor('#303037')
                    .setDescription('This command is confined only to my voters. Please [vote](VOTE LINK) here to unlock it.')
                return interaction.followUp({ embeds: [embed] })
            }
        }*/

        for (let option of interaction.options.data) {  
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x =>  {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.followUp({ content: e.message });
        }
    }
}