const express = require ('express');
const path = require('path');
const data = require('./db/db.json');
const app = express();
const api = require('./routes/index');
const PORT = process.env.port || 3001;
// import the feedback router


// Middleware: I will be serving the static files from a folder called public
const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req.method) {
      case 'GET': {
        console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      default:
        console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
    }
  
    next();
  };
app.use(clog);

// Middleware: for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /home or /notes routes'));

// html routes: home page and notes page
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html' )));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html' )));

// GET request
app.get('/api/db', (req, res) => {
    console.info(`${req.method} request received to get data`);

    return res.json(data);
});

//POST request
app.post('/api/reviews', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    let response;

    if (req.body?.product) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(`Review for ${response.data.product} has been added!`);
    } else {
        res.json('Request body ust at least contain a product name');
    }
    console.log(req.body);
});

app.get('*', (req, res) => 
    res.send(
        `Make a GET request using Insomnia to <a href="https://localhost:${PORT}/api/db">https://localhost:${PORT}/api/db</a>`
    )
);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
