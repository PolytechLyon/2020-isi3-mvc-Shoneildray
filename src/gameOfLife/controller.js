import { View } from "./view";
import { Model } from "./model";

export class controller {

  constructor(){
    this.go();
  }

  go(){

    let vue = new View();
    let modele = new Model();
    modele.init();
    modele.ajouterObserver(vue);


    document.getElementById("start").onclick = function(){
      modele.run();
    };


    document.getElementById("stop").onclick = function(){
      modele.stop();
    };


    document.getElementById("reset").onclick = function(){
      modele.reset();
    };
  }

};