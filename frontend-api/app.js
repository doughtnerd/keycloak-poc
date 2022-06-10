const express = require('express');
const Keycloak = require('@doughtnerd/keycloak-connect');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

const keycloak = new Keycloak({});

app.use(cors());

app.use(bodyParser.json());

app.use(keycloak.middleware());

app.get('/account/:accountId/transactions', (req, res) => {
  const accountId = req.params.accountId;
  const trans = [
    {
      id: '18963d79-58cb-4fbb-bf3a-7b26f2564bd5',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Purchase of Tesla stock',
      amount: -1000
    },
    {
      id: 'ba9da04d-0bb8-4d22-87fa-62177d26335f',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Purchase of Gamestop stock',
      amount: -10000
    },
    {
      id: 'bf5147bd-9337-476f-927c-8513a6f1d6d5',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Sale of Blackberry stock',
      amount: 200000
    }
  ]
  res.json(trans.filter(t => t.accountId === accountId))
})

app.get('/transactions', [keycloak.protect('example-react-fe:customer')], (req, res) => {
  const trans = [
    {
      id: '18963d79-58cb-4fbb-bf3a-7b26f2564bd5',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Purchase of Tesla stock',
      amount: -1000
    },
    {
      id: 'ba9da04d-0bb8-4d22-87fa-62177d26335f',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Purchase of Gamestop stock',
      amount: -10000
    },
    {
      id: 'bf5147bd-9337-476f-927c-8513a6f1d6d5',
      accountId: '4b202d0a-18fd-4933-b630-c5ad848ec5a7',
      vendor: 'Robinhood',
      description: 'Sale of Blackberry stock',
      amount: 200000
    }
  ]

  res.json(trans)
})

app.use('*', function (req, res) {
  res.send('Not found!');
});

app.listen(3001, function () {
  console.log('Started at port 3001');
});
