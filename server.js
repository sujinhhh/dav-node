const express = require('express')
const app = express()
const path = require('path');
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built -in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/resister', require('./routes/resister'))
app.use('/auth', require('./routes/auth'))
app.use('/employees', require('./routes/api/employees'))


app.get('/hello(.html)?', (req, res, next) => {
    next()
}, (req, res) => {
    res.send('hello')
})

// Route handlers

const one = (req, res, next) => {
    console.log('one');
    next();

}
const two = (req, res, next) => {
    console.log('one');
    next();

}
const three = (req, res, ) => {
    console.log('one');
    next();

}
app.get('/chain(.html)?', [one, two, three])


app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not found' })
    } else {
        res.type('txt').send('404 Not found')
    }
})

app.use(errorHandler);


app.listen(PORT, () => console.log(`ㅇㅏ싸라비아 서버가 ${PORT}에 열렸지롱`)
)


