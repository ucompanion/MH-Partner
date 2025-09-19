/*-------------------------------------------------------------------
	분류순서
	- @ Publish	    : 레이아웃
	- @ Init	    : 초기실행
-------------------------------------------------------------------*/

$(function () {
	$(".page-header").each(function () {
		$(this).load("../../html/templates/include_header.html", function () {
			console.log('[INFO] 퍼블리싱 include_header.html 인클루드 완료');
		});
	});
	$(".page-footer").each(function () {
		$(this).load("../../html/templates/include_footer.html", function () {
			console.log('[INFO] 퍼블리싱 include_footer.html 인클루드 완료');
		});
	});
});
