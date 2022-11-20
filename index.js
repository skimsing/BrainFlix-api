const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const videosRoutes = require('./routes/videosRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


//routes
app.use('/videos', videosRoutes);

//start server
app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`);
});