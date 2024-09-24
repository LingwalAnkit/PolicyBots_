import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database'; // Adjust the import based on your directory structure
import User from '../../../model/userModel'; // Adjust the import based on your directory structure
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect(); // Connect to the database

  const { firstName, lastName, email, password, age, mobileNo } = await req.json();

  // Input validation
  if (!firstName || !lastName || !email || !password || !age || !mobileNo) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      MobileNo: mobileNo, // Ensure the field matches your schema
    });

    await newUser.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
