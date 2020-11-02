const { signToken, verifyToken } = require('./token')

describe('JWT Token', () => {
  const data = { name: 'Pragun', id: 1 }
  let token = 'wrongtoken'

  test('Generate signed token', () => {
    token = signToken(data)
    expect(token).toBeTruthy()
  })

  test('Correct token verification', () => {
    const verifiedData = verifyToken(token).data
    expect(verifiedData.name).toBe(data.name)
    expect(verifiedData.id).toBe(data.id)
  })

  test('Incorrect token verification', () => {
    token = 'wrongtoken'
    expect(() => verifyToken(token)).toThrow()
  })
})
