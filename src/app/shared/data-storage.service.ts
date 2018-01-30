import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { TeamService } from '../teams/team.service';
import { Dota2Service } from '../dota2/dota2.service';
import { Team } from '../teams/team.model';
import { Dota2Team } from '../dota2/dota2team.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private teamService: TeamService,
              private dota2Service: Dota2Service,
              private authService: AuthService) {}

  storeTeams() {
    const req = new HttpRequest('PUT', 'https://cs-go-app.firebaseio.com/teams.json',
      this.teamService.getTeams(), {reportProgress: true})
    return this.httpClient.request(req);
  }

  getTeams() {
    this.httpClient.get<Team[]>('https://cs-go-app.firebaseio.com/teams.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (teams) => {
          console.log(teams);
          for (const team of teams) {
            if (!team['players']) {
              team['players'] = [];
            }
          }
          return teams;
        }
      )
      .subscribe(
        (teams: Team[]) => {
          this.teamService.setTeams(teams);
        }
      );
  }

// Dota2

storeDota2Teams() {
    const req = new HttpRequest('PUT', 'https://cs-go-app.firebaseio.com/dota2teams.json',
      this.dota2Service.getDota2Teams(), {reportProgress: true})
    return this.httpClient.request(req);
  }

  getDota2Teams() {
    this.httpClient.get<Dota2Team[]>('https://cs-go-app.firebaseio.com/dota2teams.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (dota2teams) => {
          console.log(dota2teams);
          for (const dota2team of dota2teams) {
            if (!dota2team['players']) {
              dota2team['players'] = [];
            }
          }
          return dota2teams;
        }
      )
      .subscribe(
        (dota2teams: Dota2Team[]) => {
          this.dota2Service.setDota2Teams(dota2teams);
        }
      );
  }

}
