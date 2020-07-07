var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
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

module.exports = roleBuilder;