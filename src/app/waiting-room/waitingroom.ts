import { Component, Injectable, Input, OnInit } from "@angular/core";
import { PlayerInfo } from "../api/models/playerinfo";
import { PlayerService } from "../api/player.service";
import { Subscription, interval } from "rxjs";
import { GamePlayService } from "../api/gameplay.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { TableInfo } from "../api/models/tableInfo";

@Component({
  selector: "waiting-room",
  templateUrl: "./waitingroom.html"
})
@Injectable()
export class WaitingRoomComponent implements OnInit {
  @Input() players: Array<PlayerInfo>;
  @Input() gameId: string;
  sub: Subscription;

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
}
