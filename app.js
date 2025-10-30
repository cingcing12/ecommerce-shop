const express = require('express');
const session = require('express-session');
const mongoDB = require('mongoose');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: "your_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: false
    }
}))

const CateGories = new mongoDB.Schema({
    categoriesName: String,
    status: String,
    created: String
})

const categories = mongoDB.model('categories', CateGories);

const producttable = new mongoDB.Schema({
    nameProduct: String,
    imgURL: String,
    categories: String,
    size: String,
    brand: String,
    stock: Number,
    price: Number,
    created: String,
    des: String,
    status: String
})

const product = mongoDB.model("product", producttable);


const url = 'mongodb+srv://cing16339:1234@db-eccomerce.qts16aa.mongodb.net/?appName=DB-eccomerce';

mongoDB.connect(url)
    .then(() => {

        app.post('/addCategories', async (req, res) => {
            const { name, status, created } = req.body;
            try {
                const newData = new categories({ categoriesName: name, status: status, created: created });
                await newData.save();
                res.status(200).json({ data: newData, message: "Added categories!" });
                console.log(newData);
            } catch (err) {
                res.status(500).json({ err: err.message });
                console.log(name, status, created)
            }
        })

        app.get('/categories', async (req, res) => {
            try {
                const data = await categories.find();
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.delete('/deleteCate/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const del = await categories.findByIdAndDelete(id);
                res.status(200).json({ data: del, message: 'Deleted Sucessfully!' });

            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.put('/editCate/:idItem', async (req, res) => {
            try {
                const { idItem } = req.params;
                const { nameEdit, statusEdit, editCreate } = req.body;
                const dataEdit = await categories.findByIdAndUpdate(idItem, { name: nameEdit, status: statusEdit, created: editCreate }, { new: true });

                if (!dataEdit) {
                    return res.status(404).json("Not found!");
                }

                res.status(200).json({ data: dataEdit, message: "Update successfully!" });
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.get('/categoriesPublish', async (req, res) => {
            try {
                const data = await categories.find({ status: "Publish" });
                if (!data) {
                    return res.status(404).json("Not found!");
                }

                res.status(200).json({ data: data, target: 10 });
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.post('/addProduct', async (req, res) => {
            try {
                const { nameProduct, imgURL, productSelect, size, brand, stock, price, created, des , status} = req.body;
                const newData = new product({ nameProduct: nameProduct, imgURL: imgURL, categories: productSelect, size: size, brand: brand, stock: stock, price: price, created: created, des: des , status: status});
                await newData.save();
                res.status(200).json({data: newData, message: "Added product successfully!"});
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.get('/getproduct', async (req, res) => {
            try{
                const data = await product.find();
                if(!data){
                    return res.status(404).json("Not found!");
                }
                res.status(200).json(data);
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.delete('/deleteProduct/:id', async (req, res) => {
            try{
                const {id} = req.params;
                const del = await product.findByIdAndDelete(id);
                if(!del){
                    return res.status(404).json("Not Found!");
                }

                res.status(200).json({data: del, message: "Deleted successfully!"});
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.get('/productPublish', async (req, res) => {
            try{
                const data = await product.find({ status: "Publish" });
                if (!data) {
                    return res.status(404).json("Not found!");
                }

                res.status(200).json({ data: data, target: 1000 });
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })


        app.listen(port, () => {
            console.log(`MongoDb connected! http://localhost:${port}`);
        })
    })
    .catch(err => {
        console.error(err.message);
    })