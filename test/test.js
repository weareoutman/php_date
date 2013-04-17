var assert = (function(){
	var assert = {};
	assert.equal = function(actual, expected, message){
		if (actual == expected) {
			console.log("ok: " + message);
			document.write("ok: " + message + "<br />");
		} else {
			console.log("failed: " + message);
			document.write("failed: " + message + "<br />");
		}
	};
	return assert;
})();
(function(expected){
	for (var i = 0; i < expected.length; ++ i) {
		var d = expected[i];
		var a = php_date(d.format, d.timestamp);
		assert.equal(a, d.result, "expect \""+d.result+"\", actual \""+a+"\". For timestamp: "+d.timestamp+", format: \""+d.format+"\"");
	}
})(expected);