import express from 'express'

import productsRouter from './routes/products/index'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello wor ld!')
});

app.use('/products', productsRouter)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})