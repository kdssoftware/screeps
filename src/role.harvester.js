var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            let harvest = creep.harvest(sources[creep.memory.sources]);
            if(harvest == ERR_NOT_IN_RANGE) {
                let moving = creep.moveTo(sources[creep.memory.sources], {visualizePathStyle: {stroke: '#ffaa00'}});
                if(moving==ERR_NO_PATH){
                    if(creep.memory.sources==0){
                        creep.memory.sources=1;
                    }else{
                        creep.memory.sources=0;
                    }
                }
            }
        }
        //test
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[targets.length-1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targets.length-1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;