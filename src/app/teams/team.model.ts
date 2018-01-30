import { Player } from '../shared/player.model';

export class Team {
  public name: string;
  public country: string;
  public imagePath: string;
  public players: Player[];

  constructor(name: string, country: string, imagePath: string, players: Player[]) {
    this.name = name;
    this.country = country;
    this.imagePath = imagePath;
    this.players = players;
  }
}
