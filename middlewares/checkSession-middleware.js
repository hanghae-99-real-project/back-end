const getSession = (req, res, next) => {
    console.log("You Are In Get Session!")
    redisClient.get(`sess:${req.session.id}`, (err, data) => {
        if (err) res.json({ err })
        if (data) {
            res.send(genView(req.session.username, req.session.repos));
        } else {
            next()
        }
    })
}