// src/routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Public: list and get (you may restrict later)
router.get('/', auth, taskController.list);
router.get('/:id', auth, taskController.getOne);

// Protected: create/update (authenticated)
router.post('/', auth, taskController.create);
router.put('/:id', auth, taskController.update);

// Delete: admin-only
router.delete('/:id', auth, roles(['admin']), taskController.remove);

module.exports = router;
