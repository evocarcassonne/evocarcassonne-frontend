import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const BASE_URL = "http://localhost:8080/api/Game";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private http: HttpClient) {}
  gameId: string;
  createNewGame(playerName: string, callback) {
    const headers = new HttpHeaders({
      ["Content-Type"]: "application/json",
      ["playerName"]: playerName,
      ["Access-Control-Allow-Origin"]: "http://localhost:4200"
    });

    let result = null;
    this.http
      .post(BASE_URL + "/Create", "", { headers: headers })
      .subscribe(response => {
        result = response.toString();
        this.gameId = result;
        callback(result);
      });
  }
  deleteNewGame(gameId: string, playerId: string, callback) {
    const headers = new HttpHeaders({
      ["Content-Type"]: "application/json",
      ["playerId"]: playerId,
      ["gameId"]: gameId,
      ["Access-Control-Allow-Origin"]: "http://localhost:4200"
    });

    this.http
      .post(BASE_URL + "/Delete", "", { headers: headers })
      .subscribe((response: { toString: () => void }) => {
        callback(response.toString());
      });
  }

  getCurrentGame() {
    return this.gameId;
  }
}
