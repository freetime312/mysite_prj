$(document).ready(function (){

    setCurrentApp('setting');
    
    initDesktop();

    
    $("#setting_tabs").tabs();
    
    $( "#audio_volume" ).slider({
       animate: "fast",
       min:0,
       max:100,
       change: function( event, ui ) {
           $('#33').html(ui.value);
       },
       create: function( event, ui ) {
           ;
       }
    });

    //目前处理LoadNetworkSetting时候，会重新加载一次参数，所以需要放在最前面
    //更好的方法就是单独再加一个函数，要求重新加载参数
    ajaxLoadNetworkSetting();
    ajaxLoadRegSetting();
    ajaxLoadCodexSetting();
    ajaxLoadRecord();
    ajaxLoadRecStatus();
    ajaxLoadSubtitle();
    
    $('#reg_setting_submit').click(function (){
        ajaxPostRegSetting();
    });

    $('#net_setting_submit').click(function (){
        ajaxPostNetworkSetting();
    });

    $('#user_setting_submit').click(function (){
        ajaxPostUserSetting();
    });

    $('#codex_setting_submit').click(function (){
        ajaxPostCodexSetting();
    });

    $('#capture_setting_submit').click(function (){
        ajaxPostCaptureSetting();
    });

    $('#cfgRecorder').click(function (){
        //$(this).attr('src',$(this).attr('src')=='images/recorder_on.png'?'images/recorder_off.png':'images/recorder_on.png');
        if ($('#recorderPic').val()==0)
        {
            $('#recorderPic').val(1)
            $("#cfgRecorder").attr("src","images/recorder_on.png");
            ajaxSendRecCmd(1)
            queryRecFile();
        }
        else
        {
            $('#recorderPic').val(0)
            $("#cfgRecorder").attr("src","images/recorder_off.png");
            //Send command 3 to stop recorder
            ajaxSendRecCmd(3)
        }
    });

    $( "#upgrade_progressbar" ).progressbar({
        value: 0
    });
    
    $('#upgrade_progress_row').css('display', 'none');
	
    $('.sel_all').change(function (){
        if (this.checked) {
           $('input[name="' + this.name + '"]').prop('checked', true);
        } else {
           $('input[name="' + this.name + '"]').prop('checked', false);
        }
    });
	
    if (typeof $.cookie('setting_tab_display') != 'undefined') {
        $("#setting_tabs").tabs( "option", "active", $.cookie('setting_tab_display'));
        $.removeCookie('setting_tab_display');
    }
});

function reg_verify(addr)
{
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    if(addr.match(reg)){
        return true;
    }
    else{
        return false;
    }
}

function ajaxLoadNetworkSetting()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_page_parameters",
        {
            BWID: getBWID(),
            page: 'tabs-network-setting',
            list: "3,4,5,6"
        },
        function(json){
            loadValByJson(json);
        }
    );
}

function ajaxLoadRegSetting()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_page_parameters",
        {
            BWID: getBWID(),
            page: 'tabs-reg-setting',
            list: '51,52,57,54,53,58,59'
        },
        function(json){
            loadValByJson(json);
        }
    );

    $('#dev_reg_status').load("/control/query_server_status",function(responseTxt,statusTxt,xhr){
        if (statusTxt=="success" && responseTxt!="")
        {
            $("#dev_reg_status").val(responseTxt);
        }
    });
}

function updateSubmit(tab, flag)
{
    var obj = document.getElementById(tab);
    if (flag==0)
    {
        obj.value = "正在设置..."
        obj.disabled = "disabled";
    }
    else
    {
        obj.value = "提交"
        obj.disabled = "";
    }
}

function ajaxPostRegSetting()
{
    int_list = new Array(54, 58, 59)
    ret = checkIntValue(int_list);
    if (ret == -1)
    {
        return;
    }
    ret = checkRegValue();
    if (ret == -1)
    {
        return;
    }
    rst = reg_verify($('#53').val());
    if (rst == false)
    {
        alert("非法注册服务器IP地址");
        return;
    }

    updateSubmit("reg_setting_submit", 0);
    $.post("/goform/configpara", 
            {
                'page': 'tabs-reg-setting',
                "id_lists":"51,52,57,54,53,58,59",
                '51':$('#51').val(),
                '52':$('#52').val(),
                '57':$('#57').val(),
                '54':$('#54').val(),
                '53':$('#53').val(),
                '58':$('#58').val(),
                '59':$('#59').val()
            },
            function(data) {
                confirmDiag('注册信息提交成功');
                updateSubmit("reg_setting_submit", 1);
            }
    );
}

function ajaxPostNetworkSetting()
{
    var rst;
    rst = reg_verify($('#3').val());
    if (rst==false)
    {
        alert("非法IP地址");
        return;
    }
    rst = reg_verify($('#4').val());
    if (rst==false)
    {
        alert("非法掩码地址");
        return;
    }
    rst = reg_verify($('#5').val());
    if (rst==false)
    {
        alert("非法网关地址");
        return;
    }

    updateSubmit("net_setting_submit", 0);
    $.post("/goform/configpara", 
            {
                'page': 'tabs-network-setting',
                "id_lists":"3,4,5",
                '3':$('#3').val(),
                '4':$('#4').val(),
                '5':$('#5').val()
            },
            function(data){
                confirmDiag('网络设置提交成功');
                updateSubmit("net_setting_submit", 1);
            }
    );
}

function ajaxPostUserSetting()
{
    updateSubmit("user_setting_submit", 0);
    $.post("/goform/changepasswd", 
            {
                'user_name':$.cookie("userName"),
                'orig_password':$('#orig_password').val(),
                'new_password':$('#new_password').val(),
                'new_password_again':$('#new_password_again').val()             
            },
            function(data){
                confirmDiag(data);
                updateSubmit("user_setting_submit", 1);
            }
    );
}
function ajaxLoadCodexSetting()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_page_parameters",
        {
            BWID: getBWID(),
            page: 'tabs-codex-setting',
            list: '8,16,79,62,27,81,20,82,34,18,83,67,56,84,63,80,85,64'
        },
        function(json){
            loadValByJson(json);

/*
            if (jsonGetVal(json, 31) == '0') {
                $('#audio_encode_ctrl_enable').prop('checked', true);
            } else {
                $('#audio_encode_ctrl_disable').prop('checked', true);
            }
            
            if (jsonGetVal(json, 41) == '0') {
                $('#audio_decode_ctrl_enable').prop('checked', true);
            } else {
                $('#audio_decode_ctrl_disable').prop('checked', true);
            }

            if (jsonGetVal(json, -9) == '0') {
                $('#audio_recv_ctrl_enable').prop('checked', true);
            } else {
                $('#audio_recv_ctrl_disable').prop('checked', true);
            }

            if (jsonGetVal(json, 25) == '0') {
                $('#audio_encode_ctrl_enable').prop('checked', true);
            } else {
                $('#audio_encode_ctrl_disable').prop('checked', true);
            }
            
            if (jsonGetVal(json, 38) == '0') {
                $('#vedio_decode_ctrl_enable').prop('checked', true);
            } else {
                $('#vedio_decode_ctrl_disable').prop('checked', true);
            }

            if (jsonGetVal(json, 66) == '0') {
                $('#audio_optm_ctrl_enable').prop('checked', true);
            } else {
                $('#audio_optm_ctrl_disable').prop('checked', true);
            }

            $( "#audio_volume" ).slider( "option", "value", jsonGetVal(json, 33) );
*/

/*
            decodeFrame = $('#82').val();
            if (decodeFrame<0)
            {
                value = 0
                decodeFrame = 0-decodeFrame;
                switch(decodeFrame)
                {
                    case 1:
                        value = 0.8;
                        break;
                    case 2:
                        value = 0.5;
                        break;
                    case 3:
                        value = 0.3;
                        break;
                    case 4:
                        value = 0.2;
                        break;
                    case 5:
                        value = 0.2;
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        value = 0.1;
                        break;
                    default:
                        break;
                }
                if (value != 0)
                {
                    $('#82').val(value);
                }
            }
*/

            updateOverload();

            audioValue = $('#34').val();
            if (audioValue!=2)
            {
                $('#audio_format').val(0);
                $('#34 option[value="0"]').show();
                $('#34 option[value="1"]').show();
                $('#34 option[value="2"]').hide();
                $('#34_pid0').val(audioValue);
            }
            else
            {
                $('#audio_format').val(1);
                $('#34 option[value="0"]').hide();
                $('#34 option[value="1"]').hide();
                $('#34 option[value="2"]').show();
                $('#34_pid0').val(0);
            }
        }
    );

    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_sd_hd_type",
        {},
        function(json){
            type = json.resType
            handleParamProp(type);
        }
    );
}

function checkFrameRange()
{
    var ret = 0;
    resolution = $("#27").val();
    frameRate = $("#20").val();
    encodeRate = $("#18").val();
    videoInput = $("#16").val();
    videoOutput = $("#62").val();
    deviceSH  = $('#sd_hd_device').val();

    decRes = $("#81").val();
    decFrameRate = $("#82").val();
    decBitRate = $("#83").val();

    encMode = ["QCIF","CIF","4CIF","D1","","","720P","1080P"];
    decMode = ["QCIF","CIF","4CIF","D1","720P","1080P"];

    var minfr, maxfr, minEnc, maxEnc;
    var decMinfr, decMaxfr, decMinEnc, decMaxEnc;
    if (deviceSH == 0)
    {
        frmRtdt = [[0,25],[0,15],[0,5],[0,5]];
        minfr = frmRtdt[resolution][0];
        maxfr = frmRtdt[resolution][1];

        encRtdt = [[8,384],[8,512],[16,1500],[16,1560]];
        minEnc = encRtdt[resolution][0];
        maxEnc = encRtdt[resolution][1];

        decFrmRtdt = [[0,25],[0,15],[0,5],[0,5]];
        decMinfr = decFrmRtdt[decRes][0];
        decMaxfr = decFrmRtdt[decRes][1];

        decRtdt = [[8,384],[8,512],[16,1500],[16,1560]];
        decMinEnc = decRtdt[decRes][0];
        decMaxEnc = decRtdt[decRes][1];
    }
    else if (deviceSH == 1)
    {
        frmRtdt = [[0,25],[0,25],[0,25],[0,25],[-1,-1],[-1,-1],[0,25],[0,25]];
        minfr = frmRtdt[resolution][0];
        maxfr = frmRtdt[resolution][1];

        encRtdt = [[8,384],[8,512],[16,1500],[16,1560],[-1,-1],[-1,-1],[16,2048],[16,4096]];
        minEnc = encRtdt[resolution][0];
        maxEnc = encRtdt[resolution][1];

        decFrmRtdt = [[0,25],[0,25],[0,25],[0,25],[0,25],[0,25]];
        decMinfr = decFrmRtdt[decRes][0];
        decMaxfr = decFrmRtdt[decRes][1];

        decRtdt = [[8,384],[8,512],[16,1500],[16,1560],[16,2048],[16,4096]];
        decMinEnc = decRtdt[decRes][0];
        decMaxEnc = decRtdt[decRes][1];

        if (videoInput == 0)
        {
            if (resolution==6 || resolution == 7)
            {
                ret = -1;
                alert("视频输入CVBS，编码分辨率不能选择720P或者1080P");
            }
        }
        if (videoOutput == 0)
        {
            if (decRes==4  || decRes==5)
            {
                ret = -1;
                alert("视频输出CVBS，解码分辨率不能选择720P或者1080P");
            }
        }
        if (ret==-1)
            return ret;
    }
    else
    {
        alert("未知设备类型(" + deviceSH + ")");
        return -1;
    }

    if (frameRate<minfr || frameRate>maxfr)
    {
        ret = -1;
        alert(encMode[resolution] + "模式下编码帧率范围从(" + minfr + "," + maxfr + "]")
    }
    else if (encodeRate<minEnc || encodeRate>maxEnc)
    {
        ret = -1;
        alert(encMode[resolution] + "模式下编码码率范围从[" + minEnc + "," + maxEnc + "]")
    }
    if (ret==-1)
        return ret;

    if (decFrameRate<decMinfr || decFrameRate>decMaxfr)
    {
        ret = -1;
        alert(decMode[decRes] + "模式下解码帧率范围从(" + decMinfr + "," + decMaxfr + "]")
    }
    else if (decBitRate<decMinEnc || decBitRate>decMaxEnc)
    {
        ret = -1;
        alert(decMode[decRes] + "模式下解码码率范围从[" + decMinEnc + "," + decMaxEnc + "]")
    }
    if (ret==-1)
        return ret;

    rsmValue  = $("#63").val();
    rsnValue  = $("#64").val();
    if (rsmValue < 1 || rsmValue >200)
    {
        ret = -1;
        alert("RSM范围从1到200")
    }
    if (rsnValue < 1 || rsnValue >200)
    {
        ret = -1;
        alert("RSN范围从1到200")
    }
    /*
    gopLength = $("#65").val();
    if (gopLength < 1 || gopLength >1000)
    {
        ret = -1;
        alert("GOP长度范围从1到1000")
    }
    */
    if (ret==-1)
        return ret;

    return ret;
}

function checkRegValue()
{
    var ret = 0;
    user = $("#51").val();
    pass = $("#52").val();
    if (user=="")
    {
        alert("用户名不能为空")
        ret = -1;
    }
    else if (pass=="")
    {
        alert("密码不能为空")
        ret = -1;
    }
    return ret;
}

function checkCaptureRange()
{
    var ret = 0;
    idList = new Array(72,73,76,77);
    descList = new Array("编码X坐标","编码Y坐标","解码X坐标","解码Y坐标");
    for (i=0;i<4;i++)
    {
        value=$("#"+idList[i]).val();
        if (value<0 || value>10000)
        {
            ret = -1;
            alert(descList[i] + "合法值在[0,10000]之间，超出范围了");
            break;
        }
    }
    return ret;
}

function ajaxPostCodexSetting()
{
/*
    if ($('#audio_encode_ctrl_enable').prop('checked', true)) {
        var audio_encode_ctrl = 0;
    } else {
        var audio_encode_ctrl = 1;
    }

    if ($('#audio_decode_ctrl_enable').prop('checked', true)) {
        var audio_decode_ctrl = 0;
    } else {
        var audio_decode_ctrl = 1;
    }

    if ($('#audio_recv_ctrl_enable').prop('checked', true)) {
        var audio_recv_ctrl = 0;
    } else {
        var audio_recv_ctrl = 1;
    }

    if ($('#vedio_encode_ctrl_enable').prop('checked', true)) {
        var vedio_encode_ctrl = 0;
    } else {
        var vedio_encode_ctrl = 1;
    }

    if ($('#vedio_decode_ctrl_enable').prop('checked', true)) {
        var vedio_decode_ctrl = 0;
    } else {
        var vedio_decode_ctrl = 1;
    }

    if ($('#vedio_recv_ctrl_enable').prop('checked', true)) {
        var vedio_recv_ctrl = 0;
    } else {
        var vedio_recv_ctrl = 1;
    }    

    if ($('#audio_optm_ctrl_enable').prop('checked')==true) {
        var audio_optm_ctrl = 0;
    } else {
        var audio_optm_ctrl = 1;
    }

    var audio_v = $( "#audio_volume" ).slider( "option", "value");
*/

    int_list = new Array(20, 18, 82, 83, 63, 64, 56, 80)
    ret = checkIntValue(int_list);
    if (ret == -1)
    {
        return;
    }

    if (checkFrameRange()==-1)
    {
        return;
    }

    var val82;
    val82 = $('#82').val();
    valconv = val82
    if (val82==0)
    {
        alert("0 is invalid value")
        return;
    }
/*
    else if (val82<1)
    {
        if (val82==0.1)
            valconv = -10 
        else if (val82==0.2)
            valconv = -5
        else if (val82==0.3)
            valconv = -3
        else if (val82==0.4)
            valconv = -2
        else if (val82==0.5)
            valconv = -2
        else if (val82==0.6)
            valconv = -1
        else if (val82==0.7)
            valconv = -1
        else if (val82==0.8)
            valconv = -1
        else if (val82==0.9)
            valconv = -1
        else
        {
            alert("Invalid value" + val82)
            return;
        }
    }
*/

    var i;
    var id_update_list = "";
    id_all_list = new Array(8,16,79,62,27,81,20,82,34,18,83,67,56,84,63,80,85,64)
    for (i=0; i<id_all_list.length; i++)
    {
        cid = id_all_list[i];
        cvalue = $("#" + cid).val();
        svalue = $("#" + cid + "_hidden").val();
        if (cvalue != svalue)
        {
            if (id_update_list=="")
            {
                id_update_list=cid;
            }
            else
            {
                id_update_list=id_update_list+","+cid;
            }
            $("#" + cid + "_hidden").val(cvalue)
        }
    }

    updateSubmit("codex_setting_submit", 0);
    $.post("/goform/configpara", 
            {
                'page': 'tabs-codex-setting',
                "id_lists":id_update_list,
                '8':$('#8').val(),
                '16':$('#16').val(),
                '79':$('#79').val(),
                '62':$('#62').val(),
                '27':$('#27').val(),
                '81':$('#81').val(),
                '20':$('#20').val(),
                '82':valconv,
                '34':$('#34').val(),
                '18':$('#18').val(),
                '83':$('#83').val(),
                '67':$('#67').val(),
                '56':$('#56').val(),
                '63':$('#63').val(),
                '80':$('#80').val(),
                '85':$('#85').val(),
                '64':$('#64').val(),
                '34_desc':$("#34 option[value="+$('#34').val()+"]").text(),
                '27_desc':$("#27 option[value="+$('#27').val()+"]").text(),
                '67_desc':$("#67 option[value="+$('#67').val()+"]").text(),
                '16_desc':$("#16 option[value="+$('#16').val()+"]").text(),
                '62_desc':$("#62 option[value="+$('#62').val()+"]").text(),
            },
            function(data){
                updateOverload();
                confirmDiag('编解码设置提交成功');
                updateSubmit("codex_setting_submit", 1);
            }
    );
}

function ajaxPostCaptureSetting()
{
    int_list = new Array(72,73,76,77)
    ret = checkIntValue(int_list);
    if (ret == -1)
    {
        return;
    }
    if (checkCaptureRange()==-1)
    {
        return;
    }

    var i;
    var id_update_list = "";
    var flag = 0;
    var val78 = 0;
    id_all_list = new Array(61,70,71,72,73,74,75,76,77,78)
    for (i=0; i<id_all_list.length; i++)
    {
        cid = id_all_list[i];
        /* 特殊处理5个解码字幕是否显示的参数 */
        if (cid==78)
        {
            cvalue=0;
            for (j=0;j<5;j++)
            {
                id = '78_' + j;
                bitval = ($('#' + id).val()) << j;
                cvalue |= bitval;
            }
            val78 = cvalue;
        }
        else
            cvalue = $("#" + cid).val();
        svalue = $("#" + cid + "_hidden").val();
        if (cvalue != svalue)
        {
            if (flag==0)
            {
                id_update_list=cid;
                flag=1;
            }
            else
            {
                id_update_list=id_update_list+","+cid;
            }
            $("#" + cid + "_hidden").val(cvalue)
        }
    }

    updateSubmit("capture_setting_submit", 0);
    $.post("/goform/configpara", 
            {
                'page': 'tabs-capture-setting',
                "id_lists":id_update_list,
                '61':$('#61').val(),
                '70':$('#70').val(),
                '71':$('#71').val(),
                '72':$('#72').val(),
                '73':$('#73').val(),
                '74':$('#74').val(),
                '75':$('#75').val(),
                '76':$('#76').val(),
                '77':$('#77').val(),
                '78':val78,
            },
            function(data)
            {
                confirmDiag('字幕设置提交成功');
                updateSubmit("capture_setting_submit", 1);
            }
    );
}

var upgrade_done = false;

function submitFileChk(obj, ignore)
{
    if($('#presetFile').val() == '') {
        confirmDiag('升级文件不能为空');
        return ;
    }
    document.form1.action = document.form1.action+"?BWID=" + window.top.name;
    document.form1.submit();
    $('#upgrade_submit_row').css('display', 'none');
    $('#upgrade_progress_row').css('display', '');
    upgrade_done = false;
}

function refreshProgress()
{
    if (upgrade_done) {
        return ;
    }
    
    //Ajax query get progress
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_progress",
        {
            BWID: getBWID()
        },
        function(json){
            if (json.return_code == 'ok') {
                $("#upgrade_progressbar").progressbar("option", "value", parseInt(json.data.progress));
                $("#upgrade_status").html("升级中(" + json.data.progress + "%)...");
                $("#upgrade_tips").html("注意:<span style='color:blue'>升级过程中不能关闭设备电源</span>");
                if (json.data.progress == 100) {
                    confirmDiag('升级文件成功！');
                    $( "#upgrade_status").html("升级完成");
                    $("#upgrade_tips").html("<span style='color:blue'>单击确定， 设备立即\"重启\", 单击\"取消\"， 则稍后重启</span>");
                    $("#upgrade_done_bt").css('display', 'block');
                    upgrade_done = true;
                }
            } else {
                $( "#upgrade_status").html("失败");
                confirmDiag('升级文件失败!<br/>' + json.return_str);
                $('#upgrade_submit_row').css('display', '');
                $('#upgrade_progress_row').css('display', 'none');
                upgrade_done = true;                
            }
        }
    ); 
    
    setTimeout('refreshProgress()', 2000);    
}

function cancelUpgrade()
{
    $('#upgrade_submit_row').css('display', '');
    $('#upgrade_progress_row').css('display', 'none');   
    $("#upgrade_done_bt").css('display', 'none');
}

function updateOverload()
{
    var value = $('#34').val();
    var overload = 0;
    if (value==0)
        overload = 8;
    else if (value==1)
        overload = 0;
    else if (value==2)
        overload = 18;
    $('#valid_load').html(overload);
}

function handleParamProp(type)
{
    if (type==0)
    {
        $("#8").children("option[pid!=0]").each(function(){
            $(this).wrap("<span style='display:none'></span>");
        });
        $("#16").children("option[pid!=0]").each(function(){
            $(this).wrap("<span style='display:none'></span>");
        });
        $("#79").children("option[pid!=0]").each(function(){
            $(this).wrap("<span style='display:none'></span>");
        });
        $("#62").children("option[pid!=0]").each(function(){
            $(this).wrap("<span style='display:none'></span>");
        });
        $("#27").children("option[pid!=0]").each(function(){
            $(this).wrap("<span style='display:none'></span>");
        });
        $('#sd_hd_device').val(type);
    }
    else if (type==1)
    {
        $('#sd_hd_device').val(type);
    }
}


function delMultiRecord()
{
    file_list = false;
    $('input[name="record_sel"]').each(function (){
        if($(this).prop('checked') && typeof this.id != 'undefined') {
            var id_str = this.id;
            var arr = id_str.split('@@', 2);
            if(typeof arr[1] != 'undefined') {
                if (file_list == false) {
                    file_list = arr[1];
                } else {
                    file_list += ',' + arr[1];
                }
            }
        }
    });
    if(file_list)delRecord(file_list);
}
function delRecord(file_list)
{
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>确定删除录像文件吗?</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        modal: true,
        dialogClass: "info_diag",
        title:"删除录像文件",
        buttons: {
            "继续": function() {
			$.post("control/rm_record", 
                    {
                        'file_list':file_list      
                    },
                    function(data){
						$("#diag_div").dialog("close");
						confirmDiag('删除录像文件成功');
						$.cookie('setting_tab_display', '4');
						window.location = 'setting.html';                          
                    }
                );
            },
            "取消": function() {
                $(this).dialog("close");
            }
        }
    });
}

function loadRecord(json)
{
    var str = '';
    var index = 0;
    g_contact_json = json;
    for(var pos = 0; pos < json.data.length; pos++) {
        index = pos+1;
        str += "<tr>";
        id_str = 'id="record@@' + json.data[pos].id + '"';
        str += "<td>&nbsp;&nbsp;<input type='checkbox' " + id_str + "name='record_sel'/></td>";
        str +="<td>" + index + "</td>";
        str +="<td><a href='control/download/record/"+json.data[pos].id+"' " + ">" + json.data[pos].id + "</a></td>";
        str +="<td>" + json.data[pos].size + "</td>";
        del_str = ' onclick="delRecord(\'' + json.data[pos].id + '\')" ';
        str += "<td>&nbsp;&nbsp;<img src='images/delete.png' " + del_str + " /></td>";
        str += "</tr>";
    }

    $('#record_tbody').html(str);
    
    initRecordTable();
}
function initRecordTable()
{
    /* OldTableStyle
    $('#record-table').dataTable({   
        "oLanguage": {
            "sSearch": "搜索:",
            "sLengthMenu": "&nbsp;每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "&nbsp;从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sZeroRecords": "没有检索到数据",
            "sProcessing": "<img src='images/loading.gif' />"
        },*/
	var tableID='record-table';
    $('#record-table').dataTable({
		"sDom": "lfrtpi",
        "oLanguage": {
            "sSearch": "搜索:",
            "sLengthMenu": "&nbsp;每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "&nbsp;共 _PAGES_页,当前第 _PAGE_ 页,跳转至<input type='text' onchange='"+'gotoPage("'+tableID+'",this,_PAGES_)'+"' style='width:40px;text-align:center; vertical-align:middle;' value='_PAGE_'/>页",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "oPaginate": {
                "sFirst": " ",
                "sPrevious": " ",
                "sNext": " ",
                "sLast": " "
            },
            "sZeroRecords": "没有检索到数据",
            "sProcessing": "<img src='images/loading.gif' />"
        },
		"pagingType": "full",//new style end
        "bLengthChange": false,
        "bFilter": true,
        "bSort": false
    });
}

function ajaxLoadRecord()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_record", function(json){
        loadRecord(json);
    });
}

function ajaxLoadRecStatus()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_rec_status", function(json){
        updateRecState(json);
    });
}

function ajaxLoadSubtitle()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_page_parameters",
    {
        BWID: getBWID(),
        page: 'tabs-subtitle-setting',
        list: '61,70,71,72,73,74,75,76,77,78'
    },
    function(json)
    {
        loadValByJson(json);
        value = jsonGetVal(json, 78);
        for (i=0; i<5; i++)
        {
            id = '78_' + i;
            bitval = value & (1<<i);
            bitval = bitval>>i;
            $('#' + id).val(bitval);
        }
    });
}

function handleAudioFormat()
{
    index = $('#audio_format').val()
    if (index==0)
    {
        $('#34 option[value="0"]').show();
        $('#34 option[value="1"]').show();
        $('#34 option[value="2"]').hide();
        $('#34').val($('#34_pid0').val());
    }
    else
    {
        $('#34 option[value="0"]').hide();
        $('#34 option[value="1"]').hide();
        $('#34 option[value="2"]').show();
        $('#34_pid0').val($('#34').val());
        $('#34').val(2);
    }
}

function handleAudioChange()
{
    if ($('#audio_format').val()==0)
    {
        $('#34_pid0').val($('#34').val());
    }
}

function ajaxSendRecCmd(flag)
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/control_rec_cmd",
        {
            BWID: getBWID(),
            flag: flag
        },
        function(json){
        }
    );
}

function updateRecState(json)
{
    bact = json.data[0].recAction;
    if (bact==0)
    {
        $("#cfgRecorder").attr("src","images/recorder_off.png");
        $('#recorderPic').val(0);
    }
    else if (bact==1)
    {
        $("#cfgRecorder").attr("src","images/recorder_on.png");
        $('#recorderPic').val(1);
        queryRecFile();
    }
}

function queryRecFile()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_rec_status", function(json){
        bact  = json.data[0].recAction;
        bfull = json.data[0].diskFull;
        if (bfull==1)
        {
            alert("磁盘已满，停止录像");
            $("#cfgRecorder").attr("src","images/recorder_off.png");
            $('#recorderPic').val(0);
        }

        if ($('#recorderPic').val()==1)
            setTimeout("queryRecFile()", 4000);
    });

}

