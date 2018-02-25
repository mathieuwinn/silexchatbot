var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "myCustomToken123") {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});




curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "payload":"Greeting"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAcSEWH7Fs4BALAuY0xZAHk1zX5YV5t1AS2PuY8lY7V0gnbau1USKYQBQP5eiF3mgp18TpbZCWqH3nwF0JBOhIZCnT4FhLUGiwmmriVvf1fGRXmhjw6lNXWIImW4TXQU2F6hsssDYQpWqpk6djcr6TjrJhStXoMZBfZAcz4aelAZDZD"
