import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/deck'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const createNew = async (content) => {
//   const object = { content, important: false }
//   const response = await axios.post(baseUrl, object)
//   return response.data
// }

export default { getAll}