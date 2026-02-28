const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const express = require("express");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const app = express();

app.get("/", async (req, res) => {
  const entries = (await db.collection("test-collection").get()).docs.map((e) =>
    e.data(),
  );
  logger.log("Inside app / handler");
  res.send(`hello, ${JSON.stringify(entries)}`);
});

exports.handler = onRequest((request, response) => app(request, response));
