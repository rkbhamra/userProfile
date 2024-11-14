const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:id', (req, res)=>{
    res.send('Show User ' + req.params.id);
});

router.get('/:id/edit', (req, res)=>{
    res.send('Edit User ' + req.params.id);
});

router.put('/:id', (req, res)=>{
    res.send('Update User ' + req.params.id);
});

router.delete('/:id', (req, res)=>{
    res.send('Delete User ' + req.params.id);
});

module.exports = router;