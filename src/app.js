const fs = require('fs')
const path = require('path')
const express = require('express')
const {
  accounts, 
  users,
  writeJSON
} = require('./data')
const accountRoutes = require('./routes/accounts')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// additions to express app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


// routes
app.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Account Summary', accounts })
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
    accounts[req.body.to].balance += parseInt(req.body.amount, 10)
    writeJSON()
    res.render('transfer', { message: 'Transfer Completed' })
  } catch {
    console.error('error in sending form', req.body)
    res.redirect('/transfer')
  }
})

app.get('/payment', async (req, res) => {
  try {
    res.render('payment', { account: accounts.credit })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})
app.post('/payment', async (req, res) => {
  try {
    accounts.credit.balance -= parseInt(req.body.amount)
    accounts.credit.available += parseInt(req.body.amount)
    writeJSON()
    res.render('payment', { message: 'Payment Successful', account: accounts.credit })
  } catch {
    console.error('error in sending form', req.body)
    res.redirect('/payment')
  }
})

// generate server
app.listen(3000, async () => console.log('PS Project Running on port 3000!'))