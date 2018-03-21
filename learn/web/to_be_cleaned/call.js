var isloading = true;
$(document).ready(function (){

    setCurrentApp('call');
    initDesktop();
    appTabDisplayCookie('call', true);
    initAppWin('call_div');
    $("#call_tabs").tabs({
        activate:function (event, ui) {
            if(ui.newPanel.selector == '#tabs-call-history') {
                if(!isloading){
                    $.cookie('call_tab_display', '1');
                    window.location = 'call.html';
                }
            } else if (ui.newPanel.selector == '#tabs-call-contact') {
                ;
            }
        }
    });
    
    //initCallHistoryTable();
    //initCallContactTable();

    $('.sel_all').change(function (){
        if (this.checked) {
           $('input[name="' + this.name + '"]').prop('checked', true);
        } else {
           $('input[name="' + this.name + '"]').prop('checked', false);
        }
    });
    
    $('#call_bt_op').click(function (){
/*
        $('#call_param_div').css('display', 'block');
        $('#call_panel_div').css('display', 'none');
        $('#call_state_div').css('display', 'none');
*/
        $('#call_bt_op').load("/control/adjust_in_calling", function(responseTxt,statusTxt,xhr){
            if (statusTxt=="success" && responseTxt!="")
            {
            }
        });
    });
    
    $('#call_bt_panel').click(function (){
/*
        if( $('#call_stop_bt').css('display') == 'none') {
            $('#call_param_div').css('display', 'none');
            $('#call_panel_div').css('display', 'block');
        } else {
            $('#call_param_div').css('display', 'none');
            $('#call_panel_div').css('display', 'none'); 
            $('#call_state_div').css('display', 'block');            
        }
*/
        $('#call_bt_panel').load("/control/recover_in_calling", function(responseTxt,statusTxt,xhr){
            if (statusTxt=="success" && responseTxt!="")
            {
            }
        });
    });

    $('.p_num').click(function (){
        var input = $(this).attr('name');
        var str = $('#call_input_num').val() + input;
        $('#call_input_num').val(str);
    });

    $('#call_num_del').click(function (){
        var str = $('#call_input_num').val();
        if (str.length > 0) {
            $('#call_input_num').val(str.substr(0, str.length - 1));
        }
    });
    ajaxLoadCallHistory();
    ajaxLoadCallContact();
    callStatusPoll();
    if (typeof $.cookie('call_tab_display') != 'undefined') {
        $("#call_tabs").tabs( "option", "active", $.cookie('call_tab_display'));
        $.removeCookie('call_tab_display');
    }
    isloading=false;
});

var g_call_panel = 0;

function callStart()
{
    $('#call_param_div').css('display', 'none');
    $('#call_panel_div').css('display', 'none');
    $('#call_state_div').css('display', 'block');
    $('#call_start_bt').css('display', 'none');
    $('#call_stop_bt').css('display', 'block');
    $('#call_bt_2').css('display', 'block');  
    $('#call_bt_3').css('display', 'none');           
    g_call_panel = 1;
}

function callStop()
{
    $('#call_param_div').css('display', 'none');
    $('#call_panel_div').css('display', 'block');
    $('#call_state_div').css('display', 'none');
    $('#call_start_bt').css('display', 'block');
    $('#call_stop_bt').css('display', 'none'); 
    $('#call_bt_2').css('display', 'block');  
    $('#call_bt_3').css('display', 'none');          

    $('#calling_state').val(0);
    g_call_panel = 0;
}
function initCallHistoryTable()
{
	/* OldTableStyle
    $('#call-history-table').dataTable({   
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
            "sProcessing": "<img src='images/loading.gif' />",
			"sSearchPlaceholder": "请输入姓名或电话号码"
        },*/
	var tableID='call-history-table';
    $('#call-history-table').dataTable({
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
            "sProcessing": "<img src='images/loading.gif' />",
			"sSearchPlaceholder": "请输入姓名或电话号码"
        },
		"pagingType": "full",//new style end
        "bLengthChange": false,
        "bFilter": true,
        "bSort": false
    });
	var deleteButton = '<img src="images/delete.png" onclick="delMultiCallHist()" style="float:right;cursor: pointer;height:24px;"/>';
	document.getElementById('call-history-table_filter').insertAdjacentHTML("afterEnd",deleteButton); 
}

function initCallContactTable()
{
	/* OldTableStyle
    $('#call-contact-table').dataTable({   
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
            "sProcessing": "<img src='images/loading.gif' />",
			"sSearchPlaceholder": "请输入姓名或电话号码"
        },*/
	var tableID='call-contact-table';
    $('#call-contact-table').dataTable({
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
            "sProcessing": "<img src='images/loading.gif' />",
			"sSearchPlaceholder": "请输入姓名或电话号码"
        },
		"pagingType": "full",//new style end
        "bLengthChange": false,
        "bFilter": true,
        "bSort": false
    });
	var addButton = '<img src="images/add.png" onclick="addCallContact()" style="float:right;cursor: pointer;height:24px;"/>';
	document.getElementById('call-contact-table_filter').insertAdjacentHTML("afterEnd",addButton); 
	var deleteButton = '<img src="images/delete.png" onclick="delMultiCallContact()" style="float:right;cursor: pointer;height:24px;"/>';
	document.getElementById('call-contact-table_filter').insertAdjacentHTML("afterEnd",deleteButton); 
}

function modifyFunc(seq, urlname, user, phone)
{
    var ms = 'onclick="modifyContact(\'' + seq + '\',';
    ms += '\'' + urlname + '\',';
    ms += '\'' + user + '\',';
    ms += '\'' + phone + '\')';
    ms += '"';

    return ms;
}

var g_contact_json = null;

function loadCallContact(json)
{
    var str = '';
	var index = 0;
    g_contact_json = json;
    for(var pos = 0; pos < json.data.length; pos++) {
	    index = pos+1;
        str += "<tr>";
        id_str = 'id="callct@@' + json.data[pos][0] + '"';
        str += "<td>&nbsp;&nbsp;<input type='checkbox' " + id_str + "name='call_ct_sel'/></td>";
        str +="<td>" + index + "</td>";
 //no need sip name anymore       str +="<td>" + json.data[pos][1] + "</td>";
        str +="<td>" + json.data[pos][2] + "</td>";
        str +="<td>" + json.data[pos][3] + "</td>";
        call_str = ' onclick="requestCall(\'' + json.data[pos][2] + '\', \'' + json.data[pos][3] + '\')" ';
        str += "<td>&nbsp;&nbsp;<img src='images/phone.png' " + call_str+"/></td>";
        del_str = ' onclick="delCallContact(\'' + json.data[pos][0] + '\')" ';
        modify_str = modifyFunc(json.data[pos][0], json.data[pos][1], json.data[pos][2], json.data[pos][3]);
        str += "<td><img src='images/modify.png' " + modify_str + " /><img src='images/delete.png' " + del_str + " /></td>";
        str += "</tr>";
    }

    $('#call_contact_tbody').html(str);
    
    initCallContactTable();
}


function loadCallHistory(json)
{
    var str = '';
    var index  = 0;
    for(var pos = 0; pos < json.data.length; pos++) {
        index = pos + 1;
        str += "<tr>";
        id_str = 'id="callct@@' + json.data[pos][0] + '"';
        str += "<td>&nbsp;&nbsp;<input type='checkbox' " + id_str +" name='call_hist_sel'/></td>";
        str +="<td>" + index + "</td>";
        str +="<td>" + json.data[pos][1] + "</td>";
        str +="<td>" + json.data[pos][2] + "</td>";
        str +="<td>" + json.data[pos][3] + "</td>";
        str +="<td>" + json.data[pos][4] + "</td>";
		if(typeof json.data[pos][5] == 'undefined') {
			str +="<td>" + json.data[pos][5] + "</td>";
		}else{
			var imagePath;
			switch(json.data[pos][5]){
				case '来电':
					imagePath='images/phone.png';
					break;
				case '去电':
					imagePath='images/phone.png';
					break;
				default:
					imagePath='images/phone.png';
			}
			str +="<td><img src='"+imagePath+"' style='cursor: unset;'/></td>";
		}
        del_str = ' onclick="delCallHistory(\'' + json.data[pos][0] + '\')" ';
        call_str = ' onclick="requestCall(\'' + json.data[pos][1] + '\', \'' + json.data[pos][2] + '\')" ';
        str += "<td>&nbsp;&nbsp;<img src='images/phone.png' " + call_str + "/>";
        str += "<img src='images/delete.png' " + del_str + "/></td>";
        str += "</tr>";
    }

    $('#call_history_tbody').html(str);
    initCallHistoryTable();
}

function delCallHistory(id_list)
{
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>确定删除通话记录吗?</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        modal: true,
        dialogClass: "info_diag",
        title:"删除通话记录",
        buttons: {
            "继续": function() {
                $.post("control/rm_dial_history", 
                    {
                        'id':id_list      
                    },
                    function(data){
                        $("#diag_div").dialog("close");
                        confirmDiag('删除通话记录成功');
                        $.cookie('call_tab_display', '1');
                        window.location = 'call.html';
                    }
                );
            },
            "取消": function() {
                $(this).dialog("close");
            }
        }
    });
}

function delCallContact(id_list)
{
    
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>确定删除联系人吗?</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        modal: true,
        dialogClass: "info_diag",
        title:"删除联系人",
        buttons: {
            "继续": function() {
                $.post("control/deleteNumber", 
                    {
                        'id':id_list      
                    },
                    function(data){
                        $("#diag_div").dialog("close");
                        confirmDiag('删除联系人成功');
                        $.cookie('call_tab_display', '2');
                        window.location = 'call.html';
                    }
                );    
            },
            "取消": function() {
                $(this).dialog("close");
            }
        }
    });
}

function delMultiCallContact()
{
    id_list = false;
    $('input[name="call_ct_sel"]').each(function (){
        if($(this).prop('checked') && typeof this.id != 'undefined') {
            var id_str = this.id;
            var arr = id_str.split('@@', 2);
            if(typeof arr[1] != 'undefined') {
                if (id_list == false) {
                    id_list = arr[1];
                } else {
                    id_list += ',' + arr[1];
                }
            }
        }
    });
    delCallContact(id_list);
}

function delMultiCallHist()
{
    id_list = false;
    $('input[name="call_hist_sel"]').each(function (){
        if($(this).prop('checked') && typeof this.id != 'undefined') {
            var id_str = this.id;
            var arr = id_str.split('@@', 2);
            if(typeof arr[1] != 'undefined') {
                if (id_list == false) {
                    id_list = arr[1];
                } else {
                    id_list += ',' + arr[1];
                }
            }
        }
    });
    
    delCallHistory(id_list);
}
function ajaxLoadCallContact()
{
   /*
    var test_json = {
    "total_record_number": "10",
    "total_page_number": "2",
    "curentpage_record_number": "2",
    "data": [
        [
            "call001",
            "sip001",
            "张三",
            "13410482195"
        ],
        [
            "call002",
            "sip002",
            "李四",
            "13910482195"
        ]
    ]
   }
    loadCallContact(test_json);
    return ;
  */
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/listNumber", function(json){
        loadCallContact(json);
    });
}

function ajaxLoadCallHistory()
{
   /*
    var test_json = {
    "total_record_number": "10",
    "total_page_number": "2",
    "curentpage_record_number": "2",
    "data": [
        [
            "sip001",
            "张三",
            "13410482195",
            "2008-05-07 14:55:57",
            "已接"
        ],
        [
            "sip002",
            "李四",
            "13910482195",
            "2008-05-07 14:55:57",
            "未接"
        ]
    ]
   }
    loadCallHistory(test_json);
    return ;
   */
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_dial_history", function(json){
        loadCallHistory(json);
    });
}

function addCallContact()
{
    $("#add_contact").dialog({
        resizable: false,
        width:320,
        height:220,
        modal: true,
        dialogClass: "info_diag",
        title:"添加联系人",
        buttons: {
            "确定": function() { 
                $(this).dialog("close");
                $.post("control/addNumber", 
                    {
                        'usr_name':$('#adding_user').val(),
                        'phone_number':$('#adding_phone').val()                       
                    },
                    function(data){
                        $("#add_contact").dialog("close");
                        confirmDiag('添加联系人成功');
                        $.cookie('call_tab_display', '2');
                        window.location = 'call.html';
                    }
                );
            },
            "取消": function() {
                $(this).dialog("close");
            }                
        }
    });  
}


function modifyContact(seq, urlname, user, phone)
{
    $('#modify_urlname').val(urlname);
    $('#modify_user').val(user);
    $('#modify_phone').val(phone);
    
    $("#modify_contact").dialog({
        resizable: false,
        width:320,
        height:300,
        modal: true,
        dialogClass: "info_diag",
        title:"编辑联系人",
        buttons: {
            "确定": function() { 
                $(this).dialog("close");
                $.post("control/modifyNumber", 
                    {
                        'numberElem':seq,
                        'usr_name':$('#modify_user').val(),
                        'phone_number':$('#modify_phone').val()                             
                    },
                    function(data){
                        $("#modify_contact").dialog("close");
                        confirmDiag('修改联系人成功');
                        $.cookie('call_tab_display', '2');
                        window.location = 'call.html';                        
                    }
                );
            },
            "取消": function() {
                $(this).dialog("close");
            }                
        }
    });  
}

function requestCall(name, number)
{
    $("#call_tabs").tabs( "option", "active", 0);
    $('#calling_name').html(name);
    $('#calling_num').html(number);
    $('#calling_message').html("");
    if(number.length == 0)
    {
        confirmDiag('号码是空号，请输入号码后再拨打');
        return false;
    }
    $('#calling_status').html("连接中 <img src='images/connecting.gif' height='10px'>");
    callStart();

    $.post("control/call_number", 
        {
            'num':number                           
        },
        function(data){
            s1 = data.substring(0, 1);
            val = parseInt(s1);
            if (val!=0)
            {
                callStop();
                s2 = data.substring(2);
                alert(s2);
            }
        }
    );
}

function getCallNamebyNumber(num)
{
    if (g_contact_json == null) {
        return false;
    }
    
    for (var pos = 0; pos < g_contact_json.data.length; pos++) {
        if (g_contact_json.data[pos][3] == num) {
            return g_contact_json.data[pos][2];
        }
    }
    
    return false;
}

function callStopFromPanel()
{
    callDisconnect();
    callStop();
}

function callStartFromPanel()
{
    var number = $('#call_input_num').val();
    var name  = getCallNamebyNumber(number);
    if (!name) {
       name = '未知用户';
    }
    requestCall(name, number);
}


function callStatusPoll()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_dial_prog", function(json){
        state = $('#calling_state').val();
        if (json.status == 1) {
            $('#calling_state').val(json.status);
            $('#calling_name').html(json.name);
            $('#calling_num').html(json.number);
            $('#calling_status').html("连接中 <img src='images/connecting.gif' height='10px'>");
        } else if (json.status == 2) {
            $('#calling_state').val(json.status);
            if (state==0)
            {
                callStart();
            }
            else if (state==3)
            {
                $('#call_bt_2').css('display', 'block');
                $('#call_bt_3').css('display', 'none');
            }
            else
            {
                if (g_call_panel==0)
                    callStart();
            }
            var name = getCallNamebyNumber(json.number);
            if (!name) {
                name = '未知用户';
            }
            $('#calling_name').html(name);
            $('#calling_num').html(json.number);
            $('#calling_status').html("通话中");
            $('#call_start_bt').css('display', 'none');
            $('#call_stop_bt').css('display', 'block');            
            adjustFlag = json.adjustSt;
            if (adjustFlag==0)
            {
                $('#calling_message').html("");
            }
            else if (adjustFlag==1)
            {
                $('#calling_message').html("被调整成功");
            }
            else if (adjustFlag==2)
            {
                $('#calling_message').html("被调整条件未满足");
            }
        } else if (json.status == 3) {
            $('#calling_state').val(json.status);
            $('#calling_status').html("来电 <img src='images/connecting.gif' height='10px'>"); 
            $("#call_tabs").tabs( "option", "active", 0); 
            callStart();

            $('#calling_num').html(json.number);
            $('#calling_message').html("");
            var number = $('#calling_num').html();
            var name  = getCallNamebyNumber(number);
            if (!name) {
                name = '未知用户';
            }
            $('#calling_name').html(name);

            $('#call_bt_2').css('display', 'none');
            $('#call_bt_3').css('display', 'block');
        } else if (json.status == 0) {
            if (state>0)
            {
                callStop();
            }
        }
    });
    setTimeout('callStatusPoll()', 3000);
}

function callAnwser()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/pickup_call", function(json){
        $('#calling_status').html("通话中");
    });
}

function callDisconnect()
{
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/disconnect_number", function(json){
         if (json.status == 0) {
             callStop();
         }
    });
}

