/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/ 
var OmexBasePage=function(){function a(){$(document).ready(this.onReady)}a.prototype.onReady=function(){};return a}(),__extends=this.__extends||function(b,a){for(var c in a)if(a.hasOwnProperty(c))b[c]=a[c];function d(){this.constructor=b}d.prototype=a.prototype;b.prototype=new d};varsegmentation=0;varClickTracking=1;varCustomerTracking=1;varAutoFirePV=1;Route="12271";Ctrl="SD100";var errorHandlerFunction=function(d,c,a){var b="Error ("+d+") encountered in ("+c+") at line number ("+a+")";Diag.ULS.sendTraceTag(6408418,1500,Diag.ULSTraceLevel.error,"{0}",b)};function AddUserMetaTags(a){Object.keys(requestContextInfo).forEach(function(b){return a.push(b,requestContextInfo[b])});if(typeof MscomCustomEvent!=="undefined")MscomCustomEvent.apply(null,a);else Diag.ULS.sendTraceTag(8442249,1500,Diag.ULSTraceLevel.error,"Error loading dependent script Wedcs.d.ts")}var UserAnalytics=function(c){var a="undefined";__extends(b,c);function b(){c.call(this);$(window).load(this.onLoad);$(document).ready(this.onReady);window.onerror=errorHandlerFunction}b.prototype.onLoad=function(){if(typeof logItem!==a){requestContextInfo=["ms.correlationId",null];typeof MscomCustomEvent!==a&&MscomCustomEvent.apply(null,requestContextInfo)}else Diag.ULS.sendTraceTag(8442250,1500,Diag.ULSTraceLevel.error,"Error loading dependent script AnalyticsLogging.ts")};b.prototype.onReady=function(){$("body").on("mousedown","button",function(b){var d="wcs.cot",c=1,h="cid",g=b.target.id,f="cn",e=b.target.textContent;typeof MscomCustomEvent!==a&&MscomCustomEvent(d,c,h,g,f,e);b.stopImmediatePropagation()})};return b}(OmexBasePage);new UserAnalytics