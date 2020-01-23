import { Component, Injectable, Input } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "playerCard",
  templateUrl: "./player.component.html"
})
export class PlayerComponent {
  playerId: string;
  name: string;
  points: number;
  figures: number;

  constructor(id: string, name: string, point: number, figures: number) {
    this.playerId = id;
    this.name = name;
    this.points = point;
    this.figures = figures;
  }

  updatePoints(points: number) {
    this.points = points;
  }

  updateFigures(figures: number) {
    this.figures = figures;
  }
}
