const House = require('../models/House');


// Create new house
const createHouse = async (req, res) => {
  try {
    const newHouse = await House.create(req.body);
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHouses = async(req, res) => {
  try {
    const allHouses = await House.find();
    res.status(200).json(allHouses); 
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHouse = async (req, res) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteHouse = async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json({ message: 'House deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
  deleteHouse,

}