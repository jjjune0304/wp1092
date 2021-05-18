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
    const { name, subject, score } = req.body;
    const card = {name: name, subject: subject, score: score};
    const s = '(' + name + ', ' + subject + ', ' + score + ')';
    const update = await ScoreCard.updateOne({ name, subject }, { score });
    if(!update.n) {
      console.log('Add');
      let newCard = new ScoreCard({name, subject, score});
      newCard.save();
    }
    let message = (update.n?'Updating ':'Adding ') + s;
    console.log('creation');
    res.send({card, message});
  } catch (e) {
    res.json({ message: 'Card creation fails...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    console.log('Database deleted.');
    res.json({message: 'Database deleted.'})
  } catch (e) {
    res.json({message: 'Database deletion fails...'})
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function (req, res) {
  const queryType = req.query.queryType;
  const queryString = req.query.queryString;
  try {
    let found = [];
    if (queryType === 'Name') 
      await ScoreCard.find({name: queryString}, (err, doc) => { found = doc; });
    if (queryType === 'Subject') 
      await ScoreCard.find({subject: queryString}, (err, doc) => { found = doc; });
    if (!found.length) res.send({message: `${queryType}(${queryString}) not found.`});
    else {
      let messages = found.map((c)=> 
          { return { msg: `(${c.name},${c.subject},${c.score})`, score: c.score};});
      res.send({messages, message: `${queryType}(${queryString}) found.`})
    } 
  } catch (e) {
    res.json({message: 'Query fails.'})
  }
});

export default router;
