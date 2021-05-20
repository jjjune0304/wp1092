import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    console.log("Calling /create-card");
    const { name, subject, score} = req.body;
    const existing = await ScoreCard.findOne({name:name, subject:subject});
    // const existing = await ScoreCard.find({});
    console.log("now on database");
    console.log(await ScoreCard.find({}));
    if(existing) {
      const ret = await ScoreCard.updateMany({name:name, subject:subject}, { score: score });
      console.log("update {" + name+', '+subject+' }');
      // console.log(res.n);
      var card = { name, subject, score };
      var message = "Updating ("+name+", "+subject+", "+score+")"
      res.send({card, message });

    } 
    else {
      const newScoreCard = new ScoreCard({ name, subject, score});
      console.log("Created ScoreCard", newScoreCard);
      newScoreCard.save();
      var card = { name, subject, score };
      var message = "Adding ("+name+", "+subject+", "+score+")"
      res.send({card, message });
    }

  } catch (e) {
    console.log(e)
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.get('/clear', async function (req, res) {
  try {
    console.log("Calling /clear");
    const del = await ScoreCard.deleteMany({})

    console.log("now on database");
    console.log(await ScoreCard.find({}));
    var message = "Database cleared";
      res.send({message});

  } catch (e) {
    console.log(e)
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query-card', async function (req, res) {
  console.log("Calling /query-card");
  const { queryType, queryString} = req.body;
  try {

    
    if( queryType=='name') {
      var result = await ScoreCard.find({name:queryString});
      console.log(result)
    }
    else if(queryType=='subject') {
      var result = await ScoreCard.find({subject:queryString});
      console.log(result)
    }

    var messages = result.map((m)=>"("+m.name+", "+m.subject+", "+m.score+")");

    res.send({messages });

  } catch (e) {
    console.log(e)
    var message = queryType + '('+queryString+') not found!';
    res.json({ message: message });
  }
});

export default router;
