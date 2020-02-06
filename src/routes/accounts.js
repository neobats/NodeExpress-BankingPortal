const express = require('express')
const { accounts } = require('../data')

const router = express.Router()

router.get('/savings', async (req, res) => {
  try {
    res.render('account', { account: accounts.savings })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

router.get('/checking', async (req, res) => {
  try {
    res.render('account', { account: accounts.checking })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

router.get('/credit', async (req, res) => {
  try {
    res.render('account', { account: accounts.credit })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})

module.exports = {router}