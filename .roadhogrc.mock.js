
// export default {
//   // // http://jsonplaceholder.typicode.com/users
//   '/api/users': require('./mock/users.json'),
// }a

// https://github.com/zuiidea/antd-admin/blob/master/.roadhogrc.mock.js
const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
	Object.assign(mock, require('./mock/' + file))
})

module.exports = mock
