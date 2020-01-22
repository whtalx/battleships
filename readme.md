# Battleships game

[Play](https://whtalx.github.io/battleships/)

## Description

This is russian type of [Battleships](https://en.wikipedia.org/wiki/Battleship_%28game%29) game.

Map sized 10x10.

There are four types of ships:

| Name          | Quantity |
|---------------|----------|
| Four decker   |     1    |
| Three decker  |     2    |
| Two decker    |     3    |
| Single decker |     4    |

## Instructions

This game has two modes: single and pvp.
To play with someone on the internet at the start screen click "person" or press <kbd> P </kbd>.
To play single mode click "computer" or press <kbd> C </kbd>.

#### Playing with person

You and your opponent should both choose "person" at start screen.
After that you'll see connection code and place to input one.
One of players should share code with another one.
You can use any messaging service to transmit this code.
Other player should input received code in corresponding place and click "connect".
After successful connection game will take you to ships placement screen.

#### Playing with computer

After choosing computer as your opponent you'll be asked to place your ships.

### Ships placement

Placing screen is divided vertically in two blocks.
At the left there is your map. You can place your ships there.
At the right there is indicators for all ship types.
Every ship shown like blue squares with indicators at the center.
If indicator color is white, it means that this deck should be placed on map.
If indicator color is cyan, it means that this deck will be placed next.
After you place the deck it indicator will disappear.

Placing ships is possible in two ways: manual or random.

#### Placing ships randomly

If you want to place your ships randomly click "random" or press <kbd> R </kbd>.
You can correct ships placement manually.

#### Placing ships manually

To place ship manually click on any cell on the map.
If placing ship is possible a deck will appear.
You can proceed placing this ship by clicking next cells vertically or horizontally to already placed.
You can delete ship deck by clicking on it again.
Only first and last deck of the ship can be deleted.

After all ships placed you can start the game by clicking "confirm" or press <kbd> C </kbd>.


### Gameplay

## Built With

* [React](https://reactjs.org/) – A JavaScript library for building user interfaces.
* [Redux](https://redux.js.org/) – A Predictable State Container for JS Apps.
* [PeerJS](https://peerjs.com/) –  WebRTC peer-to-peer connection API and connection mediator server.
* [Styled Components](https://styled-components.com/) – Visual primitives for the component age.
