import { PlayerInfo } from "./playerinfo";
import { Tile } from "./tile";

export class TableInfo {
  playerInfo: Array<PlayerInfo>;
  currentRound: number;
  currentPlayer: PlayerInfo;
  tableInfo: Array<Tile>;
  gameState: string;
  constructor(
    playerInfo: Array<{
      playerId: string;
      numberOfFigures: number;
      name: string;
      points: number;
    }>,
    currentRound: number,
    currentPlayer: {
      playerId: string;
      numberOfFigures: number;
      name: string;
      points: number;
    },
    tableInfo: Array<Tile>,
    gameState: string
  ) {
    this.playerInfo = playerInfo;
    this.currentRound = currentRound;
    this.currentPlayer = currentPlayer;
    this.tableInfo = tableInfo;
    this.gameState = gameState;
  }
}
