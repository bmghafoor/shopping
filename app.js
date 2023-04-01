const express = require('express');
const items = require('/fakeDb')
const app = express();


class ExpressError extends Error {
    constructor(message,status){
        super();
        this.message = message
        this.status = status
        console.error(this.stack)
    }
}

class Item {
    constructor(name,price) {
        this.name = name
        this.price = price

        items.push(this)
    }

    static returnItem(name){
        const returnedItem = items.find(n => n.name === name)
        return returnedItem
    }

    static returnAllItems(){
        return items
    }

    static updateItem(name, data){
        item1 = Item.find(name)
        item1.name = data.name
        item1.price = data.price

        return item1
    }

    static deleteItem(name) {
        let itemId = items.findIndex(n => n.name === name)
        items.splice(itemId, 1)
    }
}


// route for getting all items
app.get('/items', function(req, res,next){
    return res.send({items: Item.returnAllItems()})
})


// route for getting an item
app.get('/items/:name', function(req, res, next){
    let item1 = Item.returnItem(req.params.name)
    return res.send({item:item1})
})

// route for posting an item
app.post('/items', function(req,res,next){
    let item1 = new Item(req.body.name,req.body.price)
    return res.send({item:item1})
})

// route for updating an item
app.patch('/items/:name', function(req,res,next){
    item1 = Item.updateItem(req.params.name, req.body)
})

// route for deleting an item
app.delete('/items/:name', function(req, res, next){
    Item.deleteItem(req.params.name)
    return res.send({message: `${req.params.name} Deleted`})
})



app.listen(3000,function(){
    console.log('App on Port 3000')
})  

