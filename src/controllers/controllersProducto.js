const path = require('path');
const fs = require('fs');

let platos =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','models','platos.json')));

module.exports = {
    index: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'productos'),{platos});
    }
}