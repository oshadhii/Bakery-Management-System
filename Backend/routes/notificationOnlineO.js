// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/onlineOrderNotification');

// POST /notifications
router.post('/', async (req, res) => {
  const { message, time } = req.body;

  try {
    const newNotification = new Notification({ message, time });
    await newNotification.save();
    
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification: newNotification,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
    });
  }
});

module.exports = router;
