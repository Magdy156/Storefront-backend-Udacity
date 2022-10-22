import { User, UserData} from "../../models/user"

const userData = new UserData()

describe("User Model", () => {
  const user: User = {
      id: "",
      first_name: "Magdy",
      last_name: "Hamdy",
      user_password: "magdy",
  }
 // adding user 
  async function create (user: User) {
    return userData.create(user)
  }
 // removing user
  async function deleteUser (id: string) {
    return userData.delete(id)
  }


  it("create method has to create a user", async () => {
    const newUser: User = await create(user)

    if (newUser) {
      const {first_name, last_name} = newUser

      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
    }

    await deleteUser(newUser.id)
  })

  it("index method has to return all of users", async () => {
    const newUser: User = await create(user)
    const allUsers = await userData.index()

    expect(allUsers).toEqual([newUser])

    await deleteUser(newUser.id)
  })

  it("show method has to return a specific user", async () => {
    const newUser: User = await create(user)
    const userFromDb = await userData.show(newUser.id)

    expect(userFromDb).toEqual(newUser)

    await deleteUser(newUser.id)
  })

  it("delete method has to remove the user", async () => {
    const createdUser: User = await create(user)

    await deleteUser(createdUser.id)

    const allUsers = await userData.index()

    expect(allUsers).toEqual([])
  })

  it("update method has to update the user", async () => {
    const newUser: User = await create(user)
    const newUserData: User = {
        first_name: "Malek",
        last_name: "Magdy",
        id: "",
        user_password: ""
    }

    const {first_name, last_name} = await userData.update(newUser.id, newUserData)

    expect(first_name).toEqual(newUserData.first_name)
    expect(last_name).toEqual(newUserData.last_name)

    await deleteUser(newUser.id)
  })

  it("authenticates the user with the first name and a password", async () => {
    const newUser: User = await create(user)

    const exsitingUserInDB = await userData.authenticate(user.first_name, user.user_password)

    if (exsitingUserInDB) {
      const {first_name, last_name} = exsitingUserInDB
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
    }

    await deleteUser(newUser.id)
  })
})