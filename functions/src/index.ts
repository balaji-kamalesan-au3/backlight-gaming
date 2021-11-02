import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { scoreApp } from './getScore';
import { postScoreApp } from './postScore';


export interface Score {
  id:string,
  score : number,
  date : Date,
  player : string
}

admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();
export const scoreCollection = 'scores';


const app = express();
const main = express();

main.use('/',app)
main.use('/postScore', postScoreApp);
main.use('/getScores',scoreApp)
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.send('Welcome to our API Services')
})


export const webApi = functions.https.onRequest(main);