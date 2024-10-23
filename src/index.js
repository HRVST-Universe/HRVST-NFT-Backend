import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {config} from 'dotenv';
import nftRoutes from './routes/nftRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

//Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); 

//Rate limiting
const limiter = rateLimit(({
windowsMS: 15 * 60 * 1000, // 15 minutes
max: 100 // limit each IP to 100 requests per window
}));

app.use(limiter);

//Routes
app.use('./api/nft', nftRoutes);
app.use('./api/token', tokenRoutes);

//Error handling
app.use(err, req, res, next) => {
console.err(err.stack);
res.status(500).json({error : 'Something went wrong!'
});
});

app.listen(PORT, () => {
console.log('Server is running on port ${PORT}');
    });
    

