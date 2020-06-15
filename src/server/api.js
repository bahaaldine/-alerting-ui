// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'alert-triage-ui',

    // Use if APM Server requires a token
    secretToken: '81FZNoMtmQAgWzv1PE',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://fdf8d494ed7843d2b8cfbdf3af5d43ef.apm.us-east-1.aws.cloud.es.io',
})

const _ = require('lodash');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: 'elasticsearch_url',
  auth: {
    username: 'your_user',
    password: 'your_password'
  }
});

app.get('/alerts-list', (req, res) => {
    client.search({
        index: 'incidents_list',
        size: 1000
    }).then( response => {
        res.send(_.map(response.body.hits.hits,'_source'));
    }).catch( error => {
        res.send(error);
    });
});

app.get('/team', (req, res) => {
    client.search({
        index: 'team',
        size: 1000
    }).then( response => {
        res.send(_.map(response.body.hits.hits,'_source'));
    }).catch( error => {
        res.send(error);
    });
});

app.post('/alert', (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const graphIndex = 'graph';
    client.index({
        index: graphIndex
        , id: id
        , body: body
    }).then( response => {
        res.send(response);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));