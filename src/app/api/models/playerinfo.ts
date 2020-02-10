export class PlayerInfo {
  playerId: string;
  numberOfFigures: number;
  name: string;
  points: number;
  color: string;

  constructor(
    playerId: string,
    numberoffigures: number,
    name: string,
    points: number,
    color: string
  ) {
    this.playerId = playerId;
    this.name = name;
    this.numberOfFigures = numberoffigures;
    this.points = points;
    this.color = color;
  }
}
