import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Team } from '../team.model'
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  id: number;

  constructor(private teamService: TeamService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.team = this.teamService.getTeam(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.teamService.addPlayersToShoppingList(this.team.players);
  }

  onEditTeam() {
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteTeam() {
    this.teamService.deleteTeam(this.id);
    this.router.navigate(['/teams']);
  }

}
