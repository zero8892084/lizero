var util=require('util');
var Rule=require('../Rule.js');
function RequireRule(cfg){
	Rule.call(this);
	this.name='require';
	this.desc='非空校验';
}
util.inherits(RequireRule,Rule);
//自行实现规则实体
RequireRule.prototype.rule=function(value){
	var flag;
	if(value){
		flag=true;
	}else{
		flag=false;
	}
	return flag;
}
module.exports=RequireRule;
