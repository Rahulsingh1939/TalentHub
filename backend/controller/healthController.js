const healthController = (req,res) =>  {
    try{
            res.json({
                status:'OK',
                Message : 'EveryThing Fine'
            })
            
    } catch(err)
    {
        console.log(err);
        res.sendFile(__dirname+'/error.html')
    }
}

module.exports = healthController