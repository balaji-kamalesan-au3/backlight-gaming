import * as express from 'express';
import { db, Score, scoreCollection } from './index';


export  const postScoreApp = express();

postScoreApp.post('/postScore', async (req, res) => {
    try {
        const score : Score = {
          id:req.body['id'],
          player : req.body.name,
          score : req.body.score,
          date : new Date()
        }
        const newDoc = await db.collection(scoreCollection).add(score);
        res.status(201).send(`Added New Score: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Check the Input`)
    }
  });