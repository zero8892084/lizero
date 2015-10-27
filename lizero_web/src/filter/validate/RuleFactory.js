var path = require('path'),
    fs   = require('fs');

var defaultPath='./defaultRules';
var ruleMap={};

function init(){
	fs.readdir(defaultPath,function(err,filePathArr){
		filePathArr.forEach(function(fileName){
			var filePath=path.join(defaultPath,fileName);
			fs.stat(filePath,function(err,fileStat){
				if(fileStat.isFile()){
					var Rule=require('./'+filePath);
					var rule=new Rule();
					ruleMap[rule.name]=rule;
					var result=rule.validate('123','error you saaa');
					console.log(result);
				}
			})
		});
	});
}
init();



