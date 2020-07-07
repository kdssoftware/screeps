
let doSpawn = (role,body=[WORK,CARRY,MOVE])=>{
    var newName = role + Game.time;
    Game.spawns['Spawn1'].spawnCreep(body, newName,
        {memory: {role: role,sources:0}});
};

var spawnSpawing = {
    spawning: function(harvester,builder,upgrader){
        let oneHundredPercent = harvester+builder+upgrader;
        if(oneHundredPercent!= 100){
            console.log("spawn.spawning arguments not equal to 100%! ",oneHundredPercent);
        }

        let pop = {total:0,roles:{
                upgrader:0,builder:0,harvester:0
            }};
        for (var i in Game.creeps) {
            pop.total++;
            switch(Game.creeps[i].memory.role){
                case 'upgrader':
                    pop.roles.upgrader++;
                    break;
                case 'builder':
                    pop.roles.builder++;
                    break;
                case 'harvester':
                    pop.roles.harvester++;
                    break;
                default:
                    console.log("Couldnt find the role "+i.memory.role);
            }
        }
        if(pop.total>=10){
            return;
        }
        if(Game.rooms["W23S6"].energyAvailable>=300){
            let index = 0;
            for(let i in pop.roles){
                const percentForCurrentRole = (pop.roles[i]/pop.total)*100.0;
                switch(i){
                    case 'upgrader':
                        if(percentForCurrentRole<upgrader){
                            console.log('spawning a '+i+', is at '+percentForCurrentRole.toFixed(2)+'%');
                            doSpawn(i);
                            return
                        }
                        break;
                    case 'builder':
                        if(percentForCurrentRole<builder){
                            console.log('spawning a '+i+', is at '+percentForCurrentRole.toFixed(2)+'%');
                            doSpawn(i);
                            return;
                        }
                        break;
                    case 'harvester':
                        if(percentForCurrentRole<=harvester){
                            console.log('spawning a '+i+', is at '+percentForCurrentRole.toFixed(2)+'%');
                            doSpawn(i);
                            return;
                        }
                        break;
                    default:
                        console.log('trying to find current role, not found: '+i);
                        break;
                }
                index++;
            }
        }else{
            //console.log('not spawning anything, only '+Game.rooms["W23S6"].energyAvailable+' available');
        }
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};
module.exports = spawnSpawing;
