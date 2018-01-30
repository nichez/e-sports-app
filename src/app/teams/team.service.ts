import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Team } from './team.model'
import { Player } from '../shared/player.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class TeamService {
  teamsChanged = new Subject<Team[]>();

  private teams: Team[] = [];

  constructor(private slService: ShoppingListService) {}

  setTeams(teams: Team[]) {
    this.teams = teams;
    this.teamsChanged.next(this.teams.slice());
  }

  getTeams() {
    return this.teams.slice();
  }

  getTeam(index: number) {
    return this.teams[index];
  }

  addPlayersToShoppingList(players: Player[]) {
    this.slService.addPlayers(players);
  }

  addTeam(team: Team) {
    this.teams.push(team);
    this.teamsChanged.next(this.teams.slice());
  }

  updateTeam(index: number, newTeam: Team) {
    this.teams[index] = newTeam;
    this.teamsChanged.next(this.teams.slice());
  }

  deleteTeam(index: number) {
    this.teams.splice(index, 1);
    this.teamsChanged.next(this.teams.slice());
  }

}
