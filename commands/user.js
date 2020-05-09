const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first() || message.author
    if(!user) return console.log("error")

    let userinfo = {}
    userinfo.avatar = user.displayAvatarURL();
    userinfo.name = user.username;
    userinfo.discrim = `${user.discriminator}`;
    userinfo.id = user.id;
    userinfo.status = user.presence.status;
    userinfo.registered = moment.utc(message.author.createdAt).format("dddd, MMMM Do, YYYY");
    userinfo.joined = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY");
    
    let uEmbed = new Discord.MessageEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .addField("Username", userinfo.name, true)
    .addField("Discriminator", userinfo.discrim, true)
    .addField("ID", userinfo.id)
    .addField("Joined Discord on", userinfo.registered)
    .addField(`Joined ${message.guild.name} on`, userinfo.joined)
    .addField("Current Nickname", message.user.displayName)
    .setFooter("UserInfo")
    .setTimestamp()


    message.channel.send(uEmbed)


}


module.exports.help = {
    name : "user"
}
