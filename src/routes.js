const {Track, Category} = require('./database')

const app = require('./app')

app.post('/tracks', async(req, res) => {
  try {
  await Track.create(req.body)
  return res.status(201).send('track added');
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
});

app.post('/categories', async(req, res) => {
  try {
    await Category.create(req.body)
    return res.status(201).send('category added');
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
})

