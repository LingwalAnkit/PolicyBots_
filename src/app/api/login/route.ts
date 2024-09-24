import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database'; // Adjust the import based on your directory structure
import User from '../../../model/userModel'; // Adjust the import based on your directory structure
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect(); // Connect to the database

  const { email, password } = await req.json();

  // Input validation
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // If login is successful
    return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
