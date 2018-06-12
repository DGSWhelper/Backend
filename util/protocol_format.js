
//Protocol Format을 정의해놓은 파일

var user = {}

//Team Protocol

//team Error

user.error = (res,err) => {
  return res.send({
   "Code" : 200,
   "Desc" : err.message
 });
}

//Team Success

user.success = (res,rows) => {
  return res.send({
   "Code" : 201,
   "Desc" : "success",
   "Data" : rows
 });
}

module.exports={
  user:user
}
