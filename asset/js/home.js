function StopEventPropagation(a){if(a.stopPropagation)a.stopPropagation();else a.cancelBubble=true}function ExpandHeader(){var a=document.getElementById("sw_bar");a.style.display="block";if(typeof $!="undefined"){$(document).keydown(OnSwitcherDialogKeyDown);$(document).keyup(OnSwitcherDialogKeyUp);$("#sw_bar").toggleClass("closeAnimation",false)}var d=document.getElementById("h_bar"),c=d.clientHeight+"px";window.setTimeout(function(){a.style.top=c},0);window.setTimeout(function(){a.style.opacity=1},0);document.getElementById("sw_barBG").style.display="block";var b=document.getElementById("sw_Outlook");b!=null&&b.focus();return false}function OnSwitcherLauncherKeyDown(a){a.which==32&&ExpandHeader()}function CollapseHeader(){var a=document.getElementById("sw_bar");typeof $!="undefined"&&$("#sw_bar").toggleClass("closeAnimation",true);a.style.top="30px";a.style.opacity="0";window.setTimeout(function(){a.style.display="none"},200);document.getElementById("sw_barBG").style.display="none";if(typeof $!="undefined"){$(document).unbind("keydown",OnSwitcherDialogKeyDown);$(document).unbind("keyup",OnSwitcherDialogKeyUp)}return false}function DismissPopupBanner(d){var b=new Date;b.setTime(b.getTime()+180*24*60*60*1e3);document.cookie=d+"=1; expires="+b.toGMTString()+"; path=/";var e=document.getElementById("h_popup");e.style.display="none";var c=document.getElementById("h_bar");c.className=c.className.replace(/HeaderPopupShown/,"");var a=document.getElementById("b_content");if(a)a.className=a.className.replace(/HeaderPopupShown/,"");return false}function OnSwitcherDialogKeyDown(a){if(a.which==9){var c="sw_Outlook",d="sw_OfficeDotCom",g=document.getElementById("sw_bar"),e=d,f=c;if(a.shiftKey){e=c;f=d}if(a.target&&a.target.id==e){a.preventDefault();StopEventPropagation(a);var b=document.getElementById(f);b!=null&&b.focus()}}}function OnSwitcherDialogKeyUp(b){if(b.which==27){CollapseHeader();var a=document.getElementById("h_logoChev");a!=null&&a.focus()}}var g_persistentDialog=false,g_hrdTimeout=null;function BypassSignInControl(){if(g_hrdOverride){HandleShowNext({nextScreen:g_hrdOverride});return true}return false}function ShowPersistentSignInControl(){if(BypassSignInControl())return;g_persistentDialog=true;MakeSignInControlVisible()}function ShowSignInControl(){if(BypassSignInControl())return;var a=document.getElementById("h_overlay");if(a.style.display=="block"){HideSignInControl();return}g_persistentDialog=false;MakeSignInControlVisible();typeof $!="undefined"&&$(document).keyup(onSignInDialogKeyUp);a.onclick=HideSignInControl}function MakeSignInControlVisible(){typeof $!="undefined"&&$("#h_signiniframe").addClass("iframeloading");g_hrdTimeout=window.setInterval(function(){SendClickInfo(g_msaLoginUrl,"hrd_hrdloadtimeout");window.location=g_msaLoginUrl},1e4);document.getElementById("h_overlay").style.display="block";document.getElementById("h_signincntrl").style.display="block";document.getElementById("h_signiniframe").src=g_hrdIframeUrl}function HideSignInControl(){if(document.getElementById("h_overlay").style.display=="none"||g_persistentDialog)return;document.getElementById("h_overlay").style.display="none";document.getElementById("h_signincntrl").style.display="none";document.getElementById("h_signiniframe").src="";document.getElementById("h_signiniframe").innerhtml="";typeof $!="undefined"&&$(document).unbind("keyup",HideSignInControl);SendClickInfo("","hrd_canceldialog");if(!window.removeEventListener)window.detachEvent("onresize",PositionHrd);else window.removeEventListener("resize",PositionHrd)}function onSignInDialogKeyUp(a){a.which==27&&HideSignInControl()}function hideAllDropDownMenus(){for(var b=document.querySelectorAll(".linkWithMenu.selected"),a=0;a<b.length;a++)b[a].className=b[a].className.replace(" selected","");for(var d=document.querySelectorAll(".dropDownMenu"),c=0;c<d.length;c++)d[c].style.display="none"}function toggleDropDownMenu(e,c,d){var b=document.getElementById(c),a=document.getElementById(d);if(b&&a)if(a.style.display=="inline")hideAllDropDownMenus();else{hideAllDropDownMenus();b.className+=" selected";a.style.display="inline";StopEventPropagation(e)}}function OnSwitcherTileMouseDown(){if(!window.addEventListener)return;var a=this;a.className+=" tilePressed"}function RestoreSwitcherTileVisuals(){var a=GetSwitcherTiles();if(a==null)return;for(var b=0;b<a.length;b++)a[b].className=a[b].className.replace(" tilePressed","")}function GetSwitcherTiles(){var a=document.getElementById("sw_tileList"),b=null;if(a!=null&&typeof a.getElementsByClassName!="undefined")b=a.getElementsByClassName("swTile");return b}function AttachSwitcherTileEvents(){if(!window.addEventListener)return;document.body&&document.body.addEventListener&&document.body.addEventListener("mouseup",RestoreSwitcherTileVisuals);var a=GetSwitcherTiles();if(a==null)return;for(var b=0;b<a.length;b++){a[b].addEventListener("mousedown",OnSwitcherTileMouseDown);a[b].addEventListener("dragstart",function(a){a.preventDefault()})}}window.onclick=hideAllDropDownMenus;window.addEventListener&&window.addEventListener("load",AttachSwitcherTileEvents);function HRDListener(d){var c=document.createElement("a"),b=document.createElement("a");c.href=g_hrdIframeUrl;b.href=d.origin;if(b.hostname!=c.hostname)return;if(!window.JSON||!window.JSON.parse)return;var a=JSON.parse(d.data);if(!a||!a.op){window.location=g_msaLoginUrl;return}switch(a.op){case "ShowNext":HandleShowNext(a);break;case "LaunchUrl":HandleLaunchUrl(a);break;case "CancelDialog":HideSignInControl();break;case "OnReady":HandleOnHrdReady(a);break;default:return}}function RegisterHRDListener(){if(!window.addEventListener)window.attachEvent("onmessage",HRDListener);else window.addEventListener("message",HRDListener)}function AppendOrReplaceQueryParameter(a,b,c){if(/^[^?#]*&/.test(a))return a;b=encodeURIComponent(b);c=encodeURIComponent(c);var d=new RegExp("(^[^#]*?[?&])"+b.replace(/[.*()]/g,"\\$1")+"(=.*?|)(&|#|$)","i");if(d.test(a))return a.replace(d,"$1"+b+"="+c+"$3");else{var e=/^[^#]*?\?/.test(a)?"&":"?";return a.replace(/(#|$)/,e+b+"="+c+"$1")}}function HandleShowNext(b){if(!b.nextScreen)return;var a="",c="";switch(b.nextScreen){case "0":a=g_signupUrl;c="hrd_signup";break;case "1":a=g_msaLoginUrl;c="hrd_signin";break;case "2":var d=g_orgIdLoginUrl;if(b.federationProvider!=null)d="https://portal."+b.federationProvider;else d=g_orgIdLoginUrl;a=d;c="hrd_orgid";break;case "3":a=g_msaPasswordResetUrl;c="hrd_resetpassword";break;default:return}if(b.emailAddress){var e=b.nextScreen=="2"&&!b.federationProvider?"login_hint":"username";a=AppendOrReplaceQueryParameter(a,e,b.emailAddress)}SendClickInfo(a,c);window.location=a}function PositionHrd(){if(typeof $!="undefined"){var a=$("#h_signincntrl"),e=$("#h_bar"),d=e.offset().top+e.height(),b=$("#f_bar");a.css("top","50%");a.css("margin-top",-a.height()/2);if(a.offset().top<d){a.css("margin-top",0);a.css("top",d)}var c=a.offset().top+a.height();b.css("position","");b.css("top","");b.css("margin-top","");if(b.offset().top<c){b.css("position","absolute");b.css("top",c);b.css("margin-top","0")}}}function HandleOnHrdReady(a){if(g_hrdTimeout!=null){window.clearInterval(g_hrdTimeout);g_hrdTimeout=null}if(typeof $!="undefined"){var b=$("#h_signincntrl"),c=$("#h_signiniframe");c.removeClass("iframeloading");if(a.calcHeightPx&&a.calcHeightPx>b.height()){b.height(a.calcHeightPx);b.css("margin-top",-a.calcHeightPx/2);c.height(a.calcHeightPx)}PositionHrd()}if(!window.addEventListener)window.attachEvent("onresize",PositionHrd);else window.addEventListener("resize",PositionHrd);SendClickInfo("","hrd_hrdloaded");SetStaticAssetsFrameUrl()}function HandleLaunchUrl(a){if(!a.url)return;window.location=a.url}function hasCookie(c){for(var d=c+"=",b=document.cookie.split(";"),a=0;a<b.length;a++){var e=b[a].trim();if(e.indexOf(d)==0)return true}return false}var g_createNewClicked=false,g_getServerUserInfoCallFailed=false,g_createNewNavigated=false;function GetOrgIdDestinationUrl(){if(g_authType!="OrgId")return;if(typeof g_orgidDestinationUrl!="undefined"&&g_orgidDestinationUrl)return;var a="GetServerUserInfo.ashx?auth=2&nf=1";if(typeof g_cid!="undefined"&&g_cid)a+="&pcid="+g_cid;typeof $!="undefined"&&$.ajax({url:a,type:"GET",dataType:"json",success:function(a,e,b){if(typeof a!="undefined"&&a&&typeof a.durl!="undefined"&&a.durl){g_orgidDestinationUrl=a.durl;g_createNewClicked&&NavigateToCreateNewDocument()}else{var d=null,c=null;if(typeof b!=="undefined"&&b){d=b.status;c=b.getResponseHeader("X-CorrelationId")}Diag.ULS.sendTraceTag(6936135,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.info,"GetServerUserInfo [textStatus: {0}] [status:{1}] [CorrelationId: {2}]",e,d,c);OnGetServerUserInfoCallFailed()}},error:function(a,e,d){var c=null,b=null;if(typeof a!=="undefined"&&a){c=a.status;b=a.getResponseHeader("X-CorrelationId")}Diag.ULS.sendTraceTag(6936136,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.warning,"GetServerUserInfo [textStatus: {0}] [status:{1}] [errorThrown: {2}] [CorrelationId: {3}]",e,c,d,b);OnGetServerUserInfoCallFailed()},beforeSend:function(a){a.setRequestHeader("X-Key",g_canary)}})}function OnGetServerUserInfoCallFailed(){if(g_createNewClicked)NavigateToErrorPage(3);else g_getServerUserInfoCallFailed=true}function NavigateToErrorPage(b){var a=g_createNewErrorPage;if(typeof b!="undefined"&&b)a=AppendOrReplaceQueryParameter(a,"ec",b);a=AppendOrReplaceQueryParameter(a,"pcid",typeof g_cid!="undefined"?g_cid:"unknown");window.location.href=a}function CreateNewDocument(a){g_createNewClicked=true;if(!!a)g_createNewDocumentTargetUrl=a;ShowLoadingSpinnerOnPanel();if(g_getServerUserInfoCallFailed){NavigateToErrorPage(4);return}(g_authType!="OrgId"||g_orgidDestinationUrl&&g_orgidDestinationUrl.length>0)&&NavigateToCreateNewDocument()}function ShowLoadingSpinnerOnPanel(){var a=document.getElementById("b_dialogpanel");a.innerHTML="";a.className+=" iframeloading";setTimeout(function(){if(g_createNewNavigated)NavigateToErrorPage(6);else NavigateToErrorPage(5)},g_createNewTimeout)}function NavigateToCreateNewDocument(){if(g_authType=="WindowsLiveId"&&!hasCookie("PPLState")||g_authType=="OrgId"&&!hasCookie("AADState")){Diag.ULS.sendTraceTag(7473307,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.info,"User has signed out [PageCorrelation: {0}]",typeof g_cid!="undefined"?g_cid:"unknown");window.location.href=g_signedOutUrl;return}var a=g_createNewDocumentTargetUrl;if(g_authType=="OrgId"&&g_orgidDestinationUrl&&g_orgidDestinationUrl.length>0)a=a+"&destinationUrl="+escape(g_orgidDestinationUrl);a=a+"&ct="+(new Date).getTime();if(typeof g_cid!="undefined"&&g_cid)a=a+"&pcid="+g_cid;var b=document.createElement("form");b.setAttribute("method","POST");b.setAttribute("action",a);var c=document.createElement("input");c.setAttribute("name","Canary");c.setAttribute("value",g_canary);c.setAttribute("type","hidden");b.appendChild(c);document.body.appendChild(b);b.submit();g_createNewNavigated=true}function SetStaticAssetsFrameUrl(){typeof g_staticAssetUrl!="undefined"&&g_staticAssetUrl&&window.setTimeout(function(){var a=document.getElementById("preloadframe");if(a!=null)a.src=g_staticAssetUrl},1e3)}function SetWarmupFrameUrl(){typeof g_dnsWarmupDelay!="undefined"&&typeof g_dnsWarmupUrls!="undefined"&&(g_dnsWarmupUrls&&g_dnsWarmupUrls.length>0)&&window.setTimeout(function(){for(var b=0;b<g_dnsWarmupUrls.length;b++){var a=document.createElement("iframe");a.style.display="none";a.sandbox="";document.body.appendChild(a);a.id="warmupiframe"+b;a.src=g_dnsWarmupUrls[b]}},g_dnsWarmupDelay)}var g_msoulscat_Wac_WebAppsPortal=349,g_loggingInitialized=false;function InitializeLogging(){Diag.ULS.setUlsHost(new Diag.UploadingUlsHost(g_sid,"/start/"+Diag.UploadingUlsHost.defaultRemoteUlsUrl));g_loggingInitialized=true;SendBrowserInfo()}function DisposeLogging(){Diag.ULS.get_host().dispose()}function SendClickInfo(b,c){if(typeof Diag!="undefined"){var a={};a.destUrl=b;a.urlId=c;a.pageName=typeof g_PageName!="undefined"?g_PageName:"unknown";a.pageUrl=window.location.href;a.pageCorrelationId=typeof g_cid!="undefined"?g_cid:"unknown";Diag.ULS.sendTraceTag(6686497,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.info,"{0}",a)}}function SendBrowserInfo(){if(typeof window.performance!="undefined"&&window.performance!=null){var a={};a.redir=window.performance.navigation.redirectCount;a.pageCorrelationId=typeof g_cid!="undefined"?g_cid:"unknown";Diag.ULS.sendTraceTag(7148097,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.info,"{0}",a)}}function OnError(a){g_loggingInitialized&&Diag.ULS.sendTraceTag(7135579,g_msoulscat_Wac_WebAppsPortal,Diag.ULSTraceLevel.error,"{0}.\r\n{1}",a.message,a.stack)}if(window.addEventListener)window.addEventListener("error",OnError,false);else window.attachEvent("onerror"+event,OnError)