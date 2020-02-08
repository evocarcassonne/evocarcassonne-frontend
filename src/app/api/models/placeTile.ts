export class PlaceTile {
  gameId: string;
  playerId: string;
  tileProps: string;
  RotateAngle: number;
  coordinateX: number;
  coordinateY: number;

  constructor(
    gameId: string,
    playerId: string,
    tileProps: string,
    rotateAngle: number,
    x: number,
    y: number
  ) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.tileProps = tileProps;
    this.RotateAngle = rotateAngle;
    this.coordinateX = x;
    this.coordinateY = y;
  }
}
