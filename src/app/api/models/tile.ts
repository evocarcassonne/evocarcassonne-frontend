// tslint:disable: quotemark
import { Position } from "./position";

export class Tile {
  tile: string;
  position: Position;
  rotation: number;
  figure: { player: string; side: number };

  constructor(
    tile: string,
    position: Position,
    rotation: number,
    figure: { player: string; side: number }
  ) {
    this.tile = tile;
    this.position = position;
    this.rotation = rotation;
    this.figure = figure;
  }
}
