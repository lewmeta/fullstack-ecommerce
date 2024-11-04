import { Request, Response} from "express"

export function listProducts(req:Request, res:Response) {
    console.log(req.params)
    res.send('This is a list of products')
}

export function getProductById(req:Request, res:Response) {
    res.send('getProductById')
}

export function createProduct(req:Request, res:Response) {
    res.send('createProduct')
}

export function updateProduct(req:Request, res:Response) {
    res.send('updateProduct!')
}

export function deleteProduct(req:Request, res:Response) {
    res.send('deleteProduct')
}