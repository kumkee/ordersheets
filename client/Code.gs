var ColNames = ['time', 'row'];
const MinsInDay = 60*24;
const TriggerMins = 10; 
const MaxEntries = MinsInDay / TriggerMins;


function update() {
  ordersheets.updateIteration();
}


function onOpen(){
  ordersheets.onOpen();
}
