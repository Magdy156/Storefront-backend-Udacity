import { OrderData } from '../../models/order'
import { ProductStore } from '../../models/product'
import { UserData } from '../../models/user'

const orderData = new OrderData()
const productStore = new ProductStore()
const userData = new UserData()

// global variables
let productId: number, userId: string

describe('Order Model', () => {
    beforeAll(async () => {
        const product = await productStore.create({
            p_name: "Bike",
            price: 40
        })
        productId = product.id as number
        const user = await userData.create({
            id:'',
            first_name: 'Magdy',
            last_name: 'Hamdy',
            user_password: 'magdy'
        })
        userId = user.id as string
    })
   // should be excudted after all specs
    afterAll(async () => {
        await productStore.delete(productId)
        await userData.delete(userId)
    })

    it('create method has to create an order', async () => {
        const result = await orderData.create({
          products:[{
            product_id: productId,
            quantity: 10,
        }],
            user_id: userId,
            o_status: true,
        })
        expect(result).toEqual({
            id: 1,
            user_id: userId,
            o_status: true,
            products:[{
              product_id: productId,
              quantity: 10,
          }]
          })
        })
        
        it('index method has to return all of orders', async () => {
        const result = await orderData.index()
        expect(result).toEqual([
          {
            id: 1,
            user_id: userId,
            o_status: true,
            products:[{
                  product_id: productId,
                  quantity: 10,
                }]
              },
        ])
    })

    it('show method has to return a specific order', async () => {
      const result = await orderData.show(1)
      expect(result).toEqual({
        id: 1,
        user_id: userId,
        o_status: true,
        products:[{
          product_id: productId,
          quantity: 10,
        }]
      })
    })
    
    
    it('update method has to update order', async () => {
      const result = await orderData.update(1,{
  
        user_id: userId,
        o_status: false,
        products:[{
          product_id: productId,
          quantity: 10,
        }],
        
      })
      expect(result).toEqual({
        id: 1,
        user_id: userId,
        o_status: false,
        products:[{
          product_id: productId,
          quantity: 10,
        }]
      })
        })
   

    it('delete method has to remove order by id', async () => {
      await orderData.deleteOrder(1)
      const result = await orderData.index()
      expect(result).toEqual([])
    })
    
  })