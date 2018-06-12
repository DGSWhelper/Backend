const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const verifyMiddleware = (req, res, next) => {
  
  if (req.cookies['x-access-token'] === undefined) {
    return res.send({
      Code: 0,
      Desc: 'not logged in'
    });
  }

  const token = JSON.parse(req.cookies['x-access-token'])

  const verify = new Promise(
    (resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    }
  )

  const onError = (error) => {
    res.send({
      Code: 1,
      Desc: error.message
    })
  }

  //decoded에 idx에 user의 idx값 저장됨

  verify.then((decoded) => {
    req.user = decoded
    next()
  }).catch(onError)
}

module.exports = verifyMiddleware
