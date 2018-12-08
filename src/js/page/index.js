require(['./js/config.js'], function() {
	require(['mui'], function(mui) {
		var pagesum = 0;
		var pagesize = 4;
		var count =  0;
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					auto:true,
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		function pullupRefresh(){
			pagesum ++;
			ajax();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(pagesum === count);
		}
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		function ajax(){
			mui.ajax('/list/api/select',{
				data:{
					pagesum:pagesum,
					pagesize:pagesize
				},
				dataType:'json',
				success:function(res){
					if(res.code === 1){
						var html = '';
						count = res.sum;
						res.msg.forEach(function(ele){
							var url = 'http://192.168.2.231:3000/images/' + ele.url;
							html += `<dl>
										<dt><img src="${url}" alt=""></dt>
										<div>
											<p>${ele.title}</p>
											<span>￥${ele.price}</span>
										</div>
									</dl>`
						})
						mui('#list')[0].innerHTML += html;
					}
				}
			})
		}
	})
})
