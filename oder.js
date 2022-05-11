// this is the equivalent of 'use' in the mongo shell
db = db.getSiblingDB("fashionItem")

// this first collection has a validator, your project only requires _one_
db.createCollection("manufacturers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "name", "address" ],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        // we make use of MongoDBs ability to store nested objects
        address: {
          bsonType: "object",
          required: [ "street", "city", "state", "zip" ],
          properties: {
            // this is an optional property for extra street information (apartment number, etc)
            additional: {
              bsonType: "string",
              description: "must be a string if the field exists"
            },
            street: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            city: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            state: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            zip: {
              bsonType: "string",
              description: "must be a string and is reuired"
            }
          }
        },
        phone: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
})

// these collections _do not_ have validators
db.createCollection("customers")
db.createCollection("parts")
db.createCollection("orders")
