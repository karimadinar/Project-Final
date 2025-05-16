// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const House = require('../models/House');
const {authMiddleware} = require('../middleware/authMiddleware');


router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const favorites = await Favorite.find({ user: userId }).populate('house');
    
    
    const houses = favorites.map(fav => fav.house);

    res.json(houses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:houseId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const houseId = req.params.houseId;

   
    const houseExists = await House.findById(houseId);
    if (!houseExists) return res.status(404).json({ message: 'House not found' });

    
    const existing = await Favorite.findOne({ user: userId, house: houseId });
    if (existing) return res.status(400).json({ message: 'Already in favorites' });

    const favorite = new Favorite({ user: userId, house: houseId });
    await favorite.save();

    res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:houseId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const houseId = req.params.houseId;

    const deleted = await Favorite.findOneAndDelete({ user: userId, house: houseId });

    if (!deleted) return res.status(404).json({ message: 'Favorite not found' });

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
