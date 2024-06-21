const Menu = require('../../models/restaurant-related/menu-model')

exports.createMenu = async(req, res, next) => {
    try {
        const { items } = req.body
        if(items.length == 0) return res.status(400).json({ message: 'No items added to the menu' })
        const menu = await Menu.create({
            items: items,
            restaurant: null
        })
        res.status(200).json({ menu })
    }
    catch(err) {
        next(err)
    }
}

exports.getMenuById = async(req, res, next) => {
    try {
        const { id } = req.params
        const menu = await Menu.findById(id)
        if(!menu) return res.status(404).json({ message: 'No associated menu found' })
        res.status(200).json({ menu: menu.items })
    }
    catch(err) {
        next(err)
    }
}

exports.updateMenu = async (req, res, next) => {
    try {
        const { menuId } = req.params;
        const menu = await Menu.findById(menuId);
        if (!menu) return res.status(404).json({ message: 'No associated menu found' });
        const { items } = req.body;
        const notFoundItems = [];
        items.forEach(updatedItem => {
            const itemId = updatedItem._id;
            const item = menu.items.id(itemId);
            if (!item) {
                notFoundItems.push(itemId);
            } 
            else {
                Object.assign(item, updatedItem);
            }
        });
        if (notFoundItems.length > 0) {
            return res.status(404).json({ message: 'Some items not found', notFoundItems });
        }
        await menu.save();
        res.status(200).json({ menu });
    } 
    catch (err) {
        next(err);
    }
};
