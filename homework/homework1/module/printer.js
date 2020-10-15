module.exports = function(group){
    console.log(`[${group.number}조]`);
    group.members.forEach(function(member){ 
        console.log(member);
    })
}