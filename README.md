## Setup

Hey, Cash! If you see this...     ...well I'm not sure what will happen.

## Configuration

If you can, can you double check that the two exports in "config.js" are '!' and '-' 
respectfully?

## Commands

Alrighty, all commands, from the top:

Ping: Pings the bot, and sends a return

Say: (Alias: Repeat)
     Outputs anything you say afterwards as if the bot is saying it (make sure to 
     use the 'deletefix' to delete the command message)

Help: (This is the default command, anything that isn't an allowed command will 
route to here)
     Creates an embed that describes how to basically use all the intended commands

Tic-Tac-Toe: (Aliases: ttt, tictactoe, tic-tac-toe)
     My tic-tac-toe game built into this bot. The AI isn't perfect, but that's what 
     makes this game tolerable to play. '!ttt help' will give you info on how to 
     play.

Jeff: Pings Jeff as many times as specified (defaults to 1)

Delete: idk this is completely useless in every way. Failed idea that I haven't 
     deleted to be honest. Keeping it for no reason for now

DM: Sends a sample message to your DM. This will be expanded in a future date

## Things to test for now (until I set up Unit Tests lmao)

"-say -ttt help" should make the bot say "-ttt help", then say "-help ttt", then display the tic-tac-toe help screen without any residual messages

The tic-tac-toe game always gives me issues. Make sure it's winnable, resetable, and looks alright.