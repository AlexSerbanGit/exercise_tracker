const router = require('express').Router();
let AuthUser = require('../models/auth_user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = router;