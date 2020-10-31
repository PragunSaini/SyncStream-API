// Trying out tests

describe('Index', () => {
  test('Just like that', () => {
    expect(true).toBe(true)
  })

  test('ENV test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})
