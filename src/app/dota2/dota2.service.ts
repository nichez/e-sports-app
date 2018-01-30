import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Dota2Team } from './dota2team.model'
import { Player } from '../shared/player.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class Dota2Service {
  dota2teamsChanged = new Subject<Dota2Team[]>();

  private dota2teams: Dota2Team[] = [];

  constructor(private slService: ShoppingListService) {}

  setDota2Teams(dota2teams: Dota2Team[]) {
    this.dota2teams = dota2teams;
    this.dota2teamsChanged.next(this.dota2teams.slice());
  }

  getDota2Teams() {
    return this.dota2teams.slice();
  }

  getDota2Team(index: number) {
    return this.dota2teams[index];
  }

  addPlayersToShoppingList(players: Player[]) {
    this.slService.addPlayers(players);
  }

  addDota2Team(dota2team: Dota2Team) {
    this.dota2teams.push(dota2team);
    this.dota2teamsChanged.next(this.dota2teams.slice());
  }

  updateDota2Team(index: number, newDota2Team: Dota2Team) {
    this.dota2teams[index] = newDota2Team;
    this.dota2teamsChanged.next(this.dota2teams.slice());
  }

  deleteDota2Team(index: number) {
    this.dota2teams.splice(index, 1);
    this.dota2teamsChanged.next(this.dota2teams.slice());
  }

}
