/**
 * Created by Administrator on 2016/12/29 0029.
 */
function waterFall(data, box, container){
    this.data = data;
    this.box = box;
    this.container = container;
    this.boxWidth = this.box.eq(0).width();
    this.num = Math.floor($(window).width() / this.boxWidth);
    this.boxArr = [];
    this.boxHeight = null;
}
waterFall.prototype = {
    constructor: waterFall,
    initElement(){
        this.documentheight = $(document).height();
        this.windowheight = $(window).height();
        this.scoller = null;
    },
    position () {
        this.num = Math.floor($(window).width() / this.boxWidth);
        this.container.css("width", this.num * 220);
        let that = this;
        this.box.each(function (index, value) {
            that.boxHeight = that.box.eq(index).height();
            if (index < that.num) {
                $(value).removeAttr("style");
                that.boxArr[index] = that.boxHeight;
            } else {
                that.minboxheight = Math.min(...that.boxArr);
                that.minposiindex = $.inArray(that.minboxheight, that.boxArr);
                $(value).css({
                    "position": "absolute",
                    "top": that.minboxheight,
                    "left": that.box.eq(that.minposiindex).position().left
                });
                that.boxArr[that.minposiindex] += that.box.eq(index).height();
            }
        });
    },
    slidescroll() {
        this.scoller = $(window).scrollTop();
        return this.documentheight < this.windowheight + this.scoller + 400;
    },
    bind(){
        let that = this;
        window.onscroll = function () {
            if (that.slidescroll()) {
                $.each(that.data, function (index, value) {
                    that.container.append(`<div class="box">
                    <div class="content">
                    <img width="200" src="images/${$(value).attr("src")}">
                    </div>
                    </div>`);
                    that.box = $(".box");
                    that.position()
                });
            }
        };

        window.onresize = function () {
            that.position();
        }
    }
};
$(window).on("load", function () {
    const data = [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"}];
    let box = $(".box");
    let container = $("#container");
    let obj = new waterFall(data, box, container);
    obj.position();
    obj.initElement();
    obj.bind();

   
});

