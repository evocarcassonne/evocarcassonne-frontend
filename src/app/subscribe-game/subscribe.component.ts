import { Component, Injectable, OnInit } from "@angular/core";
import { PlayerService } from "../api/player.service";
import { GameService } from "../api/game.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "subscribe",
  templateUrl: "./subscribe.component.html"
})
@Injectable()
export class SubscribeComponent implements OnInit {
  playerName: string;
  gameId: string;
  visibility: string;

  ngOnInit(): void {
    this.playerName = "";
    this.gameId = "";
    this.visibility = "hidden";
  }

  constructor(
    private playerService: PlayerService,
    private cookie: CookieService
  ) {}

  subscribeGame() {
    this.playerService.subscribeGame(this.gameId, this.playerName, result => {
      this.cookie.set("playerId", result);
      this.cookie.set("gameId", this.gameId);
      this.visibility = "visible";
    });
  }
}
