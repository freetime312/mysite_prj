<html>
<head>
	<META HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"/>
	<title>Login Page</title>
	<link rel="stylesheet" type="text/css" href="style/control.css">
	<script type="text/javascript" src="menu/mtmtrack.js"></script>
	<script type="text/javascript" src="menu/mtmcode.js"></script>
	<script type="text/javascript" src="update/prototype.js"></script>
	<script type="text/javascript" src="update/update.js"></script>
	<style>
		body{
			margin:0px;
			padding:0px;
		}
		.bg{
			position: absolute;
			top:0;
			left:0;
			z-index: -1;
			width: 100%;
			height: 100%;
			margin: 0px;
		}

		.loginbox {position:relative; width: 392px; height: 222px; margin: 0 auto; background-image: url('images/login_bgd.png')}
		.logintext {position:absolute; left:74px; width:212px; height:31px}
		.loginbt {position:absolute; left:305px; top:123px; width:60px;height:44px;cursor:pointer;border:0px;}
		.loginuser {position:absolute; left:32px; top:118px}
		.loginpass {position:absolute; left:32px; top:156px}
		.logintype {position:absolute; left:46px; top:25px}
	</style>
	<script type="text/javascript">
	if(window.top.name.indexOf("BWID") == -1)
	{
		var d = new Date();	
		var t = d.getTime();
		window.top.name = "BWID" + t;
	}
	function listSession()
	{
		window.location="/control/listSession";
	}
	function logon(event){
		if(event.keyCode==13){
			userLogonCheck();
		}
	}
	</script>
</head>
<body>
	<img class="bg" src="images/bg_1440_900.png"/>
	<table style="border-width:0px" height=100% width=100% border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="center">
			<table border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<div id="wrap" class="loginbox">
							<img class="logintype" id="imgHead">
							<img class="loginuser" src="images/login_user.png" id="imgUser">
							<img class="loginpass" src="images/login_pass.png" id="imgPass">
							<input type="text" class="logintext" id="userName" style="top:114px;">
							<input type="password" class="logintext" id="password" style="top:154px;" onkeyup="logon(event);">
							<input type="button" class="loginbt" style="background-image:url('images/dl3.png')" onclick="userLogonCheck()">
						</div>

					</td>
				</tr>
			</table>
			</td>
		</tr>
	</table>

</body>
<script>
	var userName = getCookie("logonUser");
	if(userName == null)
		userName = "admin";
	document.getElementById("userName").value = userName;

	var dftPassword = getCookie("logonPass");
	if(dftPassword != null)
	{
		document.getElementById("password").value = dftPassword;
	}

	var requestUrl = "control/query_device_type";
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		onSuccess: function(transport)
		{
			data = transport.responseText;
			reCat = /\{ \"dType\":(\d+) \}/i;
			arr =reCat.exec(data);
			type = arr[1];
			obj = document.getElementById("imgHead")
			if (type==0)
				obj.src = "images/head3_mobile.png";
			else if (type==1)
				obj.src = "images/head3_incar.png";
			else if (type==2)
				obj.src = "images/head3_fixed.png";
		},
		onFailure: function()
		{
			alert("Fail");
		}
	}
	);
</script>
</html>

