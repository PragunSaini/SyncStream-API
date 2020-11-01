// Trying out tests

describe('Index', () => {
  test('Sample test', () => {
    expect(true).toBe(true)
  })

  test('ENV test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})
