$(document).ready(function (){

    setCurrentApp('setting');
    
    initDesktop();
    
    appTabDisplayCookie('setting', true);
    
    initAppWin('setting_div');
    
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

    ajaxLoadRecord();
	
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
	var test_json = {
    "total_record_number": "10",
    "total_page_number": "2",
    "curentpage_record_number": "2",
    "data": [
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call001",
            "sip001"
        ],
        [
            "call002",
            "sip002"
        ]
    ]
	}
    loadRecord(test_json);
	return ;
    $.ajaxSetup ({ cache: false });
    $.getJSON("control/query_record", function(json){
        loadRecord(json);
    });
}

