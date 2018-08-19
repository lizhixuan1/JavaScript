/* 公共JS */
var init = {
	menu: $(".menu li"),
	content: $(".content li"),
	js0: true,
	initSwitch: function() {
		var _self = this;
		this.menu.on('click', function() {
			var _index = $(this).index();
			if(!_self['js' + _index]) {
				console.log('script is loading...')
				_self.asyncScript("js/module" + (_index + 1) + ".js", function() {
					console.log('script is loaded.')
					_self['js' + _index] = true
				});
			}
			console.log('switch:'+_index)
			_self.menu.removeClass('mu-act').eq(_index).addClass('mu-act');
			_self.content.removeClass('cont-act').eq(_index).addClass('cont-act');
		})
	},
	asyncScript: function(urls, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = urls;
		if(script.readyState) { //IE
			script.onreadystatechange = function() {
				if(script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					if(callback) callback()
				}
			};
		} else { //Others
			script.onload = function() {
				if(callback) callback()
			}
		}
		document.getElementsByTagName("body")[0].appendChild(script);
	}
}
init.initSwitch()