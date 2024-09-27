import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database';
import User from '../../../model/userModel';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    console.log('Starting user registration process');

    await dbConnect();
    console.log('Database connected successfully');

    const body = await req.json();
    console.log('Received data:', body);

    const { firstName, lastName, email, password, age, mobileNo } = body;

    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'age', 'mobileNo'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json({ message: 'All fields are required', missingFields }, { status: 400 });
    }

    // Input validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    if (isNaN(age) || age < 18 || age > 120) {
      return NextResponse.json({ message: 'Invalid age' }, { status: 400 });
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      return NextResponse.json({ message: 'Invalid mobile number format' }, { status: 400 });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age: Number(age),
        mobileNo: String(mobileNo),
      });

      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser);
      return NextResponse.json({ success: true }, { status: 201 });

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return NextResponse.json({ message: 'Database operation failed', error: dbError.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in user registration:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}