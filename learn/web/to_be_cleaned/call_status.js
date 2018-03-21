$(document).ready(function (){

    setCurrentApp('call_status');
    
    initDesktop();
    
    appTabDisplayCookie('call_status', true);
    
    initAppWin('call_st_div');
    
    $("#call_st_tabs").tabs();

    $('#codex_status_refresh').click(function (){
        ajaxLoadCodexStatus();
    }); 
	refreshStatus();
});
function refreshStatus(){
	ajaxLoadCodexStatus();
	setTimeout("refreshStatus()", 10000);
}
function loadCallStatusByJson(json)
{
    for(var pos = 0; pos < json.data.length; pos++)
    {
        if (typeof json.data[pos].id != 'undefined' && 
            typeof json.data[pos].value != 'undefined') {
            $('#' + json.data[pos].id).val(json.data[pos].value);
            if($('#' + json.data[pos].id + "_hidden").length==0)
                continue;
            $('#' + json.data[pos].id + "_hidden").html(json.data[pos].value);
        }
    }
}
function ajaxLoadCodexStatus()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_page_parameters",
        {
            BWID: getBWID(),
            page: 'tabs-codex-status',
            list: '34,16,62,18,27,20,68,69'
        },
        //34	音频格式
        //16	输入接口
        //62	输出接口
        //18	编码码率
        //27	编码分辨率
        //20	编码帧率
        function(json){
            loadCallStatusByJson(json);
            var overload = '';
            var value=0;
			value=jsonGetVal(json, 34);
			if (value==0)
				overload = 'G711a';
			else if (value==1)
				overload = 'G711u';
			else if (value==2)
				overload = 'G729a';
			$('#34_show').html(overload);
			
			
            value =jsonGetVal(json, 16);
			if (value==0)
				overload = 'CVBS';
			else if (value==1)
				overload = 'HD-SDI';
			else if (value==1)
				overload = 'DVI-I';
			$('#16_show').html(overload);
			
            value =jsonGetVal(json, 62);
			if (value==0)
				overload = 'CVBS';
			else if (value==1)
				overload = 'DVI-I';
			$('#62_show').html(overload);
			
            value =jsonGetVal(json, 27);
			if (value==0)
				overload = 'QCIF';
			else if (value==1)
				overload = 'CIF';
			else if (value==2)
				overload = '4CIF';
			else if (value==3)
				overload = 'D1';
			else if (value==6)
				overload = '720P';
			else if (value==7)
				overload = '1080P';
			$('#27_show').html(overload);

            value =jsonGetVal(json, 69);
			if (value==0)
				overload = 'QCIF';
			else if (value==1)
				overload = 'CIF';
			else if (value==2)
				overload = '4CIF';
			else if (value==3)
				overload = 'D1';
			else if (value==6)
				overload = '720P';
			else if (value==7)
				overload = '1080P';
            $('#69_show').html(overload);
        }
    );
}
