$A.ToolBar = Ext.extend($A.Component,{
	constructor: function(config) {
        $A.ToolBar.superclass.constructor.call(this, config);        
    },
    initComponent : function(config){
    	$A.ToolBar.superclass.initComponent.call(this, config);    	
    },
    initEvents : function(){
    	$A.ToolBar.superclass.initEvents.call(this); 
    }
})
$A.NavBar = Ext.extend($A.ToolBar,{
	constructor: function(config) {
        $A.NavBar.superclass.constructor.call(this, config);        
    },
    initComponent : function(config){
    	$A.NavBar.superclass.initComponent.call(this, config);
    	this.dataSet = $(this.dataSet);
    	this.navInfo = this.wrap.child('div[atype=displayInfo]');//Ext.get(this.infoId);
    	if(this.type != "simple"){
	    	this.pageInput = $(this.inputId);
	    	this.currentPage = this.wrap.child('div[atype=currentPage]');
	    	this.pageInfo = this.wrap.child('div[atype=pageInfo]');//Ext.get(this.pageId);
	
	    	if(this.comboBoxId){
	    		this.pageSizeInput = $(this.comboBoxId);
	    		this.pageSizeInfo = this.wrap.child('div[atype=pageSizeInfo]');
	    		this.pageSizeInfo2 = this.wrap.child('div[atype=pageSizeInfo2]');
	    		this.pageSizeInfo.update(_lang['toolbar.pageSize']);
	    		this.pageSizeInfo2.update(_lang['toolbar.pageSize2']);
	    	}
	    	this.pageInfo.update(_lang['toolbar.total'] + '&#160;&#160;' + _lang['toolbar.page']);
	    	this.currentPage.update(_lang['toolbar.ctPage']);
    	}
    },
    processListener: function(ou){
    	$A.NavBar.superclass.processListener.call(this,ou);
    	this.dataSet[ou]('load', this.onLoad,this);
    	if(this.type != "simple"){
	    	this.pageInput[ou]('keydown', this.onInputKeyPress, this);
	    	if(this.pageSizeInput){
	    		this.pageSizeInput[ou]('select', this.onInputSelect, this);
	    	}
    	}
    },
    initEvents : function(){
    	$A.NavBar.superclass.initEvents.call(this);    	
    },
    onLoad : function(){
    	this.navInfo.update(this.creatNavInfo());
    	if(this.type != "simple"){
	    	this.pageInput.setValue(this.dataSet.currentPage);
	    	this.pageInfo.update(_lang['toolbar.total'] + this.dataSet.totalPage + _lang['toolbar.page']);
	    	if(this.pageSizeInput&&!this.pageSizeInput.optionDataSet){
	    		var pageSize=[10,20,50,100];
	    		if(pageSize.indexOf(this.dataSet.pagesize)==-1){
	    			pageSize.unshift(this.dataSet.pagesize);
	    			pageSize.sort(function(a,b){return a-b});
	    		}
	    		var datas=[];
	    		while(Ext.isDefined(pageSize[0])){
	    			var ps=pageSize.shift();
	    			datas.push({'code':ps,'name':ps});
	    		}
	    		var dataset=new $A.DataSet({'datas':datas});
		    	this.pageSizeInput.setOptions(dataset);
		    	this.pageSizeInput.setValue(this.dataSet.pagesize);
	    	}
    	}
    },
    creatNavInfo : function(){
    	if(this.type == "simple"){
    		var html=[],ds=this.dataSet,currentPage=ds.currentPage,totalPage=ds.totalPage;
    		if(totalPage){
    			html.push('<span>共'+totalPage+'页</span>');
    			html.push(currentPage == 1 ? '<span>首页</span>' : this.createAnchor('首页',1));
    			html.push(currentPage == 1 ? '<span>上一页</span>' : this.createAnchor('上一页',currentPage-1));
    			for(var i = 1 ; i < 4 && i < totalPage ; i++){
    				html.push(i == currentPage ? '<b>' + currentPage + '</b>' : this.createAnchor(i,i));
    			}
    			if(totalPage > this.maxPageCount){
    				if(currentPage > 5)this.createSplit(html);
    				for(var i = currentPage - 1;i < currentPage + 2 ;i++){
    					if(i > 3 && i < totalPage - 2){
    						html.push(i == currentPage ? '<b>' + currentPage + '</b>' : this.createAnchor(i,i));
    					}
    				}
    				if(currentPage < totalPage - 4)this.createSplit(html);
    			}else if(totalPage > 6){
    				for(var i = 4; i < totalPage - 2 ;i++){
    					html.push(i == currentPage ? '<b>' + currentPage + '</b>' : this.createAnchor(i,i));
    				}
    			}
	    		for(var i = totalPage - 2 ; i < totalPage + 1; i++){
	    			if(i > 3){
    					html.push(i == currentPage ? '<b>' + currentPage + '</b>' : this.createAnchor(i,i));
	    			}
    			}
	    		html.push(currentPage == totalPage ? '<span>下一页</span>' : this.createAnchor('下一页',currentPage+1));
    			html.push(currentPage == totalPage ? '<span>尾页</span>' : this.createAnchor('尾页',totalPage));
    		}
    		return html.join('');
    	}else{
	    	var from = ((this.dataSet.currentPage-1)*this.dataSet.pagesize+1);
	    	var to = this.dataSet.currentPage*this.dataSet.pagesize;
	    	if(to>this.dataSet.totalCount) to = this.dataSet.totalCount;
	    	if(to==0) from =0;
	    	return _lang['toolbar.visible'] + from + ' - ' + to + ' '+ _lang['toolbar.total'] + this.dataSet.totalCount + _lang['toolbar.item'];
    	}
    },
    createAnchor : function(text,page){
    	return '<a href="javascript:$(\''+this.dataSet.id+'\').goPage('+page+')">'+text+'</a>';
    },
    createSplit : function(html){
    	html.push('<span>···</span>');
    },
    onInputKeyPress : function(input, e){
    	if(e.keyCode == 13){
    		var page = parseInt(input.getRawValue());
    		if(isNaN(page)){
    			input.setValue(this.dataSet.currentPage);
    		}else{
    			if(page>0 && page<=this.dataSet.totalPage) {
    				this.dataSet.goPage(page);
    			}else{
    				input.setValue(this.dataSet.currentPage);
    			}
    		}
    	}    	
    },
    onInputSelect : function(combo,value){
    	this.dataSet.pagesize=value;
    	this.dataSet.query();
    }
})