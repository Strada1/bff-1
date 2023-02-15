const { DirectorModal } = require('../models/Director');

const createDirector = async (req, res) => {
  try {
    const doc = new DirectorModal({
      name: req.body.name,
    });

    await DirectorModal.create(doc); // добавляем документ

    return res.status(201).json({
      message: 'Success',
      name: doc.name,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAllDirectors = async (req, res) => {
  try {
    const allDirectors = await DirectorModal.find();
    return res.status(200).json(allDirectors);
  } catch (err) {
    return res.status(500).send(err);
  }
};
const updateDirector = async (req, res) => {
  try {
    const directorId = req.params.id;

    return DirectorModal.updateOne(
      { _id: directorId },
      {
        name: req.body.name,
      },
      res.json({
        success: true,
      }),
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

const removeDirectors = async (req, res) => {
  try {
    const directorId = req.params.id;

    return await DirectorModal.findOneAndDelete({ _id: directorId }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось удалить режиссера',
        });
      }
      if (!doc) {
        return res.status(400).json({
          message: 'Не удалось найти режиссера',
        });
      }
      return res.json({
        success: true,
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createDirector,
  updateDirector,
  removeDirectors,
  getAllDirectors,
};
