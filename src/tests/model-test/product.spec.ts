import {MainProduct,Product, ProductStore} from "../../models/product"

const productStore = new ProductStore()

describe("Product Model", () => {
  const product: MainProduct = {
      p_name: "CodeMaster 3000",
      price: 2000,
  }
 // adding product
  async function createProduct (product: MainProduct) {
    return productStore.create(product)
  }
 // removing
  async function deleteProduct (id: number) {
    return productStore.delete(id)
  }

  it("create method has to add a product", async () => {
    const createdProduct: Product = await createProduct(product)

    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product
    })

    await deleteProduct(createdProduct.id)
  })

  it("index method has to return all of products", async () => {
    const createdProduct: Product = await createProduct(product)
    const productList = await productStore.index()

    expect(productList).toEqual([createdProduct])

    await deleteProduct(createdProduct.id)
  })

  it("show method has to return a specific product", async () => {
    const createdProduct: Product = await createProduct(product)
    const productFromDb = await productStore.show(createdProduct.id)

    expect(productFromDb).toEqual(createdProduct)

    await deleteProduct(createdProduct.id)
  })

  it("update method has to update the product", async () => {
    const createdProduct: Product = await createProduct(product)
    const newProductData: MainProduct = {
      p_name: "CodeMaster 9999",
      price: 9999
    }

    const {p_name, price} = await productStore.update(createdProduct.id, newProductData)

    expect(p_name).toEqual(newProductData.p_name)
    expect(price).toEqual(newProductData.price)

    await deleteProduct(createdProduct.id)
  })

  it("delete method has to remove the product", async () => {
    const createdProduct: Product = await createProduct(product)

    await deleteProduct(createdProduct.id)

    const productList = await productStore.index()

    expect(productList).toEqual([])
  })
})