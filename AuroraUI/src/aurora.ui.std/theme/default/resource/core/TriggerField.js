/**
 * @class Aurora.TriggerField
 * @extends Aurora.TextField
 * <p>触发类组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$A.TriggerField = Ext.extend($A.TextField,{
	constructor: function(config) {
        $A.TriggerField.superclass.constructor.call(this, config);
    },
    initComponent : function(config){
    	$A.TriggerField.superclass.initComponent.call(this, config);
    	this.trigger = this.wrap.child('div[atype=triggerfield.trigger]'); 
    	this.initPopup();
    },
    initPopup: function(){
    	if(this.initpopuped == true) return;
    	this.popup = this.wrap.child('div[atype=triggerfield.popup]');
    	this.shadow = this.wrap.child('div[atype=triggerfield.shadow]');
//    	var sf = this;
    	Ext.getBody().insertFirst(this.popup)
    	Ext.getBody().insertFirst(this.shadow)    	
//    	Ext.onReady(function(){
//    		Ext.getBody().appendChild(sf.popup);
//    		Ext.getBody().appendChild(sf.shadow)
//    	})
		
    	this.initpopuped = true
    },
    initEvents : function(){
    	$A.TriggerField.superclass.initEvents.call(this);    
    	this.trigger.on('click',this.onTriggerClick, this, {preventDefault:true})
    },
    /**
     * 判断当时弹出面板是否展开
     * @return {Boolean} isexpanded 是否展开
     */
    isExpanded : function(){ 
    	var xy = this.popup.getXY();
    	return !(xy[0]==-1000||xy[1]==-1000)
//        return this.popup && this.popup.isVisible();
    },
    setWidth: function(w){
		this.wrap.setStyle("width",(w+3)+"px");
		this.el.setStyle("width",(w-20)+"px");
	},
    onFocus : function(){
    	if(this.readonly) return;
        $A.TriggerField.superclass.onFocus.call(this);
        if(!this.isExpanded())this.expand();
    },
    onBlur : function(){
//    	if(!this.isExpanded()){
	    	this.hasFocus = false;
	        this.wrap.removeClass(this.focusCss);
	        this.fireEvent("blur", this);
//    	}
    },
    onKeyDown: function(e){
    	$A.TriggerField.superclass.onKeyDown.call(this,e);
    	if(e.browserEvent.keyCode == 9 || e.keyCode == 27) {
        	if(this.isExpanded()){
	    		this.collapse();
	    	}
        }
    },
    isEventFromComponent:function(el){
    	var isfrom = $A.TriggerField.superclass.isEventFromComponent.call(this,el);
    	return isfrom || this.popup.contains(el);
    },
	destroy : function(){
		if(this.isExpanded()){
    		this.collapse();
    	}
    	this.trigger.un('click',this.onTriggerClick, this)
    	delete this.trigger;
    	delete this.popup;
    	$A.TriggerField.superclass.destroy.call(this);
	},
    triggerBlur : function(e){
    	if(!this.popup.contains(e.target) && !this.wrap.contains(e.target)){    		
            if(this.isExpanded()){
	    		this.collapse();
	    	}	    	
        }
    },
    setVisible : function(v){
    	$A.TriggerField.superclass.setVisible.call(this,v);
    	if(v == false && this.isExpanded()){
    		this.collapse();
    	}
    },
    /**
     * 折叠弹出面板
     */
    collapse : function(){
    	Ext.get(document.documentElement).un("mousedown", this.triggerBlur, this);
    	this.popup.moveTo(-1000,-1000);
    	this.shadow.moveTo(-1000,-1000);
    },
    /**
     * 展开弹出面板
     */
    expand : function(){
//    	Ext.get(document.documentElement).on("mousedown", this.triggerBlur, this, {delay: 10});
    	Ext.get(document.documentElement).on("mousedown", this.triggerBlur, this);
    	var xy = this.wrap.getXY();
    	this.popup.moveTo(xy[0],xy[1]+23);
    	this.shadow.moveTo(xy[0]+3,xy[1]+26);
    },
    onTriggerClick : function(){
    	if(this.readonly) return;
    	if(this.isExpanded()){
    		this.collapse();
    	}else{
	    	this.el.focus();
    		this.expand();
    	}
    }
});