var LizeroWebApp=require('./src/init');

var config={
	sessionSecret:'LIZEROSSID',
	storeUri:'mongodb://localhost/lizero_web',
	port:8080,
	ip:'127.0.0.1'
}

var app=new LizeroWebApp(config);
app.init();
app.listen(function(){
	var port=this.address().port;
	var address=this.address().address;
	console.log(port+' and '+ address);
	//console.log(process.cwd());
	//console.log(__dirname);
});


//var server=app.listen(80,'101.200.90.121',function(){



