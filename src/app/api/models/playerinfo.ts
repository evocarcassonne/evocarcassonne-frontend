export class PlayerInfo {
  playerId: string;
  numberOfFigures: number;
  name: string;
  points: number;

  constructor(
    playerId: string,
    numberoffigures: number,
    name: string,
    points: number
  ) {
    this.playerId = playerId;
    this.name = name;
    this.numberOfFigures = numberoffigures;
    this.points = points;
  }
}
