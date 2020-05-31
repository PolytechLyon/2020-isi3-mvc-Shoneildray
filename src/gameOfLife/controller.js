export const controller = model => {


  document.getElementById("start").onclick = function(){
    model.run();
  };


  document.getElementById("stop").onclick = function(){
    model.stop();
  };


  document.getElementById("reset").onclick = function(){
    model.stop();
    model.init();
  };

};

