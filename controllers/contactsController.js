const mongodb = require("../data/database.js")
const createObjectId = require('mongodb').ObjectId.createFromHexString;

const getContact = async (req, res) => {

    const userId = createObjectId(req.params.id);
    const result = await mongodb.getDb().db("project1").collection('contact').find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const getAllContacts = async (req, res) => {
    const result = await mongodb.getDb().db("project1").collection('contact').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db("project1").collection('contact').insertOne(contact);
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}

module.exports = {
    getContact,
    getAllContacts,
    createContact
}
