import mongoose from 'mongoose';

const MONGOURI = 'mongodb+srv://nmaddp1995:nmaddp1995@old-book-lar9s.mongodb.net/old-book-db';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB !!');
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export default InitiateMongoServer;

