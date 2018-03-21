
function loadTabPages(obj)
{
    var app_tab_html = '';
    for (var i = 0; i < obj.apps.length; i++) {
        if(typeof obj.apps[i].onclick == 'function') {
            $("#app_ico_" + obj.apps[i].id).click(obj.apps[i].onclick);
        }
        app_tab_html += "<div class='app_tab' id='app_tab_";
        app_tab_html += obj.apps[i].id + "'>"+ obj.apps[i].text + "</div>";
    }
    $('#app_tabs_div').html(app_tab_html);
    for (var i = 0; i < obj.apps.length; i++) {
        $('#app_tab_' + obj.apps[i].id).css('display','block'); 
        if (getCurrentApp() == obj.apps[i].id) {
            $("#app_tab_" + obj.apps[i].id).addClass('app_tab_active');
        } else {
            if (typeof obj.apps[i].onclick == 'function') {
                $("#app_tab_" + obj.apps[i].id).click(obj.apps[i].onclick);
            }
        }
    }
}

var currentApp = null;
function setCurrentApp(app)
{
    currentApp = app;
}

function getCurrentApp()
{
    return currentApp;
}

function confirmDiag(str)
{
    $("#diag_content").html('<p><span class="ui-icon ui-icon-info" ' + 
     'style="float:left; margin:0 7px 20px 0;"></span>' + str + '</p>');
     
    $("#diag_div").dialog({
        resizable: false,
        height:200,
        modal: true,
        dialogClass: "info_diag",
        title:"",
        buttons: {
            "确定": function() {
                $(this).dialog("close");
            }             
        }
    });  
}

function initVersionInfo()
{
    $('#aboutLogo').click(function (){
    
        $("#diag_content").html('<p><span class="ver_1"></span></br></br>' + 
         '<span class="ver_2">软件版本:</span><span class="ver_3">1.0.0</span><br/></br>' + 
         '<span class="ver_2">版权所有:</span><span class="ver_3">北京惠祥和技术有限公司</span><br/></br>' + 
         '</p>');
         
        $("#diag_div").dialog({
            resizable: false,
            height:260,
            width:350,
            modal: true,
            dialogClass: "info_diag",
            title:"版本信息",
            buttons: {
                "确定": function() {
                    $(this).dialog("close");
                }              
            }
        });  
    })
}

function initHeader()
{
    var user_name = $.cookie("userName");
    var header_html = "<div>" +
    "<span>&nbsp;</span>" +
    "<img src='images/harmony.png' id='aboutLogo'>" +
    "<div id='info'><table><tr>" + 
         "<td>" + 
         "<img src='images/current_user.png'>" + 
         "<span id='username'>"+user_name+"</span>" + 
         "<a href='control/logoff?BWID="+ window.top.name + "' style='color:#8DBEEB' onmouseout=this.style.color='#8DBEEB';  onmouseover=this.style.color='#FFFFFF'>注销</a>" +
         "</td>" + 
    "</tr></table>" +
    "</div>" +
    "</div><div id='app_tabs_div'></div>";

    $('#header').html(header_html);
    document.title = "自动化测试平台"
}

function initFooter()
{
    var footer_html = "<div>北京惠祥和科技有限公司</div>";
    
    $('#footer').html(footer_html);
}

function initDesktop()
{
    initHeader();

    initFooter();

    loadTabPages({
        apps:[
            {
               id:"home",
               text:'首页',
               onclick: function () {
                   window.location = 'home.html';
               }
            },
            {
               id:"task",
               text:'任务管理',
               onclick: function () {
                    window.location = 'task.html';
               }
            },
            {
               id:"devices",
               text:'设备管理',
               onclick: function () {
                    window.location = 'devices.html';
               }
            },
            {
               id:"setting",
               text:'系统设置',
               onclick: function () {
                   window.location = 'setting.html';
               }
            },         
            {
               id:"help",
               text:'帮助',
               onclick: function () {
                   window.location = 'help.html';
               }
            }

        ]
    });

    initVersionInfo();
}
function newdev()
{
         $("#diag_content").html('<p><form action="/devices/dev_add/" method="post"><span class="ver_1"></span></br></br>' +
         '<span class="ver_2">设备类型:</span><span class="ver_3"><input type="text" placeholder="设备类型" name="dev_type" required></span><br/></br>' + 
         '<span class="ver_2">设备名称:</span><span class="ver_3"><input type="text" placeholder="输入设备名称" name="dev_name" required></span><br/></br>' + 
         '<span class="ver_2">串口名称:</span><span class="ver_3"><input type="text" placeholder="输入串口名称" name="serial_name" required></span><br/></br>' + 
         '<span class="ver_2">电源端口:</span><span class="ver_3"><input type="text" placeholder="输入电源端口" name="power_port" required></span><br/></br>' + 
         '<span class="ver_2">电源ip:</span><span class="ver_3"><input type="text" placeholder="输入电源ip" name="power_ip" required></span><br/></br>' +
         '<span class="ver_2">IP地址&emsp;:</span><span class="ver_3"><input type="text" placeholder="输入IP地址" name="dev_ip" required></span><br/></br>' +
         '<button id="addadev" type="submit">提交</button>'+ '</form></p>');
           $("#diag_div").dialog({
            resizable: false,
            height:400,
            width:450,
            modal: true,
            dialogClass: "info_diag",
            title:"新增设备",
            buttons:{
             "确定": function() {
            $.post("device/add_dev", 
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
function newtest()
{
          $("#diag_content").html('<p><span class="ver_1"></span></br></br>' + 
         '<span class="ver_2">选择测试类型:</span><span class="ver_3"><select><option value="basic">Basic_test</option><option value="compile">Compile_test</option><option value="test">test_demo</option></select></span><br/></br>' + 
         '<span class="ver_2">设置测试分支:</span><span class="ver_3"><input type="text" placeholder="输入设备名称" name="devname" required></span><br/></br>' + 
         '<span class="ver_2">选择测试硬件:</span><span class="ver_3"><p><input type="checkbox" name="zed" value="0" /> avnet-zed 0</p><p><input type="checkbox" name="zed" value="1" /> avnet-zed 1</p><p><input type="checkbox" name="zed" value="2" /> avnet-zed 2</p><p><input type="checkbox" name="ft" value="0" /> gw_ft1500a 0</p><p><input type="checkbox" name="ft" value="1" /> gw_ft1500a 1</p><p><input type="checkbox" name="ti" value="0" /> ti_uevm5432 0</p></span><br/></br>' +'</p>');
           $("#diag_div").dialog({
            resizable: false,
            height:530,
            width:450,
            modal: true,
            dialogClass: "info_diag",
            title:"创建新测试",
            buttons: {
                "创建": function() {
                    $(this).dialog("submit");
                },
                "取消": function() {
                    $(this).dialog("close");
                }            
          }

        });
}
function basic1()
{
$(document).ready(function(){
  $("#basic").click(function(){
    $("#basic_test").toggle();
  });
});
}
function compile()
{
    $("#compile_test").toggle();
}
function demo()
{
    $("#test_demo").toggle();
}