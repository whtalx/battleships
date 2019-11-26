import makeSea from './makeSea';
import makeSquadron from './makeSquadron';
import sendVictory from '../actions/sendVictory';
import receiveFire from '../actions/receiveFire';
import randomPlacing from '../actions/randomPlacing';
import receiveFeedback from '../actions/receiveFeedback';

/**
 * machine states:
 * 0 -- shoot random cell (except those that already shoot)
 * 1 -- shoot cell next to last shoot in random direction (except those that already shoot)
 * 2 -- shoot cell next to last shoot in same direction
 * 3 -- shoot cell in opposite side of ship for last hit (in same direction)
 * 
 * state changing:
 * |------------->|___0___|
 * |                  |
 * |<---------n---/__hit?__/
 * |                  | y
 * |              |___1___|<------------|
 * |                  |                 |
 * |              /__hit?__/            |
 * |             y/       \n            |
 * |             /      /__sank?__/--n->|
 * |            /            |
 * |      |___2___|<-----|   | y
 * |          |          |   |
 * |      /__hit?__/--y->|   |
 * |          |n         |   |
 * |<-y--/__sank?__/     |   |
 * |          |n         |   |
 * |      |___3___|      |   |
 * |          |          |   |
 * |     /__hit?__/---y->|   |
 * |          | n            |
 * |<---------|<-------------|
 *
 */

const newSea = () => ({
  ally: makeSea(`ally`),
  enemy: makeSea(`enemy`),
  squadron: makeSquadron(),
  shipsToPlace: {
    fourDecker: 1,
    threeDecker: 2,
    twoDecker: 3,
    singleDecker: 4,
    total: 10,
  },
  currentType: 0,
  allyShipsLeft: 10,
  enemyShipsLeft: 10,
  feedback: null,
});

export default function AI(props) {
  this.init = (newGame = true) => {
    this.state = 0;
    this.shootLog = [];
    this.lastShoot = null;
    this.directions = [`up`, `down`, `left`, `right`];
    this.directionsStack = null;
    this.sea = randomPlacing(newSea());
    this.fireDelay = 250; // ::ms
    newGame && props.setIsConnected(true);
  };

  this.sendMessage = props.receive;

  this.findLogIndex = (item) =>
    this.shootLog.findIndex( ({ cell }) => cell.toString() === item.toString());

  this.randomDirectionsStack = () =>
    [...Array(4)].reduce(array => {
      let item = Math.floor(Math.random() * 4);
      while (array.indexOf(item) !== -1) {
        item = Math.floor(Math.random() * 4);
      }
      return [...array, item];
    }, []).map(item => this.directions[item]);

  this.reverseDirection = () =>
    (this.directions.indexOf(this.directionsStack[0]) + 1) % 2 === 0
      ? this.directions[this.directions.indexOf(this.directionsStack[0]) - 1]
      : this.directions[this.directions.indexOf(this.directionsStack[0]) + 1];

  this.findHitIndex = () =>
    this.shootLog.reduceRight((position, item, index) =>
        item.feedback === `hit`
          ? position === -1 || position - index === 1
            ? index
            : position
          : position
      , -1);

  this.alreadyShoot = (coordinates) =>
    !this.sea.enemy[coordinates[1]] ||
    !this.sea.enemy[coordinates[1]][coordinates[0]] ||
    this.sea.enemy[coordinates[1]][coordinates[0]].ship ||
    this.sea.enemy[coordinates[1]][coordinates[0]].miss

  this.addShift = ([x, y], direction, shift) => {
    switch (direction) {
      case `up`:
        return [x, y - shift];

      case `down`:
        return [x, y + shift];

      case `left`:
        return [x - shift, y];

      case `right`:
        return [x + shift, y];

      default:
        return;
    }
  };

  this.getRandomCoordinates = () => {
    const randomStock = [];
    const newCoordinates = () => [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const hasCoordinates = (array, coordinates) =>
      array.findIndex(i => i.toString() === coordinates.toString()) >= 0;

    while (true) {
      const coordinates = newCoordinates();
      if (hasCoordinates(randomStock, coordinates)) {
        continue;
      }

      if (this.alreadyShoot(coordinates)) {
        randomStock.push(coordinates);
        continue;
      }
      return coordinates;
    }
  };

  this.shoot = () => {
    switch (this.state) {
      case 0: { // shoot random cell (except those that already shoot)
        this.lastShoot = this.getRandomCoordinates();
        break;
      }

      case 1: { // shoot cell next to last shoot in random direction (except those that already shoot)
        const hit = this.findHitIndex();
        if (this.directionsStack === null) {
          this.directionsStack = this.randomDirectionsStack();
        } else {
          this.directionsStack.unshift();
        }

        if (this.directionsStack.length === 0) {
          this.directionsStack = null;
          this.changeState(`sank`);
          return this.shoot();
        }

        const nextDirection = this.directionsStack[0];
        const coordinates = this.addShift(this.shootLog[hit].cell, nextDirection, 1);

        if (
          this.alreadyShoot(coordinates) ||
          coordinates[0] < 0 ||
          coordinates[0] > 9 ||
          coordinates[1] < 0 ||
          coordinates[1] > 9
        ) {
          this.directionsStack.shift();
          // this.lastDirection = nextDirection;
          // this.lastShoot = this.addShift(this.shootLog[hit].cell, this.lastDirection, 1);
          return this.shoot();
        }

        this.lastShoot = coordinates;
        // this.lastDirection = nextDirection;
        break;
      }

      case 2: { // shoot cell next to last shoot in same direction
        const nextDirection = this.directionsStack[0];
        const coordinates = this.addShift(this.lastShoot, nextDirection, 1);

        if (
          this.alreadyShoot(coordinates) ||
          coordinates[0] < 0 ||
          coordinates[0] > 9 ||
          coordinates[1] < 0 ||
          coordinates[1] > 9
        ) {
          this.changeState(`miss`);
          return this.shoot();
        }

        this.lastShoot = coordinates;
        break;
      }

      case 3: { // shoot cell in opposite side of ship to last hit (in same direction)
        const nextDirection = this.reverseDirection();
        const hit = this.findHitIndex();
        let coordinates = this.addShift(this.shootLog[hit].cell, nextDirection, 1);

        while (this.alreadyShoot(coordinates)) {
          coordinates = this.addShift(coordinates, nextDirection, 1)
        }

        this.lastShoot = coordinates;
        this.directionsStack = [nextDirection];
        break;
      }

      default:
        return;
    }

    this.shootLog.push({ cell: this.lastShoot });
    setTimeout(() => {
      this.sendMessage({ type: `fire`, data: this.lastShoot })
    }, this.fireDelay);
  };

  this.changeState = (feedback) => {
    switch (this.state) {
      case 0: {
        feedback === `hit` && (this.state = 1);
        break;
      }

      case 1: {
        this.state = feedback === `hit`
          ? 2
          : feedback === `sank`
            ? 0
            : 1;
        break;
      }

      case 2: {
        this.state = feedback === `hit`
          ? 2
          : feedback === `sank`
            ? 0
            : 3;
        break;
      }

      case 3: {
        this.state = feedback === `hit`
          ? 2
          : 0;
        break;
      }

      default: break;
    }
  };

  this.send = (data) => {
    switch (data.type) {
      case `fire`: {
        this.sea = receiveFire(this.sea, { payload: data });
        this.sendMessage(this.sea.feedback);
        this.sea.feedback.feedback === `miss` && this.shoot();
        this.sea.feedback = null;
        break;
      }

      case `feedback`: {
        this.sea = receiveFeedback(this.sea, { payload: data });
        const logIndex = this.findLogIndex(this.lastShoot);
        this.shootLog[logIndex].feedback = data.feedback;
        this.changeState(data.feedback);

        if (data.feedback === `sank`) {
          this.directionsStack = null;
        }

        data.feedback !== `miss` && this.shoot();
        break;
      }

      case `defeat`: {
        this.sea = sendVictory(this.sea);
        this.sendMessage(this.sea.feedback);
        this.sendMessage({ type: `repeat` });
        this.init(false);
        break;
      }

      case `ready`: {
        this.sendMessage({ type: `ready` });
        break;
      }

      case `victory`: {
        this.sendMessage({ type: `repeat` });
        this.init(false);
        break;
      }

      default:
        break;
    }
  };
}
