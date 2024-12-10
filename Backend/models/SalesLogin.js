const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
    trim: true
  },
  password: {
    type: String,
    required: true
  }
  // You can add more fields as needed, e.g., email, role, etc.
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's new or modified
    if (!this.isModified('password')) return next();

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain text password with the hashed one
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
UserSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const SalesUser = mongoose.model('SalesUser', UserSchema);
module.exports = SalesUser;