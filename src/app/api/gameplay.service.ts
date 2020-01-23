import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { callbackify } from "util";
import { PlaceTile } from "./models/placeTile";

const BASE_URL = "http://localhost:8080/api/GamePlay";

@Injectable({
  providedIn: "root"
})
export class GamePlayService {
  constructor(private http: HttpClient) {}

  startGame(gameId: string, playerId: string, callback) {
    this.http
      .post(BASE_URL + "/Start", "", {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["gameId"]: gameId,
          ["playerId"]: playerId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => callback(response.toString()));
  }

  getNewTile(gameId: string, callback) {
    this.http
      .get(BASE_URL + "/GetNewTile", {
        responseType: "text",
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["gameId"]: gameId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response.toString());
      });
  }

  endTurn(gameId: any, playerId: any, callback) {
    this.http
      .post(BASE_URL + "/EndTurn", "", {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["gameId"]: gameId,
          ["playerId"]: playerId,
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response);
      });
  }

  currentPlayer(gameId: string, callback) {
    this.http
      .get(BASE_URL + "/CurrentPlayer", {
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
  currentRound(gameId: string, callback) {
    this.http
      .post(BASE_URL + "/CurrentRound", "", {
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
  placeTile(tileToPlace: PlaceTile, callback) {
    this.http
      .post(BASE_URL + "/PlaceTile", tileToPlace, {
        headers: new HttpHeaders({
          ["Content-Type"]: "application/json",
          ["Access-Control-Allow-Origin"]: "http://localhost:4200"
        })
      })
      .subscribe(response => {
        callback(response);
      });
  }
  getCurrentState(gameId: string, callback) {
    this.http
      .get(BASE_URL + "/State", {
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
}
