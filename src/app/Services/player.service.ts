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
      human: true
    },
    {
      id: 2,
      name: "Bot",
      progress: 0,
      human: false
    },
    {
      id: 3,
      name: "Bot",
      progress: 0,
      human: false
    }
  ];

  get players() {
    return this._players;
  }

  public addPlayer = (name: Player["name"]) => {
    const playerId = this._players.length + 1;
    this._players.push({id: playerId, name: name, progress: 0, human: false});
  }
}
