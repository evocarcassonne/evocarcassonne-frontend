import { Component, Injectable, OnInit, Input } from "@angular/core";
import { GamePlayService } from "../api/gameplay.service";
import { PlaceTile } from "../api/models/placeTile";
import { TableInfo } from "../api/models/tableInfo";
import { Tile } from "../api/models/tile";
import { PlayerInfo } from "../api/models/playerinfo";
import { Position } from "../api/models/position";

@Component({
  selector: "board",
  templateUrl: "./board.component.html"
})
export class BoardComponent implements OnInit {
  constructor(private gamePlayService: GamePlayService) {}

  gameId: string;
  tileSize: number;
  tile: string;
  placePositions: Array<Position>;
  tableInfo: TableInfo;
  tileToPlace: PlaceTile;
  shift: Position;

  /** Mouse connected attributes */
  initialPos: {
    position: Position;
    offset: Position;
    active: boolean;
  };
  mouseOver: boolean;
  /** ------------------------- */
  ngOnInit(): void {
    this.initialPos = {
      position: new Position(0, 0),
      offset: new Position(0, 0),
      active: false
    };
    this.tileSize = 50;
    this.gameId = "ez a game id";
    const players = [];
    players.push({
      playerId: "",
      numberOfFigures: 0,
      name: "Krisz",
      points: 7
    });
    this.tile = "S321014";
    const tableInfo = {
      tile: "S321014",
      position: { x: 5, y: 5 },
      rotation: 0,
      figure: null
    };
    const tableList = [];
    tableList.push(tableInfo);
    const table = new TableInfo(
      players,
      1,
      new PlayerInfo("", 7, "a", 0),
      tableList,
      "WaitingForPlayers"
    );
    this.tableInfo = table;
    this.tileToPlace = new PlaceTile("", "", "", 0, 0, 0, false, 0);
    this.placePositions = this.getPlacePositions();
    this.shift = new Position(0, 0);
    this.mouseOver = false;
  }

  /** Methods to handle requests to server */
  getNewTile() {
    this.gamePlayService.getNewTile(this.gameId, result => {
      this.tile = result;
      this.tileToPlace.tileProps = result;
    });
  }

  /** Places a tile to the given position. Figure placing also required. */
  placeTile(x: number, y: number) {
    this.tileToPlace.gameId = this.gameId;
    this.tileToPlace.playerId = this.tableInfo.currentPlayer.playerId;
    this.tileToPlace.tileProps = this.tile;
    this.tileToPlace.placeFigure = false;
    this.tileToPlace.side = 0;
    this.tileToPlace.coordinateX = x;
    this.tileToPlace.coordinateY = y;
    this.gamePlayService.placeTile(this.tileToPlace, response => {
      if (response) {
        this.tableInfo.tableInfo.push(
          new Tile(
            this.tileToPlace.tileProps,
            {
              x: this.tileToPlace.coordinateX,
              y: this.tileToPlace.coordinateY
            },
            this.tileToPlace.RotateAngle,
            {
              player: this.tileToPlace.playerId,
              side: this.tileToPlace.side
            }
          )
        );
        this.placePositions = new Array<Position>();
        this.placePositions = this.getPlacePositions();
        this.tileToPlace.RotateAngle = 0;
        this.tileToPlace.coordinateX = 0;
        this.tileToPlace.coordinateY = 0;
        this.tileToPlace.placeFigure = false;
        this.tileToPlace.side = 0;
        this.tile = "backtile";
      }
    });
  }

  endTurn() {
    this.gamePlayService.endTurn(
      this.gameId,
      this.tableInfo.currentPlayer.playerId,
      (result: TableInfo) => {
        this.tableInfo = result;
        this.placePositions = new Array<Position>();
        this.placePositions = this.getPlacePositions();
      }
    );
  }
  /** ------------------------------------------------------------------------- */
  rotate(angle: number) {
    this.tileToPlace.RotateAngle += angle;
  }

  /** Searches the places where tiles can be placed */
  getPlacePositions(): Array<Position> {
    const possiblePositions = new Array<Position>();
    this.tableInfo.tableInfo.forEach(tile => {
      if (this.canPlaceTile({ x: tile.position.x + 1, y: tile.position.y })) {
        possiblePositions.push(
          new Position(tile.position.x + 1, tile.position.y)
        );
      }

      if (this.canPlaceTile({ x: tile.position.x - 1, y: tile.position.y })) {
        possiblePositions.push(
          new Position(tile.position.x - 1, tile.position.y)
        );
      }

      if (this.canPlaceTile({ x: tile.position.x, y: tile.position.y + 1 })) {
        possiblePositions.push(
          new Position(tile.position.x, tile.position.y + 1)
        );
      }
      if (this.canPlaceTile({ x: tile.position.x, y: tile.position.y - 1 })) {
        possiblePositions.push(
          new Position(tile.position.x, tile.position.y - 1)
        );
      }
    });

    return possiblePositions;
  }
  /** ------------------------------------------------------------------------- */

  /** Check if a tile is placed where tile already exists */
  canPlaceTile(position: { x: number; y: number }) {
    let found = false;
    this.tableInfo.tableInfo.forEach(tile => {
      if (tile.position.x === position.x && tile.position.y === position.y) {
        found = true;
      }
    });
    return !found;
  }

  /** Finds the neighboring tiles */
  getNeighbourTiles(tile: PlaceTile): Array<Tile> {
    const neighbors = new Array<Tile>();
    let neighbor = null;

    if (!this.canPlaceTile({ x: tile.coordinateX + 1, y: tile.coordinateY })) {
      this.getTileAtPosition(
        new Position(tile.coordinateX + 1, tile.coordinateY),
        res => {
          neighbor = res;
        }
      );
      if (neighbor !== null) {
        neighbors.push(neighbor);
      }
      neighbor = null;
    }
    if (!this.canPlaceTile({ x: tile.coordinateX - 1, y: tile.coordinateY })) {
      this.getTileAtPosition(
        new Position(tile.coordinateX - 1, tile.coordinateY),
        res => {
          neighbor = res;
        }
      );
      if (neighbor !== null) {
        neighbors.push(neighbor);
      }
      neighbor = null;
    }
    if (!this.canPlaceTile({ x: tile.coordinateX, y: tile.coordinateY + 1 })) {
      this.getTileAtPosition(
        new Position(tile.coordinateX, tile.coordinateY + 1),
        result => {
          neighbor = result;
        }
      );
      if (neighbor !== null) {
        neighbors.push(neighbor);
      }
      neighbor = null;
    }
    if (!this.canPlaceTile({ x: tile.coordinateX, y: tile.coordinateY - 1 })) {
      this.getTileAtPosition(
        new Position(tile.coordinateX, tile.coordinateY - 1),
        res => {
          neighbor = res;
        }
      );
      if (neighbor !== null) {
        neighbors.push(neighbor);
      }
      neighbor = null;
    }
    return neighbors;
  }

  /* Replace callback?? */
  /** Returns the tile found on the given position  */
  getTileAtPosition(position: Position, callback) {
    this.tableInfo.tableInfo.forEach(t => {
      if (t.position.x === position.x && t.position.y === position.y) {
        callback(t);
      }
    });
  }

  /** Methods below handle mouse actions within the board area */
  onMoveStart(event) {
    if (!this.initialPos.active) {
      this.initialPos.position.x = event.clientX - this.initialPos.offset.x;
      this.initialPos.position.y = event.clientY - this.initialPos.offset.y;
      this.initialPos.active = true;
    }
  }

  onMoveEnd(event) {
    if (this.initialPos.active) {
      event.preventDefault();
    }
    this.initialPos.active = false;
  }

  onMoving(event) {
    if (this.initialPos.active) {
      event.preventDefault();
      this.shift.x = event.clientX - this.initialPos.position.x;
      this.shift.y = event.clientY - this.initialPos.position.y;
      this.initialPos.offset = this.shift;
    }
  }

  mouseEnter() {
    this.mouseOver = true;
  }

  mouseLeave() {
    this.mouseOver = false;
  }

  mouseWheelUp(event) {
    if (this.mouseOver) {
      event.preventDefault();
      if (this.tileSize < 120) {
        this.tileSize += 10;
      }
    }
  }

  mouseWheelDown(event) {
    if (this.mouseOver) {
      event.preventDefault();
      if (this.tileSize > 40) {
        this.tileSize -= 10;
      }
    }
  }
  /** ------------------------------------------------------------------------- */
}
