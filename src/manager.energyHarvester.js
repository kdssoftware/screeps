var energyHarvester = {
    manage : function (){
        let checkOnSources = [0,0];
        CURRENT_AMOUNT_OF_CREEPS = 0;
        for(var name in Game.creeps) {
            CURRENT_AMOUNT_OF_CREEPS++;
            var creep = Game.creeps[name];
            checkOnSources[creep.memory.onSource] ++;
        }
        if(!CURRENT_AMOUNT_OF_CREEPS==(checkOnSources[0]+checkOnSources[1])){
            if(checkOnSources[0]%2!=0){
                checkOnSources[0]--;
            }
            if(checkOnSources[1]%2!=0){
                checkOnSources[1]--;
            }
            if(checkOnSources[0]!=checkOnSources[1]){
                console.log('Rebasing onSources, ',checkOnSources);
                let creepsOnSources=0;
                for(let name in Game.creeps){
                    var creep = Game.creeps[name];
                    creep.memory.onSource = creepsOnSources;
                    if(creepsOnSources==0){
                        creepsOnSources=1;
                    }else{
                        creepsOnSources=0;
                    }
                }
            }
        }
    }
}

module.exports = energyHarvester;