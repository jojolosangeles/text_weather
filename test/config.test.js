


it('should have DARK_SKY_API_KEY in environment', () => {
  var key = process.env.DARK_SKY_API_KEY
  if (key == null) {
    throw Error('DARK_SKY_API_KEY needs to be defined')
  }
})

it('should have MAPS_API_KEY in environment', () => {
  var key = process.env.MAPS_API_KEY
  if (key == null) {
    throw Error('MAPS_API_KEY needs to be defined')
  }
})
