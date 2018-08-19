/**
 * Created by Administrator on 2016/2/19.
 */
$(document).ready(function () {
    $(window).on("load", function () {
        position();
        window.onscroll = function load() {
            var data =  [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"}];
            console.log(slidescroll());
            if (slidescroll()) {
                $.each(data,function(index,value){
                    var box = $("<div>").addClass("box").appendTo("#container");
                    var content = $("<div>").addClass("content").appendTo(box);
                    //console.log("../images/"+$(value).attr("src"));
                    $("<img>").attr({"src":"images/"+$(value).attr("src"),"width":"200"}).appendTo(content);
                    position()
                });
            }
        };
        window.onresize=function(){
            position();//或者是
        }
    })
});
function slidescroll() {
    var box = $(".box");
    //console.log(box);
    var documentheight = $(document).height();
    var windowheight=$(window).height();
    var scoller=$(window).scrollTop();
    console.log(documentheight,windowheight,scoller);
    return documentheight < windowheight+scoller+400;
}
function position() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var boxArr = [];
    $("#container").css("width",num*220);
    box.each(function (index, value) {
        var boxheight = box.eq(index).height();
        if (index < num) {
            //console.log(index);
            $(value).removeAttr("style");
            boxArr[index] = boxheight;
        } else {
            var minboxheight = Math.min.apply(null, boxArr);
            var minposiindex = $.inArray(minboxheight, boxArr);
            $(value).css({
                "position": "absolute",
                "top": minboxheight,
                "left": box.eq(minposiindex).position().left
            });
            boxArr[minposiindex] += box.eq(index).height();
        }
    });
}
