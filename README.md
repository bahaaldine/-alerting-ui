# Alerting Triage UI prototype

## Configuration

Add your Elasticsearch URL, username, password
in the ./scr/server/api.js

```javascript

const client = new Client({
  node: 'elasticsearch_url',
  auth: {
    username: 'your_user',
    password: 'your_password'
  }
});

``` 