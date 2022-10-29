const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('simple node server is running');
});

const users = [
    { id: 1, name: 'Sakib', email: 'sakib@gmail.com' },
    { id: 2, name: 'Mushfiq', email: 'mushfiq@gmail.com' },
    { id: 3, name: 'Tamim', email: 'tamim@gmail.com' }
];

//todo username: dbuser1
// todo pass: EmeDbmGzMLJ1PAga



const uri = "mongodb+srv://dbuser1:EmeDbmGzMLJ1PAga@cluster0.qk4n58g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'Hinata Hyuga', email: 'hinata@naruto.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            console.log('this is post');
            const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result );
            user._id = result.insertedId;
            res.send(user);
        });
    }
    finally {

    }

}

run().catch(error => console.log(error))

// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase.indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// });

// app.post('/users', (req, res) => {
//     console.log('this is post');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// });

app.listen(port, () => {
    console.log('port is running on port: ', port);
})