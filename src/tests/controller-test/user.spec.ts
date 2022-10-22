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

describe('Users controllers: ', () => {
    it('/user/create should return a user', () => {
        const data = {
            first_name: 'Magdy',
            last_name: 'Hamdy',
            user_password: 'magdy',
        }
        request
            .post('/user/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: "726e5e55-82f5-4cbe-9552-4998884d49b2",
                first_name: 'Magdy',
                last_name: 'magdy',
            })
    })

    it('/user/create should fail if required first name is not sent', () => {
        const data = {
            first_name: 'Magdy',
            last_name: 'Hamdy',
            user_password: 'magdy',
        }
        request
            .post('user/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/user/create should fail if required password is not sent', () => {
        const data = {
            first_name: 'Magdy',
            last_name: 'Hamdy',
            user_password: 'magdy',
        }
        request
            .post('/user/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/user/all should return all users', () => {
        request
            .get('/user/all')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    id: '726e5e55-82f5-4cbe-9552-4998884d49b2',
                    first_name: 'Magdy',
                    last_name: 'Hamdy',
                },
            ])
    })

    it('/user/one/:id should show a user', () => {
        request
            .get('/user/one/726e5e55-82f5-4cbe-9552-4998884d49b2')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: '726e5e55-82f5-4cbe-9552-4998884d49b2',
                first_name: 'Magdy',
                last_name: 'Hamdy',
                user_password:'$2b$10$Ze.7T.nioWrbFmNEB0cB4.RHdIas8LyBv8CitYvs2wcrLJl57F1L2',
            })
    })

    it('/user/update/:id should update a user', () => {
        const data = {
            first_name: "Nawal",
            last_name: "Moahmmed",
            user_password:"nawal"        
        }
        request
            .patch('/api/user/update/927e1378-daf6-4c8c-bbb5-b35a64682753')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: '927e1378-daf6-4c8c-bbb5-b35a64682753',
                first_name: 'Nawal',
                last_name: 'Moahmmed',
                user_password: '$2b$10$KEcrJl.ujGUMdpmStuCgluq9yNgpmbyLVKaKORqohNRx6aBmcu3eO',
            })
    })

    it('/user/delete/:id should delete a user', () => {
        request.delete('/user/927e1378-daf6-4c8c-bbb5-b35a64682753').expect(200).expect({
            status: 'Deleted user 927e1378-daf6-4c8c-bbb5-b35a64682753',
        })
    })
})