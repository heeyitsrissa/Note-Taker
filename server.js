const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const noteRouter = require('./routes/db.js');
const apiRoutes = require('./routes/apiroutes.js')
// middleware

app.use (express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/api/notes', noteRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);