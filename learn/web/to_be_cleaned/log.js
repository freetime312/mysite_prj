$(document).ready(function (){

    setCurrentApp('log');
    
    initDesktop();
    
    appTabDisplayCookie('log', true);
    
    initAppWin('log_div');
    
    $("#log_tabs").tabs();

    /* OldTableStyle
    $('#sys-log-table').dataTable({   
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
	var tableID='sys-log-table';
    $('#sys-log-table').dataTable({
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
		"aoColumns": [
			{ "sWidth": "15px" },
			{ "sWidth": "30px" },
			{ "sWidth": "60px" },
			{ "sWidth": "140px" },
			null,
			{ "sWidth": "100px" }
		],
        //"stateSave":true,
        "processing": true,
        "serverSide": true,
        "ajax": "control/running_log_query",  
        "bLengthChange": false,
        "searching":true,
        "bFilter": true,
        "bSort": false,
        "columnDefs": [{
                "targets": 0,
                "sortable":false,
                "render": function(data, type, row, meta) {
                    var str = "&nbsp;&nbsp;<input type='checkbox' class='sys_log_sel' name='";
                    str += row[1] + "' />";
                    return str;
                }
        }]
    });
    
    /* OldTableStyle
    $('#alert-log-table').dataTable({   
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
	tableID='alert-log-table';
    $('#alert-log-table').dataTable({
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
		"aoColumns": [
			{ "sWidth": "15px" },
			{ "sWidth": "30px" },
			{ "sWidth": "60px" },
			{ "sWidth": "140px" },
			null,
			{ "sWidth": "100px" }
		],
        //"stateSave":true,
        "processing": true,
        "serverSide": true,
        "ajax": "control/running_log_alert_query",  
        "bLengthChange": false,
        "searching":true,
        "bFilter": true,
        "bSort": false,
        "columnDefs": [{
                "targets": 0,
                "sortable":false,
                "render": function(data, type, row, meta) {
                    var str = "&nbsp;&nbsp;<input type='checkbox' class='alert_log_sel' name='";
                    str += row[1] + "' />";
                    return str;
                }
        }]
    });
    
    tableID='current-alert-table';
    $('#current-alert-table').dataTable({
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
		"aoColumns": [
			{ "sWidth": "15px" },
			{ "sWidth": "30px" },
			{ "sWidth": "60px" },
			{ "sWidth": "140px" },
			null,
		],
        //"stateSave":true,
        "processing": true,
        "serverSide": true,
        "ajax": "control/running_current_alert_query",
        "bLengthChange": false,
        "searching":false,
        "bFilter": true,
        "bSort": false,
        "columnDefs": [{
                "targets": 0,
                "sortable":false,
                "render": function(data, type, row, meta) {
                    //var str = "&nbsp;&nbsp;<input type='checkbox' class='alert_log_sel' name='";
                    //str += row[1] + "' />";
                    var str = "&nbsp;&nbsp;";
                    return str;
                }
        }]
    });

    $(".table_date_picker").datepicker({
        monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],   //月份名称简称，用于选择月份时显示
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],   //日期名称简称
        dateFormat: 'yy-mm-dd',   //选中日期后，已这个格式显示
        changeMonth: true,     //可以选择月份
        changeYear: true       //可以选择年份
    });
    
    $('#sys_log_filter_bt').click(function (){
        var start_date = $('#sys_log_start_date').val();
        var end_date = $('#sys_log_end_date').val();
        var table = $('#sys-log-table').DataTable();
        if (start_date=='')
        {
            alert("开始时间为空，请设置");
            return;
        }
        if (end_date=='')
        {
            alert("结束时间为空，请设置");
            return;
        }

        if (start_date != '' || end_date != '') {
            var val = start_date + ':' +  end_date;
        } else  {
            var val = '';
        }
        $('#sys_log_date_value').val(val);
        table.search(val, true, true).draw();
    });
    
    $('#sys_log_filter_clear').click(function (){
        $('#sys_log_start_date').val('');
        $('#sys_log_end_date').val('');
		$('#sys_log_date_value').val('');
        var table = $('#sys-log-table').DataTable();
        table.search('', true, true).draw();        
    });
	
	$('#sys_log_export').click(function (){
		var date_value = $('#sys_log_date_value').val();
		window.open('control/download/running_log?date=' +date_value,'_blank');
	});

    $('#alert_log_filter_bt').click(function (){
        var start_date = $('#alert_log_start_date').val();
        var end_date = $('#alert_log_end_date').val();
        var table = $('#alert-log-table').DataTable();
        if (start_date=='')
        {
            alert("开始时间为空，请设置");
            return;
        }
        if (end_date=='')
        {
            alert("结束时间为空，请设置");
            return;
        }

        if (start_date != '' || end_date != '') {
            var val = start_date + ':' +  end_date;
        } else  {
            var val = '';
        }
        $('#alert_log_date_value').val(val);
        table.search(val, true, true).draw();
    });
    
    $('#alert_log_filter_clear').click(function (){
        $('#alert_log_start_date').val('');
        $('#alert_log_end_date').val('');
		$('#alert_log_date_value').val('');
        var table = $('#alert-log-table').DataTable();
        table.search('', true, true).draw();        
    });
	
	$('#alert_log_export').click(function (){
		var date_value = $('#alert_log_date_value').val();
		window.open('control/download/running_log?date=' +date_value,'_blank');
	});

    $('.sys_log_sel_all').click(function (){
        if ($(this).prop('checked') == true) {
            $('.sys_log_sel').each(function () {
                $(this).prop('checked', true);
            });
        } else {
            $('.sys_log_sel').each(function () {
                $(this).prop('checked', false);
            });        
        }
    });

    $('.alert_log_sel_all').click(function (){
        if ($(this).prop('checked') == true) {
            $('.alert_log_sel').each(function () {
                $(this).prop('checked', true);
            });
        } else {
            $('.alert_log_sel').each(function () {
                $(this).prop('checked', false);
            });        
        }
    });

    $('#sys_log_del').click(function (){
        sys_log_del_str = '';
        $('.sys_log_sel').each(function (){
            if ($(this).prop('checked') == true && !$(this).hasClass('sys_log_sel_all')) {
                if (sys_log_del_str == '') {
                    sys_log_del_str = $(this).prop('name');
                } else {
                    sys_log_del_str += ',' + $(this).prop('name');
                }
            }
        });
        if (sys_log_del_str == '') {
            ;
        } else {
            delSysLog(sys_log_del_str);
        }
    });

    $('#alert_log_del').click(function (){
        
        alert_log_del_str = '';
        $('.alert_log_sel').each(function (){
            if ($(this).prop('checked') == true && !$(this).hasClass('alert_log_sel_all')) {
                if (alert_log_del_str == '') {
                    alert_log_del_str = $(this).prop('name');
                } else {
                    alert_log_del_str += ',' + $(this).prop('name');
                }
            }
        });
        if (alert_log_del_str == '') {
            ;
        } else {
            delAlertLog(alert_log_del_str);
        }
    });

    if (typeof $.cookie('log_tab_display') != 'undefined') {
        $("#log_tabs").tabs( "option", "active", $.cookie('log_tab_display'));
        $.removeCookie('log_tab_display');
    }
    
});


function delSysLog(id_list)
{
    
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>确定删除系统日志吗? 删除后不能恢复。</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        width:320,
        modal: true,
        dialogClass: "info_diag",
        title:"删除系统日志",
        buttons: {
            "继续": function() {
                $.post("control/rm_sys_log", 
                    {
                        'id':id_list      
                    },
                    function(data){
                        $("#diag_div").dialog("close");
                        confirmDiag('删除系统日志成功');
                        $.cookie('log_tab_display', '2');
                        window.location = 'log.html';                         
                    }
                );    
            },
            "取消": function() {
                $(this).dialog("close");
            }
        }
    });
}

function delAlertLog(id_list)
{
    
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>确定删除告警日志吗？删除后不能恢复。</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        width:320,
        modal: true,
        dialogClass: "info_diag",
        title:"删除告警日志",
        buttons: {
            "继续": function() {
                $.post("control/rm_alert_log", 
                    {
                        'id':id_list      
                    },
                    function(data){
                        $("#diag_div").dialog("close");
                        confirmDiag('删除告警日志成功');
                        $.cookie('log_tab_display', '1');
                        window.location = 'log.html';                           
                    }
                );
            },
            "取消": function() {
                $(this).dialog("close");
            }
        }
    });
}
