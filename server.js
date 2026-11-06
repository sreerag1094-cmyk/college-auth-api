// require('dotenv').config();
// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors');


// const authRoutes = require('./routes/auth')
// const verifyToken = require('./middleware/auth')


// const app = express()
// // app.use(cors());
// app.use(express.json());


// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.error('MongoDB Connection Error:', err.message));


// app.use('/api/auth', authRoutes);


// // app.get('/api/protected', verifyToken, (req, res) => {
// //     res.json({
// //         message: 'Protected data access granted', userId: req.userId
// //     });

// // });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`));


// corrected code


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

 app.get('/api/protected', verifyToken, (req, res) => {
     res.json({
         message: 'Protected data access granted', userId: req.userId
     });})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');

        // Start Server after DB connection
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error.message);
    });
