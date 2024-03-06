const express = require('express');
// const session = require('express-session');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// app.use(session({
//   secret: 'some secret',
//   resave: false,
//   saveUninitialized: true,
//   store: memoryStore
// }));

// var memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({}, {
  realm: 'wealth-bank',
  clientId: 'example-react-fe',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxmwrcoRQNK4t/hIYrOKTN4k6ca2lxbWk5LdzNad+R42UAi5HYo7J0l+aS89/6NXE0BUEz1tSXgoLnP8RwdWoti4q2mt08TrTbqNMK4m1mHQAZsPZxQY1WJ4qSJ9a92Y/7u5HqI4vtEVx42R8vqnaq6h1WnPFeFya6Q15rxxs/TgBhNN1CV+NWKgyHNeCEHqUOULdODqmdw3mTXTk9b31h/ymUITy5yUw3YCYtoLcmqbmUz7lwTH+0XllyElyfc7izcwZou8Zk2DJNY2xMCS0HQ1zEVlgZ6aXPnz0mYvq5/XZQ0WuTu3hSB7AgXGbhAsCkgDUOLm6OK9GnnEhgT5CewIDAQAB"
});

console.log("HELLO!")

app.use(cors({
  origin: "*"
}));

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

