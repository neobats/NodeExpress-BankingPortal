const express = require('express')
const { accounts, writeJSON } = require('../data')
const router = express.Router()

router.get('/payment', async (req, res) => {
  try {
    res.render('payment', { account: accounts.credit })
  } catch {
    console.error('encountered an error', req.headers)
    res.redirect('/')
  }
})
// POST
router.post('/payment', async (req, res) => {
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

module.exports = {router}