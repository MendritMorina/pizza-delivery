const { httpCodes } = require('../config');
const {v4: uuidv4} = require('uuid');
const Order = require('../models/Order')

const stripe = require('stripe')("sk_test_51NBuvCG5tWLe1eZkK2PmPu7hd1Po823sR3QS81UOcDTcR1qqJB6Ifoh3LJrTY36kOJgxZAJxqQpzlYVEzzObzFTS00U2Jzfvbo")

const create = async (req,res) =>{
    try{
    const {token, subtotal,currentUser,cartItems}=req.body;

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
    })

    const payment = await stripe.charges.create({
        amount: subtotal*100,
        currency: 'USD',
        customer: customer.id,
        receipt_email: token.email,
    },{
        idempotencyKey: uuidv4()
    })

        // if(!payment){
        //     res.send('Payment failed')
        // }

        const order = new Order({
            name: currentUser.user.name,
            email: currentUser.user.email,
            user: currentUser.user._id,
            orderItems: cartItems,
            orderAmount: subtotal,
            shippingAddress:{
                street: token.card.address_line,
                city: token.card.address_city,
                country: token.card.address_country,
                pincode: token.card.address_zip,
            },
            transactionId: payment.source.id
        })


        order.save()
    res.status(httpCodes.OK).json({ success: true, message:'Payment Done', error: null });
        } catch (error) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }


}

const getUserOrders = async (req,res)=>{
    const { userid } = req.body;
    console.log(userid);
    try {
        const orders = await Order.find({ user: userid }).sort({ _id: -1 });
        res.status(httpCodes.OK).json({ success: true, orders, error: null });
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
}

module.exports = {create,getUserOrders}