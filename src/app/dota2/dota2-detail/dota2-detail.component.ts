import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Dota2Team } from '../dota2team.model'
import { Dota2Service } from '../dota2.service';

@Component({
  selector: 'app-dota2-detail',
  templateUrl: './dota2-detail.component.html',
  styleUrls: ['./dota2-detail.component.css']
})
export class Dota2DetailComponent implements OnInit {
  dota2team: Dota2Team;
  id: number;

  constructor(private dota2Service: Dota2Service,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.dota2team = this.dota2Service.getDota2Team(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.dota2Service.addPlayersToShoppingList(this.dota2team.players);
  }

  onEditDota2Team() {
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteDota2Team() {
    this.dota2Service.deleteDota2Team(this.id);
    this.router.navigate(['/dota2']);
  }

}
