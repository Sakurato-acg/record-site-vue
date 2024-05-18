const getYear = (head, fail) => {
  let year = []
  for (let index = fail; index <= head; index++) {
    year.unshift(index)
  }
  return year
}

export { getYear }
