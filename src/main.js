var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnSpawning = require('spawn.spawning');
var managerEnergyHarvester = require('manager.energyHarvester');
global.CURRENT_AMOUNT_OF_CREEPS = 0;
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

    spawnSpawning.spawning(25,50,25);
    managerEnergyHarvester.manage();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(!creep.memory.onSource){
            creep.memory.onSource = 0;
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
