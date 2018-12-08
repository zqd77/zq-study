var gulp = require('gulp');
var server = require('gulp-webserver');
gulp.task('server',function(){
	return gulp.src('src')
	.pipe(server({
		port:7300,
		proxies:[
			{source:"/list/api/select",target:"http://192.168.2.231:3000/list/api/select"}
		]
	}))
})