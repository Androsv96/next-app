import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (!email.trim() || !email.includes('@') || !name || !message) {
      return res.status(422).json({ message: 'Invalid data' });
    }

    let mongoClient;
    try {
      mongoClient = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.wpbwc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Could not connect to database' });
    }
    const newMessage = { email, name, message };

    const DB = mongoClient.db();
    try {
      const result = await DB.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      mongoClient.close();
      return res.status(500).json({ error: 'Storing message failed' });
    }

    mongoClient.close();
    return res
      .status(401)
      .json({ message: 'Message sent succesfully', data: newMessage });
  }
};

export default handler;
