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
      baseSpeed: 0,
      speedModifier: 0
    },
    {
      id: 2,
      name: "Gustaf",
      progress: 0,
      human: false,
      baseSpeed: 300,
      speedModifier: 0
    }
  ];
  
  get bots() {
    return this._players.filter(player => !player.human);
  }

  get humanPlayer() {
    return this._players.find(player => player.human);
  }

  get players() {
    return this._players;
  }

  public addPlayer = (name: Player["name"], baseSpeed: Player["baseSpeed"] = 300) => {
    const playerId = this._players.length + 1;
    this._players.push({id: playerId, name: name, progress: 0, human: false, baseSpeed: baseSpeed, speedModifier: 0 });
  }

  public removePlayer(id: Player["id"]) {
    this._players = this._players.filter(player => player.id !== id);
  }
}
