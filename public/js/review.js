const express = require('express'),
app = express()
var url = null

$('#go').click(function(){
     var query = $("#search").val()
     url = "https://www.ign.com/search?q=" + query
})

app.get("/gamereview", (req, res) => {
     res.redirect(url)
})

