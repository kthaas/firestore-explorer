# Firestore Explorer

_Web based read only admin UI to explore cloud firestore and emulator._

![GitHub package.json version](https://img.shields.io/github/package-json/v/ablehq/firestore-explorer)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ablehq/firestore-explorer)
[![GitHub license](https://img.shields.io/github/license/ablehq/firestore-explorer)](https://github.com/ablehq/firestore-explorer/blob/master/LICENSE.md)
![GitHub language count](https://img.shields.io/github/languages/count/ablehq/firestore-explorer)
![GitHub top language](https://img.shields.io/github/languages/top/ablehq/firestore-explorer)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/ablehq/firestore-explorer)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Motivation

There are a couple of issues we noticed during our day to day development with Firestore projects.

- Exploring documents in your collections can soon become tedious process as you have to click through and navigate the whole hierarchy, its a painful experience that eats into your productivity.

- There is no way to explore Firestore emulator.

What we need is a quick way to query the data of interest, just like there is an sql console for a relational database, we would need a query tool for Firestore as well.

## Before you begin

- To connect to Cloud Firestore, this tool would require Firebase project's security credentials for admin access. To mitigate any risk of accidental writes to Firestore, this tool ensures that the queries passed to it are read only calls. It does so by applying a layer of javascript parsing that filters only read queries.

- This tool is like any other Firestore client, hence reads made through this tool will be charged as per Firestore plan.

## Usage

![Usage](./screenshots/usage.gif)

> Note: Ensure you have [nvm](https://github.com/nvm-sh/nvm) and [firebase-tools](https://github.com/firebase/firebase-tools) installed.

Clone the repository

Follow these steps when using for the first time.

- `yarn`
- `yarn onetime_setup`
- `yarn serve`

Subsequent usage

- `yarn serve`

You will see that [Firebase Proxy](#firebase-proxy) is running at port 7000 and [Explorer](#explorer) running at port 8000

## Query console

Query console supports arbitrary queries to Firestore. It expects javascript based method calls just like the [web or admin sdk](https://firebase.google.com/docs/firestore/query-data/get-data). There are some limitation to the queries

- Single valid javascript statement
- Query should always start with `db`
- Query should always end with call that will return a promise of `QueryDocumentSnapshot` or `QueryDocumentSnapshot` or `QuerySnapshot` or `Array<CollectionReference>`

### Examples

```javascript
db.listCollections();
```

```javascript
db.collection("movies")
  .limit(10)
  .get();
```

```javascript
db.collection("movies")
  .where("title", "==", "LBJ (2017)")
  .limit(10)
  .get();
```

```javascript
db.doc("movies/179813").get();
```

```javascript
db.doc("movies/179813/ratings/179813-462-1536467407").get();
```

## Development Details

The project is divided into three modules. All these three modules can be developed independent of each other. Typescript is used across all these modules.

- Firebase Proxy
- Explorer
- Firebase seeds

### Firebase Proxy

An express based server which mainly deals with exposing two kinds of api.

- An api for web app for its storage needs. Exposes servers and config api endpoints.
- An api for command execution. It uses firebase admin sdk under the hood to wrap firebase calls to the firestore emulator or cloud firestore.

This can be worked on independently. Simply `cd` to the directory and use `yarn watch` to work on the code.

### Explorer

A vuejs based web application. Uses vuex for state management needs and vuetify for ui components. This module can also be worked on independently, simply `cd` to the directory and use `yarn serve` to work on the code.

### Firebase seeds

This is simple utility module to setup data in firestore emulator and cloud firestore.

- Use `yarn` to install project dependencies.
- Use `yarn emulator_setup` to install firebase tools along with emulator
- Use `yarn emulator_start` to start the firestore emulator
- Use `yarn seed_local` to seed data present in `data` directory into emulator firestore
- Use `yarn seed_cloud` to seed data into cloud firestore. To work with cloud firestore you will admin sdk credentials file. You can get one by navigating to service accounts -> generate new key. Create a file called `FirebaseAdminConfig.json` in root directory of this module and paste the contents of the downloaded file into the json file.

> Note: Firestore emulator requires Java runtime, so ensure your machine Java installed.
