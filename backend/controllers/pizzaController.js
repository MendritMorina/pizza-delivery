const Pizza = require('../models/Pizza')
const { httpCodes } = require('../config');

/**
 * @description Get all pizzas.
 */
const getAll = async (req, res) => {
    try {
        const pizzas = await Pizza.find({})
        res.status(httpCodes.OK).json({ success: true, pizzas, error: null });
    } catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
};

/**
 * @description Get one pizza.
 */
const getOne = async (req, res) => {
    try {
        const { pizzaId } = req.params;
        const pizza = await Pizza.findOne({ _id: pizzaId, })
        res.status(httpCodes.OK).json({ success: true, pizza, error: null });
    }catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
};

/**
 * @description Create a pizza.
 */
const create = async (req, res) => {
    try {
        console.log(req.body);
        const {name,image,description,category,prices} = req.body

        const pizza = new Pizza({
            name : name,
            image :image,
            varients : ['small','medium','large'],
            description : description,
            category : category,
            prices : [prices]
        })
        await pizza.save()
        res.status(httpCodes.CREATED).json({ success: true, pizza , error: null });
    } catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
}

/**
 * @description Update a pizza.
 */
const updateOne = async (req, res) => {
    try {
        const { pizzaId } = req.params;
        const { name, image, varients, description, category, prices } = req.body;

        const pizza = await Pizza.findOne({ _id: pizzaId });

        pizza.name = name;
        pizza.description = description;
        pizza.image = image;
        pizza.category = category;
        pizza.prices = [prices];

        await pizza.save();

        res.status(httpCodes.OK).json({ success: true, pizza, error: null });
    } catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
};


/**
 * @description Delete a pizza.
 */
const deleteOne = async (req,res) =>{
    try {
        const { pizzaId } = req.params;

        await Pizza.findOneAndDelete({_id : pizzaId})

        res.status(httpCodes.OK).json({ success: true, message:'Pizza deleted successfully', error: null });
    } catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
}
// Exports of this file.
module.exports = { getAll,getOne,create,updateOne, deleteOne };