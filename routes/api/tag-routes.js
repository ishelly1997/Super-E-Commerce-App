const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const productTagData = await ProductTag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const productTagData = await ProductTag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!productTagData) {
      res.status(404).json({message: 'No Product Tag with that ID found'});
      return;
    }
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
//Create New Tag (Is this tag_id or ProductTag ID?)
  router.post('/', async (req, res) => {
    try {
      const locationData = await ProductTag.create({
        tag_id: req.body.tag_id
      });
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const productTagData = await ProductTag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productTagData) {
      res.status(404).json({ message: 'No Product Tag with that ID found!' });
      return;
    }

    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
