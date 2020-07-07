var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
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
    }
};

module.exports = roleUpgrader;