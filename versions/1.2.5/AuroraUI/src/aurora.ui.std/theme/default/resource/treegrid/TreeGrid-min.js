$A.TreeGrid=Ext.extend($A.Grid,{initComponent:function(c){$A.TreeGrid.superclass.initComponent.call(this,c);if(this.lockColumns.length>0){var d=this;var b=d.id+"_lb_tree";d.lb.set({id:b});delete c.marginheight;delete c.marginwidth;var e=d.createTreeConfig(c,d.lockColumns,b,true,d);d.lockTree=new $A.Tree(e);d.lb.addClass("item-treegrid");d.lockTree.body=d.lb;d.lockTree.treegrid=d;d.lockTree.on("render",function(){d.processData();Ext.DomHelper.insertHtml("beforeEnd",d.lb.dom,'<div style="height:17px"></div>')},d);this.lockTree.on("expand",function(g,h){var h=this.unlockTree.getNodeById(h.id);h.expand()},this);this.lockTree.on("collapse",function(g,h){var h=this.unlockTree.getNodeById(h.id);h.collapse()},this)}var f=this.id+"_ub_tree";this.ub.set({id:f});var a=this.createTreeConfig(c,this.unlockColumns,f,this.lockColumns.length==0,this);this.unlockTree=new $A.Tree(a);this.ub.addClass("item-treegrid");this.unlockTree.body=this.ub;this.unlockTree.treegrid=this;this.unlockTree.on("render",this.processData,this)},initTemplate:function(){$A.TreeGrid.superclass.initTemplate.call(this);this.cbTpl=new Ext.Template('<center style="width:{width}px"><div class="{cellcls}" style="height:13px;padding:0px;" id="'+this.id+'_{name}_{recordid}"></div></center>')},createTemplateData:function(b,a){return{width:b.width-2,recordid:a.id,visibility:b.hidden===true?"hidden":"visible",name:b.name}},createTreeConfig:function(b,e,h,a,d){var g=e[0];var f=(g)?g.width:150;return Ext.apply(b,{sw:20,id:h,showSkeleton:a,width:f,column:g,displayfield:g.name,renderer:g.renderer,initColumns:function(l){if(l.isRoot()&&l.ownerTree.showRoot==false){return}for(var k=0;k<e.length;k++){var o=e[k];if(o.name==l.ownerTree.displayfield){continue}var n=document.createElement("td");n._type_="text";n.atype="grid-cell";n.dataindex=o.name;n.recordid=l.record.id;if(o.align){n.style.textAlign=o.align}l.els[o.name+"_td"]=n;var j=d.createCell(o,l.record,false);var m=Ext.DomHelper.insertHtml("afterBegin",n,j);Ext.fly(n).setWidth(o.width-2);l.els[o.name+"_text"]=m;n.appendChild(l.els[o.name+"_text"]);n.className="node-text";l.els.itemNodeTr.appendChild(l.els[o.name+"_td"])}},createTreeNode:function(c){return new $A.Tree.TreeGridNode(c)},onNodeSelect:function(c){c.itemNodeTable.style.backgroundColor="#dfeaf5"},onNodeUnSelect:function(c){c.itemNodeTable.style.backgroundColor=""}})},processData:function(b,c){if(!c){return}var d=[];var a=this.dataset.data;if(b.showRoot){this.processNode(d,c)}else{var f=c.children;for(var e=0;e<f.length;e++){this.processNode(d,f[e])}}this.dataset.data=d},onLoad:function(){this.drawFootBar();$A.Masker.unmask(this.wb)},processNode:function(a,d){a.add(d.record);var c=d.children;for(var b=0;b<c.length;b++){this.processNode(a,c[b])}},bind:function(a){if(typeof(a)==="string"){a=$A.CmpManager.get(a);if(!a){return}}this.dataset=a;this.processDataSetLiestener("on");if(this.lockTree){this.lockTree.bind(a)}this.unlockTree.bind(a);this.drawFootBar()},setColumnSize:function(b,d){$A.TreeGrid.superclass.setColumnSize.call(this,b,d);var e=this.findColByName(b);var a=(e.lock==true)?this.lockTree:this.unlockTree;e.width=d;if(b==a.displayfield){a.width=d}a.root.setWidth(b,d)},renderLockArea:function(){var b=0;var d=this.columns;for(var c=0,a=d.length;c<a;c++){if(d[c].lock===true){if(d[c].hidden!==true){b+=d[c].width}}}this.lockWidth=b},focusRow:function(e){var f=0,b=this.unlockTree,d=b.nodeHash,a=this.dataset.data;for(var c=0;c<e;c++){if(b.isAllParentExpand(d[a[c].id])){f++}}$A.TreeGrid.superclass.focusRow.call(this,f)},onMouseWheel:function(a){}});$A.Tree.TreeGridNode=Ext.extend($A.Tree.TreeNode,{createNode:function(a){return new $A.Tree.TreeGridNode(a)},createCellEl:function(c){var a=this.getOwnerTree();var b=a.treegrid.createCell(a.column,this.record,false);var e=this.els[c+"_td"];var d=Ext.DomHelper.insertHtml("afterBegin",this.els[c+"_td"],b);e.dataindex=c;e.atype="grid-cell";e.recordid=this.record.id;if(a.column.align){e.style.textAlign=a.column.align}this.els[c+"_text"]=d},paintText:function(){},render:function(){$A.Tree.TreeGridNode.superclass.render.call(this);var a=this.getOwnerTree();this.setWidth(a.displayfield,a.width)},setWidth:function(b,a){$A.Tree.TreeGridNode.superclass.setWidth.call(this,b,a)}});