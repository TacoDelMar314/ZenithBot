  const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');

var args = []; //Array used to keep the arguements in a command
var command = "help"; //Used in the switch case to determine which command is being called by the user.

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'idle',
    activity: {
      name: `build-a-bot`,
      type: 'PLAYING'
    }
  }
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}.`);
  }
);

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) { //Checks for '!'
    args = message.content.toLowerCase().slice(config.prefix.length).split(' ');
    command = args.shift().toLowerCase();
  }
  else if (message.content.startsWith(config.savefix)) { //Checks for '+'
    args = message.content.toLowerCase().slice(config.savefix.length).split(' ');
  }
  else if (message.content.startsWith(config.deletefix)) { //Checks for '-'
    args = message.content.toLowerCase().slice(config.prefix.length).split(' ');
    command = args.shift().toLowerCase();
    message.delete();
  }
  else return;

  switch (command) {
    case 'ping':
      let msg = await message.reply('Pinging...');
      await msg.edit(`Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
      break;

    case 'say':
    case 'repeat':
      if (args.length > 0)
        message.channel.send(args.join(' '));
      else
        message.reply('You did not send a message to repeat, cancelling command.')
      break

    /* Unless you know what you're doing, don't change this command. */
    default:
    case 'h':
    case 'help':
      let embed = new MessageEmbed()
        .setTitle('HELP MENU')
        .setColor('GREEN')
        .setThumbnail(bot.user.displayAvatarURL());
      if (!args[0])
        embed
          .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
      else {
        if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
          let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
          embed
            .setTitle(`COMMAND - !${command}`)

          if (commands[command].aliases){
            embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            }
          
          if(commands[command].description){
            embed.addField('DESCRIPTION', commands[command].description)
            }

          if(commands[command].arguements){
            embed.addField('ARGUEMENTS', `${commands[command].arguements.map(e => e.join(': ')).join('\n\n')}`);
            }
          if(commands[command].format){  
            embed.addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
            }
            
        } else {
          embed
            .setColor('RED')
            .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
        }
      }
      message.channel.send(embed);
      break;
    case 'ttt':
    case 'tictactoe':
    case 'tic-tac-toe':
      var ttt = require('./tictactoe.js');
      message.channel.send(ttt.command(args[0],args[1]));
      break;

    case 'jeff':
      if (typeof args[0] !== 'undefined') {
        for (var i = 0; i < Number(args[0]); i++) {
          if (Math.floor((Math.random() * 1.99)) == 0) {
            await message.channel.send("<@&801317436481339422>");
          }
          else { await message.channel.send("<@&802190127887024149>"); }
          console.log(`@Jeff (${i + 1}/${args[0]})`);
        }
      }
      break;

    case 'dm':
      message.author.createDM();
      message.author.send("alright, I dm'd you.");
      break;

    case 'hangman':
      var hangman = require('./hangman.js');
      message.channel.send(hangman(args[0],args[1]));
      break;

  }
  console.log(message.content);
}
);

require('./server')();
bot.login(config.token);