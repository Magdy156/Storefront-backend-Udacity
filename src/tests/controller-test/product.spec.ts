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


describe('Product controllers: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            p_name: 'Bike',
            price: 155
        }
        request
            .post('product/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                p_name: 'Bike',
                price: 155
            })
    })

    it('create product should fail if name is not included in parameters', () => {
        const data = {
            p_name:'',
            price: 40
        }
        request
            .post('/product/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Error: Product name is required',
            })
    })

    it('should show all products', () => {
        request
            .get('/product/all')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                p_name: 'Bike',
                price: 155
            })
    })

    it('should show a product given an id', () => {
        request
            .get('product/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                name: 'Bike',
                price: 155
            })
    })

    it('should have an update product endpoint', () => {
        const data = {
            name: 'car',
            price: 500,
        }
        request
            .put('/product/update/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                p_name: 'car',
                price: 500
            })
    })

    it('should delete a product given its id', () => {
        request
            .delete('/product/delete/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/product/all').expect({})
            })
    })
})