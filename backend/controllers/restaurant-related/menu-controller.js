const Menu = require('../../models/restaurant-related/menu-model')

exports.createMenu = async(req, res, next) => {
    try {
        const { items } = req.body
        if(items.length == 0) return res.status(400).json({message: 'No items added to the menu'})
        const menu = await Menu.create({
            items: items,
            restaurant: null
        })
        res.status(200).json({message: menu})
    }
    catch(err) {
        next(err)
    }
}

exports.getMenuById = async(req, res, next) => {
    try {
        const { id } = req.params
        const menuCard = await Menu.findById(id)
        if(!menuCard) return res.status(404).json({message: 'No associated menu found'})
        res.status(200).json({ menu: menuCard.items })
    }
    catch(err) {
        next(err)
    }
}