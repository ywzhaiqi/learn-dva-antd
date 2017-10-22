import Mock from 'mockjs'

let usersListData = Mock.mock({
  'data|80-100': [
    {
      'id': '@id',
      'name': '@name',
      'email': '@email',
      'website': '@url',
    }
  ]
})

let database = usersListData.data

function queryArray(array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

export default {
  ['GET /api/users'](req, res) {
    const { query } = req
    let { _limit: pageSize, _page: page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database

    let total = newData.length
    let data = newData.slice((page - 1) * pageSize, page * pageSize)

    res.append('x-total-count', newData.length)
    res.status(200).json(data)
  },

  ['DELETE /api/users/:id'](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`POST /api/users`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).json(newData)
  },

  [`PATCH /api/users/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let newItem = null

    database = database.map((item) => {
      if (item.id === id) {
        newItem = Object.assign({}, item, editItem)
        return newItem
      }
      return item
    })

    if (newItem) {
      res.status(201).json(newItem)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
