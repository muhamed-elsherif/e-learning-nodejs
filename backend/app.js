app =require("./server/server")

PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is working at port: ${PORT}\nVisit: http://127.0.0.1:${PORT}`)
})