import supertest from 'supertest'
import app from '../../server'
import { produceToken } from '../../services/produceToken'
const request = supertest(app)

const token = produceToken({
    first_name: 'Magdy',
    last_name: 'Hamdy',
    id: '726e5e55-82f5-4cbe-9552-4998884d49b2',
    user_password: 'magdy'
})


describe('Orders controllers: ', () => {
    it('/order/create should return a new order ', () => {
        const data = {
            products:[
                {
                    product_id: 7,
                    quantity: 159357
                }
            ],
            o_status: false,
            user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2"
        }
        request
            .post('/order/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2",
                o_status: false,
                products: [
                    {
                        product_id: 7,
                        quantity: 159357
                    }
                ]
            })
    })

    

    it('/order/create should fail if user_id is not included in parameters', () => {
        const data = {
            products:[
                {
                    product_id: 7,
                    quantity: 159357
                }
            ],
            o_status: false,
           
        }
        request
            .post('/order/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing one or more required parameters',
            })
    })

    it('/order/create should fail if status is not included in parameters', () => {
        const data = {
            products:[
                {
                    product_id: 7,
                    quantity: 159357
                }
            ],
            
            user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2"
        }
        request
            .post('/order/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing one or more required parameters',
            })
    })

    it('/order/all should show all orders', () => {
        request
            .get('/order/all')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                
                    id: 1,
                    user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2",
                    o_status: false,
                    products: [
                        {
                            product_id: 7,
                            quantity: 159357
                        }
                    ]
                
                
            })
    })

    it('/order/one/:id show a order', () => {
        request
            .get('order/one/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2",
                o_status: false,
                products: [
                    {
                        product_id: 7,
                        quantity: 159357
                    }
                ]
            })
    })

    it('/order/update should update an order', () => {
        const data = {
            products:[
                {
                    product_id: 7,
                    quantity: 10000
                }
            ],
            o_status: false,
            user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2"
        }
        request
            .patch('/order/update/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: "726e5e55-82f5-4cbe-9552-4998884d49b2",
                o_status: false,
                products: [
                    {
                        product_id: 7,
                        quantity: 1000
                    }
                ]
            })
    })

    it('/order/:id should delete an order given its id', () => {
        request
            .delete('/order/delete/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'in progress',
            })
    })

})