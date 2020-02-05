const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// additions to express app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

// getting account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'UTF8' })
const accounts = JSON.parse(accountData)

// getting user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'UTF8' })
const users = JSON.parse(userData)

// routes
app.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Account Summary', accounts})
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.get('/savings', async (req, res) => {
  try {
    res.render('account', { account: accounts.savings })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.get('/checking', async (req, res) => {
  try {
    res.render('account', { account: accounts.checking })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.get('/credit', async (req, res) => {
  try {
    res.render('account', { account: accounts.credit })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.get('/profile', async (req, res) => {
  try {
    res.render('profile', { user: users[0] })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.get('/transfer', async (req, res) => {
  try {
    res.render('transfer')
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})
// POST
app.post('/transfer', async (req, res) => {
  try {
    accounts[req.body.from].balance -= req.body.amount
  } catch {
    console.error('error in sending form', req.body)
    res.redirect('/transfer')
  }
})

// generate server
app.listen(3000, async () => console.log('PS Project Running on port 3000!'))