module.exports=function(app){

	app.all('/',function(req,res,next){
		req.session.view = req.session.view || 0;
		req.session.view++;
		res.send('I love U , Mary '+req.session.view);
	});


	app.all('/test/form',function(req,res,next){
		var str=JSON.stringify(req.body);
		str+=JSON.stringify(req.query);
		res.send(str);
	});
}