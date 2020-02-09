import { Component, OnInit, Input } from '@angular/core';
import { TableInfo } from '../api/models/tableInfo';

@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.css']
})
export class StatTableComponent implements OnInit {
  @Input() public tableInfo: TableInfo;

  constructor() { }

  ngOnInit() {
  }

}
