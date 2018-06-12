
//Protocol Format을 정의해놓은 파일

var user = {}
var order = {}
//User Protocol

//User Error

user.error = (res,err) => {
  return res.send({
   "Code" : 200,
   "Desc" : err.message
 });
}

//User Success

user.success = (res,rows) => {
  return res.send({
   "Code" : 201,
   "Desc" : "success",
   "Data" : rows
 });
}

//User over
user.over = (res) => {
  return res.send({
   "Code" : 202,
   "Desc" : "User Over"
 });
}

//Order Error

order.error = (res,err) => {
  return res.send({
   "Code" : 300,
   "Desc" : err.message
 });
}

//Order Success

order.success = (res,rows) => {
  return res.send({
   "Code" : 301,
   "Desc" : "success",
   "Data" : rows
 });
}

order.notFound = (res) => {
  return res.send({
   "Code" : 302,
   "Desc" : "notFound"
 });
}

module.exports={
  user:user,
  order:order
}
