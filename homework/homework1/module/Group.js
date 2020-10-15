function Group(n){
    this.number = n
    this.members = new Array()

    this.push = (member) => {
        this.members.push(member)
    }
}

module.exports = Group