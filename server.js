const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import the NFT routes
const nftRoutes = require('./routes/nft');
app.use('/api/nft', nftRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
