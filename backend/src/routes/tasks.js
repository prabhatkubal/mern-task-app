const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.get('/', auth, taskController.list);
router.get('/:id', auth, taskController.getOne);

router.post('/', auth, taskController.create);
router.put('/:id', auth, taskController.update);

router.delete('/:id', auth, roles(['admin']), taskController.remove);

module.exports = router;
