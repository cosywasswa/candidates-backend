const bcrypt = require('bcrypt')

exports.hashing = async(value, saltValue)=>{
const result = await bcrypt.hash(value, saltValue)
return result
}

exports.comparing = async(value, saltValue)=>{
    const result = await bcrypt.compare(value, saltValue)
    return result
}