import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Team } from '../team.model'
import { TeamService } from '../team.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  teams: Team[];
  subscription: Subscription;

  constructor(private teamService: TeamService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.teamService.teamsChanged
      .subscribe(
        (teams: Team[]) => {
          this.teams = teams;
        }
      );
    this.teams = this.teamService.getTeams();
    this.dataStorageService.getTeams();
  }

  onNewTeam() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
