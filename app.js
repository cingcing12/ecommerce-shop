const express = require('express');
const session = require('express-session');
const mongoDB = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
}));

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

const adminSchema = new mongoDB.Schema({
    name: {type: String},
    email: {type: String, unique: true, lowercase: true, trim: true},
    phone: {type: String, unique: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
})

const adminUser = mongoDB.model("adminUser", adminSchema);


const url = 'mongodb+srv://cing16339:1234@db-eccomerce.qts16aa.mongodb.net/?appName=DB-eccomerce';

mongoDB.connect(url)
    .then(() => {

        // check login admin function
        const checkLoginAdmin = (req, res, next) => {
            if(!req.session.userAdmninId){
                return res.status(404).json('Please login admin first!');
            }
            next();
        }

        // auth admin login
        app.get('/authLoginAdmin', checkLoginAdmin, async (req, res) => {
            try{
                const adminId = await req.session.userAdmninId;
                const adminRole = await req.session.adminRole;
                const adminName = await req.session.adminName;
                res.status(200).json({adminId: adminId, adminName, adminName, adminRole: adminRole});
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.post('/createAdmin', async (req, res) => {
            try{
                const {name, email, phone, password, role} = req.body;
                const hashPassword = await bcrypt.hash(password, 13);
                const newAdmin = new adminUser({name: name, email: email, phone: phone, password: hashPassword, role: role});
                await newAdmin.save();
                res.status(200).json({data: newAdmin, message: "Added amin user successfully!"});
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.post('/loginAdmin', async (req, res) => {
            try{
                const {email, password} = req.body;
                const find = await adminUser.findOne({email: email});

                if(!find){
                    return res.status(404).json("Invalid email or password!");
                }
                const hashPassword = await bcrypt.compare(password, find.password);
                if(!hashPassword){
                    return res.status(404).json("Invalid email or password!");
                }

                req.session.userAdmninId = find._id;
                req.session.adminRole = find.role;
                req.session.adminName = find.name;

                console.log(req.session)
                res.status(200).json("Login successfully!");
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.post('/logoutAdmin', async (req, res) => {
            try{
                req.session.userAdmninId = false;
                req.session.adminName = false;
                req.session.adminRole = false;
                res.status(200).json('Logout successfully!');
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

        app.get('/getAdminuser', async (req, res) => {
            try{
                const data = await adminUser.find();
                if(!data){
                    return res.status(404).json("Not found!");
                }

                res.status(200).json(data);
            }catch(err){
                res.status(500).json({err: err.message});
            }
        })

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
                const dataEdit = await categories.findByIdAndUpdate(idItem, { categoriesName: nameEdit, status: statusEdit, created: editCreate }, { new: true });

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
                const { nameProduct, imgURL, productSelect, size, brand, stock, price, created, des, status } = req.body;
                const newData = new product({ nameProduct: nameProduct, imgURL: imgURL, categories: productSelect, size: size, brand: brand, stock: stock, price: price, created: created, des: des, status: status });
                await newData.save();
                res.status(200).json({ data: newData, message: "Added product successfully!" });
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.get('/getproduct', async (req, res) => {
            try {
                const data = await product.find();
                if (!data) {
                    return res.status(404).json("Not found!");
                }
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.delete('/deleteProduct/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const del = await product.findByIdAndDelete(id);
                if (!del) {
                    return res.status(404).json("Not Found!");
                }

                res.status(200).json({ data: del, message: "Deleted successfully!" });
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.get('/productPublish', async (req, res) => {
            try {
                const data = await product.find({ status: "Publish" });
                if (!data) {
                    return res.status(404).json("Not found!");
                }

                res.status(200).json({ data: data, target: 1000 });
            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.get('/getProductCategories', async (req, res) => {
            try {
                const cateData = await categories.find({ status: "Publish" });
                const productData = await product.find({ status: "Publish" });

                const newData = cateData.map(item => {
                    const filter = productData.filter(dataFind => dataFind.categories.toLowerCase().includes(item.categoriesName.toLowerCase()));

                    return{
                        categoriesName: item.categoriesName,
                        products: filter
                    }
                })
                res.json(newData)

            } catch (err) {
                res.status(500).json({ err: err.message });
            }
        })

        app.put('/updateProduct/:idEdit', async (req, res) => {
            try{
                const {idEdit} = req.params;
                const { nameProduct, imgURL, productSelect, size, brand, stock, price, created, des, status } = req.body;
                const dataUPdate = await product.findByIdAndUpdate(idEdit, 
                    { nameProduct: nameProduct, imgURL: imgURL, categories: productSelect, size: size, brand: brand, stock: stock, price: price, created: created, des: des, status: status },
                    {new: true}
                );

                res.status(200).json({ data: dataUPdate, message: "Product updated successfully!" });
            }catch(err){
                res.status(500).json({ err: err.message });
            }
        })


        app.listen(port, () => {
            console.log(`MongoDb connected! http://127.0.0.1:${port}`);
        })
    })
    .catch(err => {
        console.error(err.message);
    })