import { Component, Injectable, Input, OnInit } from "@angular/core";
import { PlayerInfo } from "../api/models/playerinfo";
import { PlayerService } from "../api/player.service";
import { Subscription, interval } from "rxjs";
import { GamePlayService } from "../api/gameplay.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { TableInfo } from "../api/models/tableInfo";
import { ColorEvent } from 'ngx-color';

@Component({
  selector: "waiting-room",
  templateUrl: "./waitingroom.html",
  styleUrls: ['./waitingroom.css']
})
@Injectable()
export class WaitingRoomComponent implements OnInit {
  @Input() players: Array<PlayerInfo>;
  @Input() gameId: string;
  sub: Subscription;
  colors: Array<string> = ["#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];
  // ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabebe", "#469990", "#e6beff", "#9A6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075"];

  ngOnInit(): void {
    const source = interval(2000);
    this.sub = source.subscribe(() => {
      this.checkConnectedPlayers();
    });
  }

  constructor(
    private playerService: PlayerService,
    private gamePlayService: GamePlayService,
    private cookie: CookieService,
    private router: Router
  ) {}

  checkConnectedPlayers() {
    if (
      this.gameId != null &&
      this.gameId !== undefined &&
      this.gameId !== ""
    ) {
      this.playerService.playersInGame(this.gameId, result => {
        this.players = result;
        this.gamePlayService.getCurrentState(
          this.gameId,
          (result: TableInfo) => {
            if (result.gameState === "Started") {
              this.router.navigate(["/playing"]);
              this.sub.unsubscribe();
            }
          }
        );
      });
    }
  }

  canModifyColor(playerId: string) {
    if (this.cookie.get("playerId") === playerId) {
      return "inline-block";
    } else {
      return "none";
    }
  }

  changeComplete($event: ColorEvent) {
    this.players.find(e => e.playerId === this.cookie.get("playerId")).color = $event.color.hex;
    this.playerService.setColor(this.gameId, this.cookie.get("playerId"), $event.color.hex, () => { });
  }
}
