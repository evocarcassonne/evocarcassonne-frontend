import { Component, Injectable, OnInit, Input } from "@angular/core";
import { GamePlayService } from "../api/gameplay.service";
import { PlaceTile } from "../api/models/placeTile";
import { PlaceFigure } from "../api/models/placeFigure";
import { TableInfo } from "../api/models/tableInfo";
import { Tile } from "../api/models/tile";
import { Position } from "../api/models/position";
import { CookieService } from "ngx-cookie-service";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
@Injectable()
export class BoardComponent implements OnInit {
  constructor(
    private gamePlayService: GamePlayService,
    private cookie: CookieService
  ) {}

  gameId: string;
  tileSize: number;
  currentTile: string;
  placePositions: Array<Position>;
  tableInfo: TableInfo;
  tileToPlace: PlaceTile;
  shift: Position;
  sub: Subscription;
  private _isTilePlaced: boolean = false;
  placedFigure = -1;

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
    this.gameId = this.cookie.get("gameId");
    this.currentTile = "backtile";

    const tableList = [];

    this.tableInfo = new TableInfo(null, 1, null, tableList, "Started");
    this.getCurrentState(result => {
      this.tableInfo = result;
    });

    this.tileToPlace = new PlaceTile("", "", "", 0, 0, 0);
    this.placePositions = this.getPlacePositions();
    this.shift = new Position(0, 0);
    this.mouseOver = false;
    const source = interval(2000);
    this.sub = source.subscribe(() => {
      this.getCurrentState((result: TableInfo) => {
        this.tableInfo = result;
      });
    });
  }

  /** Methods to handle requests to server */
  getNewTile() {
    this.getCurrentState(result => {
      this.gamePlayService.getNewTile(
        this.gameId,
        this.cookie.get("playerId"),
        tile => {
          this.currentTile = tile;
          this.tileToPlace.tileProps = tile;
        }
      );
      this._isTilePlaced = false;
    });
  }

  /** Places a tile to the given position. Figure placing also required. */
  placeTile(x: number, y: number) {
    this.tileToPlace.gameId = this.gameId;
    this.tileToPlace.playerId = this.cookie.get("playerId");
    this.tileToPlace.tileProps = this.currentTile;
    this.tileToPlace.coordinateX = x;
    this.tileToPlace.coordinateY = y;
    this.gamePlayService.placeTile(this.tileToPlace, response => {
      if (response) {
        let justPlacedTile = new Tile(
          this.tileToPlace.tileProps,
          {
            x: this.tileToPlace.coordinateX,
            y: this.tileToPlace.coordinateY
          },
          this.tileToPlace.RotateAngle,
          null
        );
        this.tableInfo.tableInfo.push(justPlacedTile);
        this.checkCanPlaceFigure(justPlacedTile);
        this.placePositions = new Array<Position>();
        this.placePositions = this.getPlacePositions();
        this.tileToPlace.RotateAngle = 0;
        this.tileToPlace.coordinateX = 0;
        this.tileToPlace.coordinateY = 0;
        this.currentTile = "backtile";

        this._isTilePlaced = true;
      }
    });
  }

  placeFigure(side: number) {
    const figureToPlace = new PlaceFigure(
      this.gameId,
      this.cookie.get("playerId"),
      side
    );
    this.gamePlayService.placeFigure(figureToPlace, response => {
      if (response) {
        this.tableInfo.tableInfo[this.tableInfo.tableInfo.length - 1].figure = {
          player: this.cookie.get("playerId"),
          side: this.placedFigure
        };
        this.placedFigure = side;
      } else {
        this.placedFigure = -1;
      }
    });
  }

  endTurn() {
    this.gamePlayService.endTurn(
      this.gameId,
      this.cookie.get("playerId"),
      (result: TableInfo) => {
        this.tableInfo = result;
        this.placePositions = new Array<Position>();
        this.placePositions = this.getPlacePositions();
        this.placedFigure = -1;
        this._isTilePlaced = false;
      }
    );
  }

  getCurrentState(callback) {
    this.gamePlayService.getCurrentState(this.gameId, (result: TableInfo) => {
      this.tableInfo.currentPlayer = result.currentPlayer;
      this.tableInfo.currentRound = result.currentRound;
      this.tableInfo.tableInfo = result.tableInfo;
      this.tableInfo.playerInfo = result.playerInfo;
      this.placePositions = this.getPlacePositions();
      callback(result);
    });
  }

  /** ------------------------------------------------------------------------- */
  rotate(angle: number) {
    this.tileToPlace.RotateAngle += angle;
  }

  isFigureNull(figure: any) {
    if (figure == null || figure == "null") {
      return false;
    }
    return true;
  }

  getShiftXForFigure(figure: { player: string, side: number }): number {
    if (figure == null) {
      return 0;
    }
    switch (figure.side) {
      case 0:
        return 30;
      case 1:
        return 60;
      case 2:
        return 30;
      case 3:
        return 0;
      case 4:
        return 30;
      default:
        return 0;
    }
  }

  getShiftYForFigure(figure: { player: string, side: number }): number {
    if (figure == null) {
      return 0;
    }
    switch (figure.side) {
      case 0:
        return 0;
      case 1:
        return 30;
      case 2:
        return 60;
      case 3:
        return 30;
      case 4:
        return 30;
      default:
        return 0;
    }
  }

  checkCanPlaceFigure(t: Tile) {
    let last = this.tableInfo.tableInfo[this.tableInfo.tableInfo.length - 1];
    if (
      this.isTilePlaced() &&
      t.position.x === last.position.x &&
      t.position.y === last.position.y &&
      this.canGetNewTile() == false
    ) {
      return "visible";
    } else {
      return "hidden";
    }
  }

  canGetNewTile(): boolean {
    try {
      if (this.cookie.get("playerId") != this.tableInfo.currentPlayer.playerId) {
        return false;
      }
    } catch (error) {
      /*
      this exception handling is needed
      because the tableInfo.currentPlayer.playerId is null
      if this method is called before the first getCurrentState call
      */
      return false;
    }

    return !this.hasTile() && !this.isTilePlaced();
  }

  hasTile(): boolean {
    if (this.currentTile == "backtile") {
      return false;
    }
    else {
      return true;
    }
  }

  isTilePlaced(): boolean {
    if (this.hasTile()) {
      return false;
    }

    return this._isTilePlaced;
  }

  canEndTurn(): boolean {
    return !this.hasTile() && this.isTilePlaced();
  }

  isButtonActive(n: number) {
    if (this.placedFigure === -1) {
      return true;
    } else {
      return this.placedFigure === n;
    }
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

  isChurchVisible(tileName: string): string {
    var specialities = tileName.substring(6);

    for (let i = 0; i < specialities.length; i++) {
      const character = specialities.charAt(i);
      if (character == "2") {
        return "inherit";
      }
    }

    return "hidden";
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
