$(document).ready(function(){

  $(".form-control").bind("input propertychange",function(){
       const str = $(".form-control").val()
       const pattrem = /^\d{6}$/
       if (pattrem.test(str) == true){
       $.get("http://127.0.0.1:3000/api/stock/detail?code="+ str, function (result, status) {
        if ('success' == status) {
            var data = result
            var len = data.length
            if (len > 1){
              high = []
              low = []
              close = []
              open = []
              volume = []
              time = []
              data.forEach(function(v){ high.push(v.high);});
              data.forEach(function(v){ low.push(v.low);});
              data.forEach(function(v){ close.push(v.close);});
              data.forEach(function(v){ open.push(v.open);});
              data.forEach(function(v){ volume.push(v.volume);});
              data.forEach(function(v){ volume.push(v.time);});
              $("#text1").text(data[len-1].high)
              $("#text2").text(data[len-1].low)
              $("#text3").text(data[len-1].open)
              $("#text4").text(data[len-1].close)
              $("#text5").text(data[len-1].volume)
              year = []
              for (var i = 0 ; i < len ; i++){
                year.push(i)
              }
              var high = {
			         x: year,
			         y: high,
			         type: 'scatter',
               name: 'high'
		          };
		          var low = {
			         x: year,
			         y: low,
			         type: 'scatter',
               name: 'low'
		           };
               var open = {
 			         x: year,
 			         y: open,
 			         type: 'scatter',
               name: 'open'
 		          };
 		          var close = {
 			         x: year,
 			         y: close,
 			         type: 'scatter',
               name: 'close'
 		           };
               var volume = {
 			         x: year,
 			         y: volume,
 			         type: 'scatter',
               name: 'volume'
 		          };

               var data = [high, low, open , close, volume];
 		           Plotly.newPlot('myDiv', data);

            }

        } else {
            alert("请求失败 status=" + status);
        }

     });
   }
})

})
/*
$(document).ready(function(){

});*/
