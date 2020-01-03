const User = require('../models/user');
const bcrypt = require('bcryptjs'); 

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        throw new Error('User alredy exists!');
      }
      const user = await User.create(req.body);
      user.password = undefined;
      return res.status(201).send(user);
    } catch (err) {
      return res.status(400).send({ response: 'Registration failed', error: err.toString().split(': ')[1]});
    }
  },

  async index(req, res) {
    const users = await User.find();
    return res.status(users.length === 0 ? 204 : 200).send(users);
  },

  async delete(req, res) { 
    try {
      const user_id = req.params.id;
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        throw new Error('User not found!');
      }
      await User.deleteOne(user);
      return res.status(200).send({ response: `User ${user_id} successfully deleted!` });
    } catch(err) {
      return res.status(400).send({ response: 'Deletion failed', error: err.toString().split(': ')[1]});
    }
  },

  async find(req, res) {
    try {
      const user_id = req.params.id;
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        throw new Error('User not found!');
      }
      return res.status(200).send(user);
    } catch(err) {
      return res.status(400).send({ response: 'Operation failed', error: err.toString().split(': ')[1]});
    }
  },

  async update(req, res) {
    const { user_id, name, password } = req.body;
    const user = await User.findById(user_id);

    user.name = name;
    await user.save();
    return res.status(200).send(user);
  },

  async clear(req, res) {
    console.log('Hello');
    await User.deleteMany({});
    return res.status(200).send({ response: 'Users deleted' });
  }
};