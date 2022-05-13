const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

app.listen(3003, function() {
    console.log('listening on 3003');
});

const conStr = "mongodb://localhost:27017";
const client = new MongoClient(conStr);

async function run() {
    try {
        await client.connect();

        const db = client.db("fashion");
        const customerCollection = db.collection("customers");
        const orderCollection = db.collection("orders");
        const styleCollection = db.collection("style");
        const designerCollection = db.collection("designers");

        const query = {customer_id: 1};

        app.get('/', async (req, res) => {

            let customer = null;
            let orders = [];

            if(req.query.customer_id) {
                const customer_id = req.query.customer_id;
                customer = await customerCollection.findOne({customer_id: parseInt(customer_id)});
                if(customer !== null) {
                    const rawOrders = await orderCollection.find({customer_id: parseInt(customer_id)}).toArray();

                    for (const rawOrder of rawOrders) {
                        let style = await styleCollection.findOne({item_id: parseInt(rawOrder.item_id)})
                        style["designer"] = await designerCollection.findOne({designer_id: parseInt(style.designer_id)});
                        rawOrder["style"] = style;
                        orders.push(rawOrder);
                    }
                }
            }

            res.render(__dirname + '/views/index.ejs', {customer, orders});
        });

    }catch (e) {
        
    }
}

run().catch(console.dir);