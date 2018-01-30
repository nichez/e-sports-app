import { Subject } from 'rxjs/Subject';
import { Player } from '../shared/player.model';


export class ShoppingListService {
  playersChanged = new Subject<Player[]>();
  startedEditing = new Subject<number>();

  private players: Player[] = [
    new Player('Apples', 'Russia'),
    new Player('Tomatoes', 'Macedonia'),
  ];

  getPlayers() {
    return this.players.slice();
  }

  getPlayer(index: number) {
    return this.players[index];
  }

  addPlayer(player: Player) {
    this.players.push(player);
    this.playersChanged.next(this.players.slice());
  }

  addPlayers(players: Player[]) {
    this.players.push(...players);
    this.playersChanged.next(this.players.slice());
  }

  updatePlayer(index: number, newPlayer: Player) {
    this.players[index] = newPlayer;
    this.playersChanged.next(this.players.slice());
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
    this.playersChanged.next(this.players.slice());
  }

}
