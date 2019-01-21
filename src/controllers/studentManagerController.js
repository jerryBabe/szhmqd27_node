const path = require('path')
const template = require('art-template')
const basetool = require(path.join(__dirname,'../tools/basetools.js'))

const getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || ''

    databasetool.findMany('studentInfo',{name:{$regex:keyword}},(err,docs) => {
        const html = template(path.join(__dirname,"../public/views/list.html"),{students:docs,keyword})
        
        res.send(html)
    })
}

module.exports = {
    getStudentListPage
}