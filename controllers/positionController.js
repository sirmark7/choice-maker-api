import Position from '../model/positionModel.js';
// Create a new position
export const createPosition = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newPosition = await Position.create({ name, categoryId });
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ error: 'Error creating position' });
  }
};

// Get all positions
export const getPositions = async (req, res) => {
  try {
    const positions = await Position.findAll();
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching positions' });
  }
};

// Get a position by ID
export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Position not found' });
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching position' });
  }
};

// Update a position
export const updatePosition = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Position not found' });

    position.name = name || position.name;
    position.categoryId = categoryId || position.categoryId;

    await position.save();
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ error: 'Error updating position' });
  }
};

// Delete a position
export const deletePosition = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Position not found' });

    await position.destroy();
    res.status(200).json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting position' });
  }
};
