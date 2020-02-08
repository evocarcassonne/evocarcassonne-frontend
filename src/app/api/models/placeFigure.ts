export class PlaceFigure {
  gameId: string;
  playerId: string;
  side: number;

  constructor(gameId: string, playerId: string, side: number) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.side = side;
  }
}
