import { isAppConfigAvailable } from './config'

describe('isAppConfigAvailble test suite', () => {
  it('should return false when aws appconfig service is not availble', () => {
    const result = isAppConfigAvailable()
    expect(result).toBe(false)
  })
})
