const { Records } = require('../models');

const getAll = async (req, res) => {
    try {
      const userId = req.userId;
      const records = await Records.findAll({
        where: { userId: userId }
      });
      res.send({ error: false, message: 'Records fetched.', statusCode: 200, data: records });
    } catch (err) {
      res.status(500).send({ error: true, message: 'Error fetching records.', statusCode: 500, data: null });
    }
  };
  const getOne = async (req, res) => {
    try {
      const userId = req.userId;
      const { recordId } = req.params;
      const records = await Records.findOne({
        where: { userId: userId, id: recordId }
      });
      res.send({ error: false, message: 'Records fetched.', statusCode: 200, data: records });
    } catch (err) {
      res.status(500).send({ error: true, message: 'Error fetching records.', statusCode: 500, data: null });
    }
  };

const create = async (req, res) => {
  try {
    const userId = req.userId;
    const { data } = req.body;
    const record = await Records.create({ userId, data });
    res.status(201).send({ error: false, message: 'Record created.', statusCode: 201, data: record });
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error creating record.', statusCode: 500, data: null });
  }
};

const update = async (req, res) => {
  try {
    const userId = req.userId;
    const { recordId } = req.params;
    const { data } = req.body;
    const record = await Records.findOne({ where: { id: recordId, userId: userId } });
    if (record) {
      record.data = data;
      await record.save();
      res.send({ error: false, message: 'Record updated.', statusCode: 200, data: record });
    } else {
      res.status(404).send({ error: true, message: 'Record not found or user not authorized.', statusCode: 404, data: null });
    }
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error updating record.', statusCode: 500, data: null });
  }
};

const del = async (req, res) => {
  try {
    const userId = req.userId;
    const { recordId } = req.params;
    const record = await Records.findOne({ where: { id: recordId, userId: userId } });
    if (record) {
      await record.destroy();
      res.send({ error: false, message: 'Record deleted.', statusCode: 200, data: null });
    } else {
      res.status(404).send({ error: true, message: 'Record not found or user not authorized.', statusCode: 404, data: null });
    }
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error deleting record.', statusCode: 500, data: null });
  }
};

module.exports = { getAll, getOne, create, update, del };
