/**
 * Created by Administrator on 2016/2/19.
 */
$(document).ready(function () {
    $(window).on("load", function (){
        position();
        window.onscroll = function (){
            var data =  [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"},{"src": "6.jpg"},{"src": "7.jpg"},{"src": "8.jpg"},{"src": "9.jpg"},{"src": "10.jpg"}];
            if (slidescroll()) {
                $.each(data,function(index,value){
                    var box = $("<div >").addClass("box").appendTo("#container");
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr({"src":"images/"+$(value).attr("src"),"width":"200"}).appendTo(content);
                    position();
                });
            }
        };
        window.onresize=function(){
            position();
        }
    })
});
function slidescroll() {
    var documentHeight = $(document).height();
    var windowHeight=$(window).height();
    var scoller=$(window).scrollTop();
    return documentHeight <= windowHeight+scoller+100;
}
function position() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var boxArr = [];
    $("#container").css("width",num*220);
    box.each(function (index, value){
        var boxheight = box.eq(index).height();
        if (index < num){
            $(value).removeAttr("style");
            boxArr[index] = boxheight;
        } else {
            var minboxheight = Math.min.apply(null, boxArr);//问题
            var minposiindex = $.inArray(minboxheight, boxArr);//问题s
            $(value).css({
                "position": "absolute",
                "top": minboxheight+5,
                "left": box.eq(minposiindex).position().left
            });
            boxArr[minposiindex] += (box.eq(index).height()+5);
        }
    });
}