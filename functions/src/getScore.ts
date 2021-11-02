import * as express from 'express';
import { scoreCollection,db } from './index';


export  const scoreApp = express();

scoreApp.get('/getScore', async (req, res) => {
    try {
        const scoreData = await db.collection(scoreCollection).get();
        const scores: any[] = [];
        scoreData.forEach(
            (doc)=>{
                    scores.push({
                        id: doc.id,
                        data:doc.data()
                    });
                  }
        );
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).send(error);
    }
  });
  