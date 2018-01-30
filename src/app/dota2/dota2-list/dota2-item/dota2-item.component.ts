import { Component, OnInit, Input } from '@angular/core';
import { Dota2Team } from '../../dota2team.model';

@Component({
  selector: 'app-dota2-item',
  templateUrl: './dota2-item.component.html',
  styleUrls: ['./dota2-item.component.css']
})
export class Dota2ItemComponent implements OnInit {
  @Input() dota2team: Dota2Team;
  @Input() index: number;

  ngOnInit() {
  }

}