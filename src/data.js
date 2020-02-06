const path = require('path')
const fs = require('fs')

// getting account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'UTF8' })
const accounts = JSON.parse(accountData)

// getting user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'UTF8' })
const users = JSON.parse(userData)

