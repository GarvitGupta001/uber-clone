const userModel = require('../models/user.model')

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("missing fields in user")
    }

    const user = new userModel({
        fullname: {
            firstName: firstname,
            lastName: lastname
        },
        email: email,
        password: password
    })

    await user.save()

    return user
}