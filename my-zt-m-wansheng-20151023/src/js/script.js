var shareInfo = {
    title:"",
    desc:"",
    url:window.location.href,
    imgurl:"http://test.nie.163.com/test11/fengyi/w/20150818_zonghe/img/share_75e53e9.png",
    webImg:"http://res.my.netease.com/zt/2015/ydss/images/logo.png",
    publicName:"mhxy1218"
}

var _userAgent=navigator.userAgent.toLowerCase();
var isAppInside=/micromessenger|yixin/i.test(_userAgent);
var isIos= /iphone os|ipad/i.test(_userAgent);
var isAndroid = /android/i.test(_userAgent);
var isOS = isIos == true ? 'ios' : isAndroid == true ? 'android' : 'other';

var PAGE = (function () {
	var fn = {
            adapt:function(designPercent){
                var mainWidth = document.body.clientWidth;
                var fontSize = mainWidth/designPercent + 'px';
                document.documentElement.style.fontSize = fontSize;
//视窗变化时需要再次适配，这种情况实际价值不是很大！最主要的只是首次适配
                window.onresize = function(){
                    var mainWidth = document.body.clientWidth;
                    var fontSize = mainWidth/designPercent + 'px';
                    document.documentElement.style.fontSize = fontSize;
                }
            },
			setMenu : function(){
				var menuBtn = $('#menu');
				var menuWarp = $(".menuWarp")
				menuBtn.bind('click', function(event){
					setTimeout(function(){
						if(menuWarp.hasClass("select")){
							menuWarp.removeClass('select');
						}else {
							menuWarp.addClass('select');
						}
					},50);
				});
				menuWarp.bind("click",function(){
					setTimeout(function(){
						menuWarp.removeClass('select');
					},50);
				});
			},

			setShare : function() {
				nie.use(["nie.util.mobiShare"],function(){
					var shareUrl = $("#share_url").html();
					var sharePic = $("#share_pic").attr("data-src");
					var shareTxt = $("#share_desc").html();
					var shareTitle = $("#share_title").html();
					MobileShare.setting({
						title:shareTitle,
						desc:shareTxt,
						url:location.href,
						imgurl:sharePic
					})
					var topshare = MobileShare.create({
						contentDiv:$("#NIE-share-m"),
						wxBgColor:"transparent",
						publicName:"",
						shareBtnText:"",
						shareText:"",
						type:"bottom",
						skin:"dark",
						webImg:"http://res.my.netease.com/zt/2015/ydss/images/logo.png",
						callback:function(){
						}
					});
				});
				if(isAppInside){
					$("#share").addClass("appinside");
				}
				else{
					$("#share").removeClass("appinside")
				}
				$("#btn_share,.btn_share").bind("click",function(e){
					$("#share").show();
					var st=setTimeout(function(){
						$("#share").addClass("show");
					},50)
				});
				$("#share").bind("click",function(e){
					$("#share").removeClass("show");
					var st=setTimeout(function(){
						$("#share").hide();
					},300);
				});
				$("#NIE-share-m").bind("click",function(e){
					e.stopPropagation();
				});
			},

			onOrientationChange:function(){
				//return;
				var supportsOrientationChange = "onorientationchange" in window,
					orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
				$(window).bind(orientationEvent, function() {
					var tips = $('#lateralTips');
					if (window.orientation == 180 || window.orientation == 0) {
						$(".warp").show();
						tips.fadeOut();
					}
					if (window.orientation == 90 || window.orientation == -90) {
						$('html,body').scrollTop(0);
						$(".warp").hide();
						tips.fadeIn();
					}
					
					$(window).trigger('resize');
				})
				$(window).trigger('orientationEvent');
			},


			screenEvent : function() {
				window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(e){
					PAGE.fn.onOrientationChange();
				}, false);
			}

		},
		init = function () {
			fn.setMenu();
			fn.setShare();
			fn.onOrientationChange();
			fn.screenEvent();

		};
	return {
		fn: fn,
		init: init
	}
})()

$(function () {
	PAGE.init();
});