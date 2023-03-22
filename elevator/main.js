const {Elevator} = require('./elevator');
const {Request} = require('./request');
const fs = require('fs');
const readline = require('readline');
const os = require('os');

const output = txt => {
  fs.appendFileSync('output.txt', txt + os.EOL);
}
// Create an interface for reading from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const elevator = new Elevator(5);
elevator.move();

const question = () => {


  rl.question('What floor are you on and which direction are you going, OR which floor do you want to request?', (answer) => {
    if(answer.at(-1).toLowerCase() === 'u') {
      createRequest(answer.slice(0,-1), 1);
    } else if (answer.at(-1).toLowerCase() === 'd') {
      createRequest(answer.slice(0,-1), -1);
    } else if(answer === 'quit') {
      console.log('quitting...');
      rl.close();
      process.exit();
    } else {
      if(elevator.passengerQueue.length) {
        elevator.selectFloor(answer);

      } else {
        
      }
    }
    question();
  })
}


const createRequest = (floor, direction) => {
  const req = new Request(floor, direction, 0);
  elevator.request(req);
}


fs.writeFileSync('output.txt', '');
question();



