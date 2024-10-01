import dbConnect from '../../../lib/database';
import UserProfile from '../../../model/profileModel';

export default async function handler(req, res) {
  const { method } = req;

  console.log('API route hit. Method:', method);

  try {
    await dbConnect();
    console.log('Database connected successfully');

    switch (method) {
      case 'GET':
        try {
          const userProfiles = await UserProfile.find({});
          res.status(200).json({ success: true, data: userProfiles });
        } catch (error) {
          console.error('Error fetching user profiles:', error);
          res.status(400).json({ success: false, error: error.message });
        }
        break;
      case 'POST':
        try {
          console.log('Received POST data:', req.body);
          const userProfile = await UserProfile.create(req.body);
          console.log('User profile created:', userProfile);
          res.status(201).json({ success: true, data: userProfile });
        } catch (error) {
          console.error('Error creating user profile:', error);
          res.status(400).json({ success: false, error: error.message });
        }
        break;
      default:
        res.status(405).json({ success: false, error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}