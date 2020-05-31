import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {

  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.listeObservers = new Array(10); // le nombre 10 est arbitraire
    this.curseurListeObservers = 0;

    this.state = Array.from(new Array(this.height), () =>
        Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.notifyObservers();
  }

  ajouterObserver(observer){
    this.listeObservers[this.curseurListeObservers] = observer;
    this.curseurListeObservers ++;
    observer.initView();
    observer.update(this);
  }

  reset() {
    this.stop();

    this.state = Array.from(new Array(this.height), () =>
        Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.notifyObservers();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        let compteur = 0;
        var listeChangements = new Array(this.height*this.width);
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            if (this.isCellAlive(i,j)){
              if (nbAlive!==2 && nbAlive!==3){
                listeChangements[compteur] = [i,j,CELL_STATES.DEAD];
                compteur ++;
              }
            }
            else if(nbAlive === 3){
              listeChangements[compteur] = [i,j,CELL_STATES.ALIVE];
              compteur ++;
            }
          }
        }
        listeChangements.forEach (changement =>
            this.state[changement[1]][changement[0]] = changement[2])

        this.notifyObservers();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  isCellAlive(x, y) {
    return x >= 0 &&
    y >= 0 &&
    y < this.height &&
    x < this.height &&
    this.state[y][x] === CELL_STATES.ALIVE
        ? 1
        : 0;
  }

  aliveNeighbours(x, y) {
    let number = 0;
    for (let i = -1; i<2; i++){
      for (let j=-1; j<2; j++){
        if (i!==0 || j!==0){
          number += this.isCellAlive(x+i,y+j);
        }
      }
    }
    return number;
  }

  notifyObservers() {
    this.listeObservers.forEach (observer =>
        observer.update(this))
  }
}
