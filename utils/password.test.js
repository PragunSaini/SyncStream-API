const { checkPassword, hashPassword } = require('./password')

describe('Password hashing', () => {
  const password = 'JingleBellsJingleBells'
  const wrongPassword = 'wakemeupbeforeyougogo'

  test('Password is hashed', async () => {
    const hash = await hashPassword(password)
    expect(hash).toBeDefined()
  })

  test('Correct Password', async () => {
    const hash = await hashPassword(password)
    const res = await checkPassword(password, hash)
    expect(res).toBe(true)
  })

  test('Inorrect Password', async () => {
    const hash = await hashPassword(password)
    const res = await checkPassword(wrongPassword, hash)
    expect(res).toBe(false)
  })
})
