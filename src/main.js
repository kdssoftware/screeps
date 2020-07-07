var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnSpawning = require('spawn.spawning');

module.exports.loop = function () {

    let towers = Game.rooms["W23S6"].find(FIND_MY_STRUCTURES,({
        filter: (structure) => structure.structureType == STRUCTURE_TOWER
    }));
    for(let tower in towers) {
        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    spawnSpawning.spawning(35,50,15);

    for(var name in Game.creeps) {
        console.log(creepsOnSources);
        var creep = Game.creeps[name];
        creep.memory.onSource = null;
        if(!creep.memory.onSource){
            creep.memory.onSource = null;
            if(creepsOnSources==0){
                creepsOnSources=1;
            }else{
                creepsOnSources=0;
            }
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
