$(document).ready(function() {
    var elements1 = hq_str_sh000001.split(",");
  	var elements2 = hq_str_sz399001.split(",");
    var high, low, close, open, volume, name;
    high = elements1[4];
    low = elements1[5];
  	close = elements1[2];
  	open = elements1[1];
  	volume = elements1[8];
  	name = elements1[0];
    var shigh, slow, sclose, sopen, svolume, sname;
    shigh = elements2[4];
    slow = elements2[5];
  	sclose = elements2[2];
  	sopen = elements2[1];
  	svolume = elements2[8];
  	sname = elements2[0];

    $("#shhigh").text("最高: " + high);
    $("#shlow").text("最低: " + low);
    $("#shclose").text("收: " + close);
    $("#shopen").text("开: " + open);
    $("#shvolume").text("交易量: " + volume);

    $("#szhigh").text("最高: " + shigh);
    $("#szlow").text("最低: " +  slow);
    $("#szclose").text("收: " +  sclose);
    $("#szopen").text("开: " +  sopen);
    $("#szvolumn").text("交易量: " + svolume);

})
