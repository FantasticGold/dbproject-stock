$(document).ready(function(){

  $(".form-control").bind("input propertychange",function(){
       const str = $(".form-control").val()
      //  console.log(str)
       const pattrem = /^\d{6}$/
        if (pattrem.test(str) == true) {
        //  console.log("query")
          $.get("/api/stock/detail?code="+ str, function (result, status) {
            console.log(`${result.length} + ${status}`)
            if ('success' == status) {
                  var data = result
                  var len = data.length
                  if (len > 1) {
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
                    let textvolume = 0
                    data.forEach(function(v){ 
                      volume.push(v.volume);
                      textvolume += v.volume
                    });
                    data.forEach(function(v){ time.push(v.time);});
                    const texthigh   = Math.max(...high)
                    const textlow    = Math.min(...low)
                    const textclose  = close[len-1]
                    const textopen   = open[0]
                    // console.log(`volume = ${volume}`)
                    $("#texthigh").text(`最高: ${texthigh}`)
                    $("#textlow").text(`最低: ${textlow}`)
                    $("#textclose").text(`收盘价: ${textclose}`)
                    $("#textopen").text(`开盘价: ${textopen}`)
                    $("#textvolume").text(`成交量: ${textvolume}`)
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
                  } else {
                    sweetAlert("哎呦!", `没有股票${str}`, "error")
                  }
            } else {
              sweetAlert("哎呦!", "连接不上服务器", "error")
            }
          })
        }
  })

  $("a#prefer").click(function () {
    console.log("test")
    $.ajax({
      url : "/api/users/add",
      type : "POST",
      contentType: "application/json;charset=utf-8",
      data : JSON.stringify({
        'code': $(".form-control").val()
      }),
      dataType : "text",
      success : function(result) {
        console.log(result)
        const info = JSON.parse(result)
        if (info.state == true) {
          sweetAlert("自选股", "添加成功", "success")
        } else {
          sweetAlert("哎呦!", info.msg, "error")
        }
      },
      error:function(){
        sweetAlert("哎呦!", "连接不上服务器", "error")
      }
    })
  })
})
/*
$(document).ready(function(){

});*/
