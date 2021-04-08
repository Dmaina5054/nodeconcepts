const http = require('http')
const path = require('path')
const fs = require('fs')


const server = http.createServer((req,res)=>{
    console.log(req.url)

    // if(req.url == '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),
    //     (err,content)=>{
    //         if (err){
    //             throw err;
    //         }

    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })
        
    // }

    // if(req.url == '/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),
    //     (err,content)=>{
    //         if (err){
    //             throw err;
    //         }
            
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })
        
    // }


    // if(req.url == '/api/users'){
    //     const users = [
    //         {name:'Bob smith', age:40},
    //         {name:'John', age: 50}
    //     ]
    //     res.writeHead(200, {'Content-Type':'application/json'})
    //     res.end(JSON.stringify(users));
        
    // }

    //build filepath

    let filePath = path.join(__dirname,'public', req.url === '/' ? 'index.html' : req.url)
    console.log(filePath)

    //get file extension to determine content
    let extname = path.extname(filePath)

    //initial content type
    let contentType = 'text/html'

    //check ext and set  content
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;

    }
//Read file
fs.readFile(filePath,(err,content)=>{
    if (err) {
        if(err.code == 'ENOENT'){
            //PAGE NOT FOUND
            fs.readFile(path.join(__dirname,'public','404.html'), (err, content)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(content,'utf-8');

            })
        }
        else {
            //some server error 500
            res.writeHead(500);
            res.end(`server error ${err.code}`);
        }
    }

    else {
        //success response
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content);
    }
});

});

//env setup completing

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})