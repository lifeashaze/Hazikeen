const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colors = require("./colors.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Command not found")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require (`./commands/${f}`);
        console.log(`${f} is now loaded`)
        bot.commands.set(props.help.name, props);
    });
});



bot.on("ready", async () => {
    console.log(`${bot.user.username} is now alive`)
    bot.user.setActivity("I am back", {type: "STREAMING"})    
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

  


})

bot.login(botconfig.token);