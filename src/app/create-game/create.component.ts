import { Component, Injectable, Input, OnInit } from "@angular/core";
import { GameService } from "../api/game.service";
import { GamePlayService } from "../api/gameplay.service";
import { CookieService } from "ngx-cookie-service";
import { PlayerInfo } from "../api/models/playerinfo";
import { Router } from "@angular/router";

@Component({
  selector: "create-game",
  templateUrl: "./create.component.html"
})
@Injectable()
export class CreateComponent implements OnInit {
  playerName: string;
  title: string;
  visibility: string;
  showSpinner: string;
  gameId: string;
  playerId: string;

  ngOnInit(): void {
    this.playerName = null;
    this.title = "Create a new game";
    this.visibility = "hidden";
    this.showSpinner = "hidden";
  }

  constructor(
    private gameService: GameService,
    private gamePlayService: GamePlayService,
    private cookie: CookieService,
    private router: Router
  ) {}

  createGame(): void {
    this.showSpinner = "visible";
    if (this.playerName !== null && this.playerName !== "") {
      this.gameService.createNewGame(this.playerName, (result: string) => {
        this.gameId = result;
        this.cookie.set("gameId", this.gameId);
        this.playerName = null;
        this.visibility = "visible";
        this.showSpinner = "hidden";
        this.gamePlayService.currentPlayer(
          this.gameId,
          (result: PlayerInfo) => {
            this.playerId = result.playerId;
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
        this.router.navigate(["/playing"]);
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
