const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const {
    Client,
    PrivateKey,
    AccountId,
    TopicMessageSubmitTransaction,
    TopicId,
    TransactionId
} = require('@hashgraph/sdk');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Hedera client setup
let client;
try {
    const accountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const privateKey = PrivateKey.fromStringECDSA(process.env.HEX_PRIVATE_KEY);
    
    if (process.env.HEDERA_NETWORK === 'mainnet') {
        client = Client.forMainnet();
    } else {
        client = Client.forTestnet();
    }
    
    client.setOperator(accountId, privateKey);
    console.log(`✅ Hedera client initialized for ${process.env.HEDERA_NETWORK}`);
    console.log(`📋 Account ID: ${process.env.MY_ACCOUNT_ID}`);
    console.log(`🔑 EVM Address: ${process.env.EVM_ADDRESS}`);
} catch (error) {
    console.error('❌ Failed to initialize Hedera client:', error);
    process.exit(1);
}

const topicId = TopicId.fromString(process.env.HEDERA_TOPIC_ID);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        network: process.env.HEDERA_NETWORK,
        timestamp: new Date().toISOString()
    });
});

// Submit message to HCS
app.post('/api/hcs/submit-message', async (req, res) => {
    try {
        const { message, metadata } = req.body;
        
        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        console.log(`📤 Submitting message to HCS topic ${topicId}`);
        
        // Create the transaction
        const transaction = new TopicMessageSubmitTransaction()
            .setTopicId(topicId)
            .setMessage(message);

        // Submit the transaction
        const txResponse = await transaction.execute(client);
        const receipt = await txResponse.getReceipt(client);
        
        const result = {
            status: 'success',
            transactionId: txResponse.transactionId.toString(),
            consensusTimestamp: receipt.consensusTimestamp?.toString(),
            topicId: topicId.toString(),
            message: message,
            metadata: metadata || {},
            submittedAt: new Date().toISOString()
        };

        console.log(`✅ Message submitted successfully: ${result.transactionId}`);
        res.json(result);

    } catch (error) {
        console.error('❌ Error submitting message to HCS:', error);
        res.status(500).json({
            error: 'Failed to submit message to HCS',
            details: error.message
        });
    }
});

// Get transaction details
app.get('/api/hcs/transaction/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        
        console.log(`🔍 Querying transaction: ${transactionId}`);
        
        // For now, return basic info since we can't easily query transaction details
        // In production, you'd use Mirror Node API for this
        res.json({
            transactionId: transactionId,
            status: 'submitted',
            note: 'Use Mirror Node API for detailed transaction information'
        });

    } catch (error) {
        console.error('❌ Error querying transaction:', error);
        res.status(500).json({
            error: 'Failed to query transaction',
            details: error.message
        });
    }
});

// Get topic messages (placeholder - would use Mirror Node API)
app.get('/api/hcs/topic/:topicId/messages', async (req, res) => {
    try {
        const { topicId } = req.params;
        const { limit = 10 } = req.query;
        
        console.log(`📋 Querying messages for topic: ${topicId}`);
        
        // Placeholder response - in production use Mirror Node API
        res.json({
            topicId: topicId,
            messages: [],
            note: 'Use Mirror Node API to retrieve topic messages'
        });

    } catch (error) {
        console.error('❌ Error querying topic messages:', error);
        res.status(500).json({
            error: 'Failed to query topic messages',
            details: error.message
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        details: error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Hedera service running on port ${PORT}`);
    console.log(`🌐 Network: ${process.env.HEDERA_NETWORK}`);
    console.log(`📋 Topic ID: ${process.env.HEDERA_TOPIC_ID}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Shutting down Hedera service...');
    if (client) {
        client.close();
    }
    process.exit(0);
});