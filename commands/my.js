const { MessageEmbed } = require("discord.js")
const Url = require('../models/Url');


exports.run = async(client, message, args) => {
    const links = await Url.find({ userId: message.author.id })
    if (!links[0]) {
        return message.reply(`You dont have any links! Create one with ${client.config.prefix}<url>`)
    }
    const map = links.map((e, i) => `**${i+1}**. ${e.urlCode}: [long URL](${e.longUrl})`)
    if (map.length > 10) {
        map.splice(10, map.length - 10)
    }

    const embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s 10 most recent short links`)
        .setColor("BLUE")
        .setDescription(map.join('\n'))

    message.channel.send(embed)
}

exports.info = {
    name: `my`,
    aliases: ['links'],
    description: `Shows your short URL's`,
    usage: `my`
}