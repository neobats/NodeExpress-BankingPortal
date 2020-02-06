const path = require('path')
const express = require('express')
const {
  accounts, 
  users,
} = require('./data')
const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')

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

app.use('/account', accountRoutes)

app.get('/profile', async (req, res) => {
  try {
    res.render('profile', { user: users[0] })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

app.use('/services', servicesRoutes)

// generate server
app.listen(3000, async () => console.log('PS Project Running on port 3000!'))