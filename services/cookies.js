const sessionIdToUserMap=new Map()

function setUser(id,user){
    sessionIdToUserMap.set()
}

function getUser(id){
    return sessionIdToUserMap.get(id)
}

module.exports={
    setUser,getUser
}