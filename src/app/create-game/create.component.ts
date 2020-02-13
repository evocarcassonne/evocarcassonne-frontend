import { Component, Injectable, Input, OnInit } from "@angular/core";
import { GameService } from "../api/game.service";
import { GamePlayService } from "../api/gameplay.service";
import { CookieService } from "ngx-cookie-service";
import { PlayerInfo } from "../api/models/playerinfo";

@Component({
  selector: "create-game",
  templateUrl: "./create.component.html",
  styleUrls: ['./create.component.css']
})
@Injectable()
export class CreateComponent implements OnInit {
  playerName: string;
  title: string;
  showSpinner: string;
  divStyle: string;
  gameId: string;
  playerId: string;

  ngOnInit(): void {
    this.playerName = null;
    this.title = "Create a new game";
    this.showSpinner = "collapsedDiv";
    this.divStyle = "collapsedDiv";
  }

  constructor(
    private gameService: GameService,
    private gamePlayService: GamePlayService,
    private cookie: CookieService
  ) {}
  createGame(): void {
    this.showSpinner = "spinner-border";
    console.log(this.playerName);
    if (this.playerName !== null && this.playerName !== "") {
      this.gameService.createNewGame(this.playerName, (result: string) => {
        this.gameId = result;
        this.cookie.set("gameId", this.gameId);
        this.playerName = null;
        this.divStyle ="default";
        this.showSpinner = "collapsedDiv";
        this.gamePlayService.currentPlayer(
          this.gameId,
          (result: PlayerInfo) => {
            this.playerId = result.playerId;
            console.log("currentplayer " + this.playerId);
            this.cookie.set("playerId", this.playerId);
          }
        );
      });
    }
  }

  startGame() {
    this.gamePlayService.startGame(
      this.cookie.get("gameId"),
      this.cookie.get("playerId"),
      result => {
        console.log("started? " + result);
      }
    );
  }

  copyText() {
    let selBox = document.createElement("textarea");
    selBox.value = this.gameId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
