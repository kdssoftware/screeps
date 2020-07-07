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
    let checkOnSources = [0,0];
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        checkOnSources[creep.memory.onSource] ++;
    }
    console.log(checkOnSources);
    if(checkOnSources[0]%2!=0){
        checkOnSources[0]--;
    }
    if(checkOnSources[1]%2!=0){
        checkOnSources[1]--;
    }
    if(checkOnSources[0]!=checkOnSources[1]){
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

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(!creep.memory.onSource){
            creep.memory.onSource = creepsOnSources;
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
