import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const BASE_URL = "http://localhost:8080/api/Player";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  subscribeGame(gameId: string, playerName: string, callback) {
    this.http
      .post(BASE_URL + "/Subscribe", "", {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["playerName"]: playerName,
          ["gameId"]: gameId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response.toString());
      });
  }

  playersInGame(gameId: string, callback) {
    this.http
      .get(BASE_URL + "/Players", {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["gameId"]: gameId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response);
      });
  }

  unsubscribeGame(gameId: string, playerid: string, callback) {
    this.http
      .post(BASE_URL + "/Unsubscribe", "", {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["playerName"]: playerid,
          ["gameId"]: gameId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response);
      });
  }

  setColor(gameId: string, playerId: string, color: string, callback) {
    this.http
      .get(BASE_URL + "/SetColor", {
      headers: new HttpHeaders({
        ["Content-Type"]: "application/json",
        ["gameId"]: gameId,
        ["playerId"]: playerId,
        ["color"]: color,
        ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        }),
        responseType: "text"
    })
    .subscribe(response => {
      callback(response.toString());
    });
  }
}
