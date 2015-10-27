var express = require('express'),
	routes = require('../route'),
	path = require('path'),
	ejs = require('ejs'),
	favicon = require('static-favicon'),
	logger = require('morgan'),
	bodyParser= require('body-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session);


function LizeroWebApp(cfg){
	this.cfg=cfg;
	this.expressApp=undefined;
}

LizeroWebApp.prototype.init=function(){
	var _th=this;
	var app = module.exports = express();
	//视图文件夹的根目录
	app.set('views',path.join(__dirname,'views'));
	//ejs引擎默认使用.ejs文件作为模板，这里指定.html作为模板
	//app.engine方法是指定某一后缀的文件使用何种方法处理
	app.engine('.html',ejs.__express);
	app.set('views engine','html');

	//开始指定中间件
	//图标
	app.use(favicon());
	//日志，这里选用开发模式
	app.use(logger('dev'));
	//指定http请求解析中间件
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	app.use(express.static(path.join(__dirname,'public')));

	app.use(session({
		secret:_th.cfg.sessionSecret,
		saveUninitialized: false, // don't create session until something stored
	    resave: false, //don't save session if unmodified
		store:new MongoStore({
			url:_th.cfg.storeUri,
			ttl:60*60 //mongodb 中session数据删除的时限，以秒为单位
		})
	}));

	routes(app);
	
	this.expressApp=app;	
	return this;
}

LizeroWebApp.prototype.listen=function(callback){
	return this.expressApp.listen(this.cfg.port,this.cfg.ip,function(){
		if( callback && typeof callback == 'function'){
			callback.apply(this,arguments);
		}
	});
}

LizeroWebApp.prototype.getConfig=function(){
	return this.cfg;
}

LizeroWebApp.prototype.getExpressApp=function(){
	return this.expressApp;
}
module.exports=LizeroWebApp;

console.log(process.cwd());
console.log(__dirname);







