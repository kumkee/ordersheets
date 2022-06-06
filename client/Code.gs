ordersheets.TriggerMins = 10;
ordersheets.MaxEntries = ordersheets.MinsInDay / ordersheets.TriggerMins;


function update() {
  ordersheets.updateIteration();
}


function onOpen(){
  ordersheets.onOpen();
}
