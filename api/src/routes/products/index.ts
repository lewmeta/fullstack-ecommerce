import { Router } from "express";

// Products endpoints
const router = Router();

router.get('/', (req, res) => {
    console.log(req.params)
    res.send('This is a list of products')
})
router.post('/', (req, res) => {
    res.send('Create a products!')
})

router.get('/:id', (req, res) => {
    console.log(req.params)
    res.send('Product Id: 123')
})

export default router