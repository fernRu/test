$(function (){
	  new Scrollload({
	  container: document.querySelector('.load-container'),
	  content: document.querySelector('.load-content'),
	  noMoreDataHtml:'',
	  isInitLock: false,
	  loadMore: function loadMore(sl) {
	    if(curpage === 6){
	      sl.noMoreData();
	      return;
	    }
	    setTimeout(function () {
	      console.log('init');
	      $.ajax({
	        url: ApiUrl + "/index.php?act=handle&op=goods_by_store&page=" + page + "&curpage=" + curpage++,
	        type: 'get',
	        async: false,
	        dataType: 'json',
	        data: {m_id: m_id, gc_id: gc_id, keyword: ''},
	        success: function (res) {
	          hasmore = res.hasmore;
	          arr = res.datas.goods_list;
	          $(sl.contentDom).append(getHtml(arr));
	          sl.unLock();
	        },
	        error: function error(xhr, type) {
	          sl.throwException();
	        }
	      });

	    },1500);
	  },
	  enablePullRefresh: true,
	  pullRefresh: function pullRefresh(sl) {
	    sl.refreshComplete();
	  }
	})
	function getHtml(data) {
	  console.log(data);
	  var html = '';
	  $.each(data, function(index){
	    html += '<li>';
	    html += '< a href="' + WapSiteUrl + '/xq.html?type_url=store&id=' + data[index].goods_id + '">';
	    html += '<p>< img src="' + data[index].goods_image_url + '" /></p >';
	    html += '<span>' + data[index].goods_name + '</span>';
	    html += '</ a>';
	    if (data[index].goods_storage <= '0') {
	      html += '<div class="borrowed"><span>已借出</span></div>';
	    }
	    html += '</li>';
	  });
	  return html;
	}
})