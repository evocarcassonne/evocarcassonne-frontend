export class PlaceTile {
  gameId: string;
  playerId: string;
  tileProps: string;
  RotateAngle: number;
  coordinateX: number;
  coordinateY: number;
  placeFigure: boolean;
  side: number;

  constructor(
    gameId: string,
    playerId: string,
    tileProps: string,
    rotateAngle: number,
    x: number,
    y: number,
    place: boolean,
    side: number
  ) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.tileProps = tileProps;
    this.RotateAngle = rotateAngle;
    this.coordinateX = x;
    this.coordinateY = y;
    this.placeFigure = place;
    this.side = side;
  }
}
