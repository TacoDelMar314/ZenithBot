module.exports = {
  'help': {
    aliases: ['h'],
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'say': {
    aliases: ['repeat'],
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'tic-tac-toe': {
    aliases: ['tictactoe','ttt'],
    description: 'Tic-tac-toe board. What more can I say?',
    arguements: [
      ['Help','Routes to this page'],
      ['<Number from 1-9>','Places your piece at the correlating square'],
      ['Clear','Clears the board'],
      ['Skip','Skips your turn (Why would you do this?)'],
      ['Display','Displays the board']],
    format: 'tic-tac-toe <arguements>'
  },  
  'jeff': {
    description: 'Pings @Jeff',
    format: 'Jeff <amount>'
  }
}