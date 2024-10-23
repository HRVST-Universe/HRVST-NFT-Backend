import logger from '../utils/logger.js';
import {getTokenProgram} from '../utils/solanaClient.js';

export const createToken = async (req,res) => {
try {

const { name, symbol, intialSupply } = req.body;

const program = await getTokenProgram();

const token = await program.mint({

name;
symbol;
initalSupply;

});

logger.info('Token created: ${token.address});

res.json({ success: true, token, });
} catch (error) {
logger.error('Create Token error: ', error);
res.status(500).json({error: error.message});

}
};

export const airdropToken = async (req,res) => {

try{

const(recipient,amount) = req.body;
const program = await getTokenProgram();
const tx = await program.transfer(recipient,amount);

logger.info('Tokens airdropped to ${recipient}');

res.json({success: true, transaction: tx });
} catch (error) {
logger.error('Airdrop token error: ', error);
res.status(500).json({error : error.message});
}
}
};


