const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
 
 
const token = "Njc5MDM2MTE1MzMxNTgwMDU0.XkrhZQ.qf57JNHADGEN7_CTaXm0pEsZ8ts";
 
const PREFIX = '!';
 
bot.on('ready', () => {
    console.log('Bot jest aktywny!');
    bot.user.setActivity('margonem.pl')
})

bot.on('message', msg=>{
    if(msg.content === "!hej"){
        msg.reply('Witamy!');
    }
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "👋powitalny");
    if(!channel) return;
    
    channel.send(`Cześć ${member}, witamy na San Andreas Role-Play! Zapraszamy do rejestracji na naszym forum sa-rp.pl! `)

    var role = member.guild.roles.find('name', "Gracz");

    member.addRole(role)
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'clear':
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Nie masz uprawnień do używania tej komendy!")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Podaj liczbę wiadomości, w przedziale 1-100, które chcesz usunąć!")
        if (isNaN(count)) return message.channel.send("Podaj poprwaną liczbę!")
        if (count < 1 || count > 100) return message.channel.send("Możesz usunąć maksymalnie 100 wiadmości!")
        message.channel.bulkDelete(count + 1, true)
    }
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            let member = message.mentions.members.first()
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Nie masz uprawnień do używania tej komendy!")
            if(!person) return  message.reply("Nie mogę znaleźć użytkownika!")
 
            let mainrole = message.guild.roles.find(role => role.name === "Gracz");
            let role = message.guild.roles.find(role => role.name === "Zmutowany");
           
 
            if(!role) return message.reply("Nie mogę znaleźć roli do mutowania!")
 
 
            let time = args[2];
            if(!time){
                return message.reply("Nie podałeś czasu!");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            message.channel.send(`${person.user} został zmutowany na ${ms(ms(time))}!`)
 
            setTimeout(function(){
               
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`${person.user} został odmutowany!`)
            }, ms(time));
 
   
        break;
    }
})
 
           
                       
bot.login(token);