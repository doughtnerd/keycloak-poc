const express = require('express');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')


const keycloak = new Keycloak({
}, {

  realm: 'wealth-bank',
  clientId: 'fe-api',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  // This needs to be swapped out when keycloak is spun up/down
  realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5W00nc2o+5ocU4PEH41/UDArJbx/OlEhROdLaL2ajcrapdr2SqUbJabBYuxApyfcS+lJiTHty85c4rZ2xCbijuI1bbmzNFS0QOsjNRevG00mFK+iXPISO7zGAREWt8malXDBcS58YR3d7/tRLfnbVMymPyMVHvyTt/04p4e+HCe8T5WiodYXqTL+ZpRUFdX/GDOPZ3JcgomflETtORgZFQ5piC3FaQK6Fzh5S2LR2rLyEx60tu+6kISmU14ZzYKPCYdDRxi275tlBa1rQCGHBLDoeKiWJlPXI07IWqCcXyFCcW7Jh+sFhNDIFUONkt8HPd4mpFN3fAh9UhaJbtFZdwIDAQAB"
});

console.log("HELLO!")

app.use(
  cors({
    origin: "*"
  }),
  bodyParser.json(),
  keycloak.middleware()
);

app.get('/', (req, res) => {
    res.status(200).end();
});

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

