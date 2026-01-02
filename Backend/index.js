let http = require("http")
let server = http.createServer((rs,res)=>{
    res.end("welcome to ws");
})
server.listen("8000")