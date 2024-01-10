import express from 'express';
import User from '../models/user';

export const UserPersonalController = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required in the request body' });
      return;
    }


    const user = await User.findByPk(userId)


    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return user details
    res.status(200).json({
      ...user.dataValues
    });
    return;
  } catch (error) {
    console.error('Error in UserPersonalController:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
