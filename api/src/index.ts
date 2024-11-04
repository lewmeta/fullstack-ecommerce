import express, { json, urlencoded } from 'express'

import productsRouter from './routes/products/index'

const port = 3000

const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (req, res) => {
    res.send('Hello wor ld!')
});

app.use('/products', productsRouter)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})