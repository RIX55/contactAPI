const {
    Router
} = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("contactapi-storage-firebase.json");//serviceAccountKey.json

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'FIREBASE_DATABASE_KEY'//put your own database key
});

const db = admin.database();

router.get('/', (req, res) => {
    console.log('Server online');
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', {
            contacts: data
        });
    });
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res)=>{
    console.log(req.params.id);
    db.ref('contacts/'+ req.params.id).remove();
    res.redirect('/');
});

module.exports = router;