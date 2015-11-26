/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/ 
var OmexBasePage=function(){function a(){$(document).ready(this.onReady)}a.prototype.onReady=function(){};return a}(),__extends=this.__extends||function(b,a){for(var c in a)if(a.hasOwnProperty(c))b[c]=a[c];function d(){this.constructor=b}d.prototype=a.prototype;b.prototype=new d},logItem,OmexULSHost=function(b){__extends(a,b);function a(d){var c=5*1024,a=3e4,e=new Diag.UlsUploadConfiguration(c,null,a);b.call(this,d,"/"+Diag.UploadingUlsHost.defaultRemoteUlsUrl,e)}a.prototype.handleTrace=function(a){b.prototype.handleTrace.call(this,a);typeof console!=="undefined"&&console&&console.log&&console.log(a.message)};a.prototype.showAssertDialog=function(){return};return a}(Diag.UploadingUlsHost),AnalyticsLogging=function(d){var c="{0}",b=1500;__extends(a,d);function a(){var e=this,f=e;d.call(e);e.LogsFlushed=false;e.errorHandlerFunction=function(g,d,f){var a="Error ("+g+") encountered in ("+d+") at line number ("+f+")",e=(new RegExp("^https?://([^/]*.)?office(.net|.com|-int.com|ppe.com)")).test(d);if(e)Diag.ULS.sendTraceTag(5834692,b,Diag.ULSTraceLevel.error,c,a);else Diag.ULS.sendTraceTag(8964066,b,Diag.ULSTraceLevel.info,c,a)};var g=new OmexULSHost("0");Diag.ULS.setUlsHost(g);for(var i in a.LogClickTags){var h=a.LogClickTags[i];$(document).on("click",h+"[id]",function(a){f.onClick(a)})}$(document).click(function(a){f.onClick(a)});window.addEventListener("unload",function(){return f.beforeCloseFunction(g)});window.onerror=e.errorHandlerFunction}a.prototype.onReady=function(){d.prototype.onReady.call(this);if(window&&window.navigator&&window.navigator.userAgent)logItem.UserAgent=window.navigator.userAgent;a.prototype.SendAnalytics("onready")};a.prototype.onClick=function(c){var d=$(c.target);if(d[0].id!=""){var b=d[0].id;a.LoggedClicks[b]=a.LoggedClicks[b]||0;if(c.timeStamp-a.LoggedClicks[b]<5)return;logItem.ClickObjectId=b;a.prototype.SendAnalytics("OnClick");logItem.ClickObjectId="";a.LoggedClicks[b]=c.timeStamp}};a.prototype.SendAnalytics=function(a){logItem.EventType=a;logItem.BTS=new Date;Diag.ULS.sendTraceTag(5834693,b,Diag.ULSTraceLevel.info,c,logItem)};a.prototype.SendCustomMessage=function(a){logItem.EventType=a;logItem.BTS=new Date;Diag.ULS.sendTraceTag(6574879,b,Diag.ULSTraceLevel.info,c,logItem)};a.prototype.SendCustomMessageWithTag=function(d,f,e){var a=Diag.ULSTraceLevel.info;if(e==="error")a=Diag.ULSTraceLevel.error;logItem.EventType=d;logItem.BTS=new Date;Diag.ULS.sendTraceTag(f,b,a,c,logItem)};a.prototype.SendErrorMessageWithTag=function(a,b){this.SendCustomMessageWithTag(a,b,"error")};a.prototype.SendKeyValueAnalytics=function(c,b){logItem.Key=c;logItem.Value=b;a.prototype.SendAnalytics("OnKeyValue");logItem.Key="";logItem.Value=""};a.prototype.beforeCloseFunction=function(b){if(!this.LogsFlushed){a.prototype.SendAnalytics("onunload");this.LogsFlushed=true;b.flushForAppClose();b.dispose()}};a.LogClickTags=["button","a","input","textarea","img"];a.LoggedClicks={};return a}(OmexBasePage),AnalyticsLoggingObject=new AnalyticsLogging