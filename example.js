const inquirer = require('inquirer');

// Prompt 1
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers1 => {
    console.log('Hello, ' + answers1.name + '!');

    // Prompt 2
    return inquirer.prompt([
      {
        type: 'list',
        name: 'color',
        message: 'What is your favorite color?',
        choices: ['Red', 'Blue', 'Green']
      }
    ]);
  })
  .then(answers2 => {
    console.log('Your favorite color is ' + answers2.color + '!');

    // Prompt 3
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to continue?'
      }
    ]);
  })
  .then(answers3 => {
    if (answers3.confirm) {
      console.log('Great, let\'s continue!');
    } else {
      console.log('Alright, goodbye!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
