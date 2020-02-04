const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'UTF8' })
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'UTF8' })
const users = JSON.parse(userData)
// routes
app.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Account Summary', accounts})
  } catch {
    console.error('encountered an error', req.headers)
  }
})
app.get('/savings', async (req, res) => {
  try {
    res.render('account', { account: accounts.savings })
  } catch {
    console.error('encountered an error', req.headers)
  }
})

app.get('/checking', async (req, res) => {
  try {
    res.render('account', { account: accounts.checking })
  } catch {
    console.error('encountered an error', req.headers)
  }
})

app.get('/credit', async (req, res) => {
  try {
    res.render('account', { account: accounts.credit })
  } catch {
    console.error('encountered an error', req.headers)
  }
})

app.listen(3000, async () => console.log('PS Project Running on port 3000!'))