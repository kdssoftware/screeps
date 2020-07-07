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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            let harvest = creep.harvest(sources[0]);
            if(harvest == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(sources[creep.memory.sources], {visualizePathStyle: {stroke: '#ffaa00'}})==ERR_NO_PATH){
                    creep.memory.sources = 1;
                   if( creep.moveTo(sources[creep.memory.sources], {visualizePathStyle: {stroke: '#ffaa00'}})==ERR_NO_PATH){
                       creep.memory.sources=0;
                   }
                }
            }
        }
    }
};

module.exports = roleBuilder;