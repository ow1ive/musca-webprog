import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const stripPassword = (user) => {
  if (!user) return user;

  const plainUser = user.toObject ? user.toObject() : user;
  // Keep responses clean by never returning the password field.
  // This mirrors the screenshot behavior where users are fetched without it.
  // eslint-disable-next-line no-unused-vars
  const { password, ...safeUser } = plainUser;
  return safeUser;
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(stripPassword(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(stripPassword(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (String(user.role || '').toLowerCase() === 'viewer') {
      return res.status(403).json({ message: 'Viewer accounts are not allowed to log in.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful.',
      token,
      type: user.role,
      firstName: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
