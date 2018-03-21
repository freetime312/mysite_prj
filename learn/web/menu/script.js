// Nexus 4 Pure CSS Design
// Author : Erhan Basa ( erhanbasa.com )
// http://erhanbasa.com/blog/css-ile-nexus-4/
$(document).ready(function() {

	/*	Current Tab 	*/
	$('.phone-tabs li a').click(function() {
		$('.phone-tabs li').removeClass('current');
		$(this).parent().addClass('current');
	});

	/*	Simple Tab 	*/
	var tabContents = $('.phone-tab-contents');
	$('.phone-tabs .getphone').click(function() {
		tabContents.removeClass('getpeoples');
		tabContents.removeClass('getclock');
	});

	$('.phone-tabs .getclock').click(function() {
		tabContents.removeClass('getpeoples');
		tabContents.addClass('getclock');

		$.ajaxSetup ({ cache: false });
		$('.overview').load("/control/query_contacts",function(responseTxt,statusTxt,xhr){
		if (statusTxt=="success" && responseTxt!="")
		{
			$(window).resize();
			$('#scrollbar1').tinyscrollbar();
		}
		});

	});

	$('.phone-tabs .getpeoples').click(function() {
		tabContents.removeClass('getclock');
		tabContents.addClass('getpeoples');
	});

	/*	Delete */
	$('.delete-btn').click(function() {
		var numbers = $('.number-area .numbers').text();
		var numbers2 = $('.number-area .numbers').text().length;
		$('.number-area .numbers').text(numbers.substr(0, numbers2 - 1));
	});

	/*	Pusher	*/
	var pusher = {
		number: function(num) {
			$('.numbers-container .pushed' + num + '').click(function() {
				$('.number-area .numbers').append('' + num + '');
			});
		}
	}

	pusher.number(1);
	pusher.number(2);
	pusher.number(3);
	pusher.number(4);
	pusher.number(5);
	pusher.number(6);
	pusher.number(7);
	pusher.number(8);
	pusher.number(9);
	pusher.number(0);

	$('.numbers-container .pushedasterisk').click(function() {
		$('.number-area .numbers').append('*');
	});

	$('.numbers-container .pushednumber').click(function() {
		$('.number-area .numbers').append('#');
	});

	$('#phonecall').click(function() {
		var url = '/control/call_number?num='+$('.number-area .numbers').text();
		var objState=document.getElementById("dialPanelSt");
		var state = objState.value;
		if (state==3)
		{
			$.ajaxSetup ({ cache: false });
			$('#dialLog').load("/control/pickup_call",function(responseTxt,statusTxt,xhr){
				if (statusTxt=="success" && responseTxt!="")
				{
					handle_phone_statue(responseTxt);
				}
			});
		}
		else
		{
			if (state==1 || state==2)
			{
				$.ajaxSetup ({ cache: false });
				$('#dialLog').load("/control/disconnect_number",function(responseTxt,statusTxt,xhr){
					if (statusTxt=="success" && responseTxt!="")
					{
						handle_phone_statue(responseTxt);
					}
				});
				objState.value = 0;
			}
			else
			{
				if ($('.number-area .numbers').text()=="")
					alert("不能拨打空号");
				else
				{
					$.ajaxSetup ({ cache: false });
					$('#dialLog').load(url,function(responseTxt,statusTxt,xhr){
						if (statusTxt=="success" && responseTxt!="")
						{
							handle_phone_statue(responseTxt);
						}
					});
					objState.value = 1;
				}
			}
		}
	});

	$('#phonedisconn').click(function() {
		var objState=document.getElementById("dialPanelSt");
		var state = objState.value;
		if (state == 1 || state==2 || state ==3)
		{
			$.ajaxSetup ({ cache: false });
			$('#dialLog').load("/control/disconnect_number",function(responseTxt,statusTxt,xhr){
				if (statusTxt=="success" && responseTxt!="")
				{
					handle_phone_statue(responseTxt);
				}
			});
			objState.value = 0;
		}
	});

});

function handle_phone_statue(responseTxt)
{
	if (responseTxt=="NotRegist")
	{
		document.getElementById("dialLog").innerHTML="等待注册";
		document.getElementById("dialPanelSt").value=9;
		alert("服务器没有注册成功，不能打电话");
		return;
	}
	var pos = responseTxt.indexOf("&log=");
	var stateStr=responseTxt.substring(0, pos);
	var state = stateStr.substr(4);
	var logStr=responseTxt.slice(pos+5);
	document.getElementById("dialLog").innerHTML=logStr;
	document.getElementById("dialPanelSt").value=state;
}

function dial_from_contact(number)
{
	var objState=document.getElementById("dialPanelSt");
	var state = objState.value;
	if (state==1)
	{
		alert("正在拨号中，请空闲时再拨");
	}
	else
	{
		$('.phone-tabs li').removeClass('current');
		$(this).parent().addClass('current');

		var tabContents = $('.phone-tab-contents');
		tabContents.removeClass('getpeoples');
		tabContents.removeClass('getclock');

		$('.number-area .numbers').text(number);
		$('#phonecall').click();
	}
}

function updateConfigPage(url)
{
	if (url=="queryCallStatus")
	{
		$.ajaxSetup ({ cache: false });
		$('#dialLog').load("/control/query_dial_prog",function(responseTxt,statusTxt,xhr){
			if (statusTxt=="success" && responseTxt!="")
			{
				handle_phone_statue(responseTxt);
			}
		});
	}
	setTimeout("updateConfigPage('"+url+"')", 5000);
}

function queryServerStatus()
{
	$.ajaxSetup ({ cache: false });
	$('#devState').load("/control/query_server_status",function(responseTxt,statusTxt,xhr){
		if (statusTxt=="success" && responseTxt!="")
		{
		}
	});
	setTimeout("queryServerStatus()", 10000);
}
