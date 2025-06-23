const express = require('express');
const router = express.Router();
const viaCepService = require('../services/viaCepService');

router.get('/:cep', async (req, res) => {
    const cep = req.params.cep;
    try {
        const addressData = await viaCepService.getAddressByCep(cep);
        res.json(addressData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch address data' });
    }
});

module.exports = router;