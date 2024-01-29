import { Injectable } from '@angular/core';
import { Player } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _players: Array<Player> = [
    {
      id: 1,
      name: "You",
      progress: 0,
      human: true,
      baseSpeed: 0
    },
    {
      id: 2,
      name: "Bot 1",
      progress: 0,
      human: false,
      baseSpeed: 15
    }
  ];

  get players() {
    return this._players;
  }

  get humanPlayer() {
    return this._players.find(player => player.human);
  }

  get bots() {
    return this._players.filter(player => !player.human);
  }

  public addPlayer = (name: Player["name"]) => {
    const playerId = this._players.length + 1;
    this._players.push({id: playerId, name: name, progress: 0, human: false, baseSpeed: 15});
  }
}
