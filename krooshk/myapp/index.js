
const {Movie,Category}=require('./models.js');
const {app,port}=require('./connect.js');
express = require("express");

app.use(express.json());

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);

})


app.post('/movies', async (req, res) => {
    try{
        const doc = new Movie({
            title:req.body.title,
            year:req.body.year,
            duration:req.body.duration,
        });
        await Movie.create(doc);
        return res.status(201).send('movie created');
    }
    catch (err){
        return res.status(401).send(err);
    }
});

app.post('/category', async (req, res) => {
    try{
        const doc=new Category({
            title:req.body.title,
        })
        await Category.create(doc);
        return res.status(201).send('category created');
    }
    catch (err){
        return res.status(401).send(err);
    }

});
