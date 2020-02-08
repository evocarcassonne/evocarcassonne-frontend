import { Component, OnInit, Input } from '@angular/core';
import { PlayerInfo } from '../api/models/playerinfo';

@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.css']
})
export class StatTableComponent implements OnInit {
  @Input() public players: Array<PlayerInfo>;
  @Input() currentPlayer: PlayerInfo;

  constructor() { }

  ngOnInit() {
  }

}
