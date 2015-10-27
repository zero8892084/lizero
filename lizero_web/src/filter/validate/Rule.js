function Rule(){
	this.name = 'base';
	this.desc= '校验规则基类，无法直接使用';
}
//继承于这个类的方法应该重新定义这个方法
Rule.prototype.rule=function(value){
	return true;
}
//外部调用，做校验的时候使用这个方法，这个方法一般在子类中不需要重写
Rule.prototype.validate=function(value,errorMessage){
	var flag=this.rule(value);
	var msg='';
	if(!flag){
		msg=errorMessage;
	}
	return {
		flag:flag,
		message:msg,
		name:this.name
	};
}

module.exports=Rule;