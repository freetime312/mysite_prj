/* global variables */
var cfgTimerId;
cfgTimerId = null;
var upgradeTimerId;
upgradeTimerId = null;

/* for updateParam() */
var g_numParamsTotal;
var g_numParamsUpdated;
g_numParamsTotal = 0;
g_numParamsUpdated = 0;

function updateInputs(url)
{	
	requestUrl = "/control/update/inputs?objList="+url+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			strList = response.split("&");	

			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{							
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";					
				}
			}

			for(i=0; i< strList.length-1; i++)
			{
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage";
				}
				if(strList[i] == "No Change")
				{
					return;
				}
			}		
		},
		onFailure: function()
		{
		
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);		
	}
	setTimeout("updateInputs('"+url+"')", refreshRate*1000);
}
function updateCfg(url)
{	
	requestUrl = "/control/update/cfg?objList="+url+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			strList = response.split("&");	

			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{							
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";			
				}
			}

			for(i=0; i< strList.length-1; i++)
			{
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage";
				}
				if(strList[i] == "No Change")
				{
					return;
				}
			}
		},
		onFailure: function()
		{
		
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);		
	}
	cfgTimerId = setTimeout("updateCfg('"+url+"')", refreshRate*1000);
}
function updateSlot(url)
{	
	requestUrl = "/control/update/slot?objList="+url+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			strList = response.split("&");	

			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{							
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";					
				}
			}

			for(i=0; i< strList.length-1; i++)
			{
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage";
				}
				if(strList[i] == "No Change")
				{
					return;
				}
			}
			
		},
		onFailure: function()
		{
		
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);		
	}
	setTimeout("updateSlot('"+url+"')", refreshRate*1000);
}
function updateSYS()
{	
	requestUrl = "/control/update/sys"+"?BWID="+window.top.name;
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);		
	}
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;				
			strList = response.split("&");			
			subStr = strList[strList.length-1];			
			brtStrList = subStr.split("=");
			if(brtStrList[0] == "BRT")
			{
				isReload = brtStrList[1];
				if(isReload == "true")
				{					
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";
				}
			}
			subStr = strList[0];
			if(subStr == "Reload")
			{
				document.location.reload();						
			}
			setTimeout("updateSYS()", refreshRate*1000);
		},
		onFailure: function()
		{
			setTimeout("updateSYS()", refreshRate*1000);
		}
	}
	);
}

function updateFrame(url)
{
	requestUrl = "/control/update/frame?objList=" + url+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{	
			var isPageRefreshed = 0;
			var response = transport.responseText;
			strList = response.split("&");
			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";					
				}
			}
			for(i=0; i<strList.length-1; i++)
			{
				
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage";
					return;
				}
				else if(strList[i] == "No Change")
				{
					return;
				}				
				else
				{
					if(isPageRefreshed == 0)
						isPageRefreshed = 1;
				}
					
				subStrList = strList[i].split("=");
				nm = subStrList[0];
				val = subStrList[1];			

				if(nm.indexOf("slot") == 0)
				{
					slotStr = nm.split(".");
					slotNum = slotStr[1];
					property = slotStr[2];
					
					if(val == "empty")
					{
						$("slot."+slotNum).style.backgroundColor = "black";
						$("slot."+slotNum).innerHTML = "<div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:lime;\">EMPTY</div>";
					}
					else
					{
						valueStrList = val.split("?");
						slotName = valueStrList[0];
						objList = valueStrList[1].split(".");
						alarmPriority = parseInt(valueStrList[2]);
						if(alarmPriority == 0)
						{
							
							$("slot."+slotNum).style.backgroundColor = "lime";
							$("slot."+slotNum).innerHTML = "<a href='/control/frame/slot/index.htm?frameId="+objList[1]+"&slotId="+objList[2]+"'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:black;\">"+slotName+"</div></a>";	
						}
						else
						{
							if(alarmPriority > 5)
							{
								$("slot."+slotNum).style.backgroundColor = "red";
								$("slot."+slotNum).innerHTML = "<a href='/control/frame/slot/index.htm?frameId="+objList[1]+"&slotId="+objList[2]+"'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:white;\">"+slotName+"</div></a>";
							}
							else
							{
								$("slot."+slotNum).style.backgroundColor = "yellow";	
								$("slot."+slotNum).innerHTML = "<a href='/control/frame/slot/index.htm?frameId="+objList[1]+"&slotId="+objList[2]+"'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:black;\">"+slotName+"</div></a>";					
							}

						}						
					}										
					
				}
				else if(nm.indexOf("fs") == 0)
				{
					nameStrList = nm.split(".");
					fanNum = nameStrList[1];
					intValue = parseInt(val);
					if(intValue > 0)
					{
						$(nm).style.backgroundColor = "red";
					}
					else
					{
						$(nm).style.backgroundColor = "green";
					}
				}
				else if(nm.indexOf("fanInstalled") == 0)
				{
					intValue = parseInt(val);
					if(intValue > 0)
					{
						$(nm).value = "Installed";
					}
					else
					{
						$(nm).value = "Uninstalled";
					}
				}
				else if(nm.indexOf("ps") == 0)
				{
					intValue = parseInt(val);
					if(intValue > 0)
					{
						$(nm).style.backgroundColor = "red";
					}
					else
					{
						$(nm).style.backgroundColor = "green";
					}
				}
				else if(nm.indexOf("frmAlm") == 0)
				{
					intValue = parseInt(val);
					if(intValue > 0)
					{
						$(nm).value = "True";
					}
					else
					{
						$(nm).value = "False";
					}
				}
				else if(nm.indexOf("dtsLogo") == 0)
				{
					intValue = parseInt(val);
					if(intValue == 1)
					{
						$(nm).style.display = "";
					}
					else
					{
						$(nm).style.display = "none";
					}
				}
	
			}
			if(isPageRefreshed == 1)
			{
				showSlotName(21);
			}
		},
		onFailure: function()
		{
		
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);	
	}
	setTimeout("updateFrame('"+url+"')", refreshRate*1000);
}

function updateFrameUpgrade(url)
{
	var unknownSlots = getUnknownSlots();
	//requestUrl = "/control/update/frame_upgrade?objList=" + url+"&BWID="+window.top.name;
	var requestUrl = "/control/update/frame_upgrade?objList=" + url;
	if (unknownSlots)
	{
		requestUrl += "&" +unknownSlots;
	}
	requestUrl += "&BWID="+window.top.name;
	//alert(requestUrl);

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{	
			var isPageRefreshed = 0;
			var response = transport.responseText;
			//alert(response);
			strList = response.split("&");
			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";					
				}
			}
			for(i=0; i<strList.length-1; i++)
			{
				
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage";
					return;
				}
				else if(strList[i] == "No Change")
				{
					return;
				}				
				else
				{
					if(isPageRefreshed == 0)
						isPageRefreshed = 1;
				}
					
				subStrList = strList[i].split("=");
				nm = subStrList[0];
				val = subStrList[1];
				
				if(nm.indexOf("slot") == 0)
				{
					slotStr = nm.split(".");
					slotNum = slotStr[1];
					property = slotStr[2];
					
					if(val == "empty")
					{
						$("slot."+slotNum).style.backgroundColor = "black";
						$("slot."+slotNum).innerHTML = "<div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:lime;\">EMPTY</div>";
					}
					else if(val == "UNKNOWN")
					{
						objList = url.split(".");
						$("slot."+slotNum).style.backgroundColor = "black";
						$("slot."+slotNum).innerHTML = "<a href='frame/slot/upgrade?frameId="+objList[1]+"&slotId="+slotNum+"&muId=4'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:lime;\">UNKNOWN DEVICE</div></a>";
					}
					else
					{
						valueStrList = val.split("?");
						slotName = valueStrList[0];
						objList = valueStrList[1].split(".");
						alarmPriority = parseInt(valueStrList[2]);
						if(alarmPriority == 0)
						{
							
							$("slot."+slotNum).style.backgroundColor = "lime";
							$("slot."+slotNum).innerHTML = "<a href='frame/slot/upgrade?frameId="+objList[1]+"&slotId="+objList[2]+"&muId=4'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:black;\">"+slotName+"</div></a>";	
						}
						else
						{
							if(alarmPriority > 5)
							{
								$("slot."+slotNum).style.backgroundColor = "red";
								$("slot."+slotNum).innerHTML = "<a href='frame/slot/upgrade?frameId="+objList[1]+"&slotId="+objList[2]+"&muId=4'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:white;\">"+slotName+"</div></a>";
							}
							else
							{
								$("slot."+slotNum).style.backgroundColor = "yellow";	
								$("slot."+slotNum).innerHTML = "<a href='frame/slot/upgrade?frameId="+objList[1]+"&slotId="+objList[2]+"&muId=4'><div id=\"slot."+slotNum+".name\" style=\"font-size: 12;color:black;\">"+slotName+"</div></a>";					
							}

						}						
					}										
					
				}								
			}
			if(isPageRefreshed == 1)
			{
 				showSlotName(21);
			}
		},
		onFailure: function()
		{
		
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);	
	}
	setTimeout("updateFrameUpgrade('"+url+"')", refreshRate*1000);
}

function updateParam(url)
{
	var NUM_PARAMS_TO_POLL = 50;
	/*	
	if ( isNaN(numParamsUpdated) )
	{
		numParamsUpdated = 0;
	}
	*/
	var paramsOnPage = getformElementNameValues();
	var qseestr = "qseespec;"
	var newurl = "";
	idx = url.indexOf(qseestr);
	if (idx == -1)
		requestUrl = "/control/update/param?objList="+url+"&BWID="+window.top.name+"&NPU="+g_numParamsUpdated+"&NPPoll="+NUM_PARAMS_TO_POLL ;
	else
	{
		idx += qseestr.length;
		newurl = url.substring(idx, url.length);
		paramsOnPage = "";
		requestUrl = "/control/update/qseeparam?objList="+newurl+"&BWID="+window.top.name+"&NPU="+g_numParamsUpdated+"&NPPoll="+NUM_PARAMS_TO_POLL ;
	}

	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;	
		setCookie("refreshRate", refreshRate, MTMCookieDays);	
	}

	paramsOnPage=encodeURI(paramsOnPage);
	var timeoutId = -1;
	var paramValue;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		parameters: paramsOnPage,
		onSuccess: function(transport)
		{
			var response = unescape(transport.responseText);
			//alert(response)

			subStrList=response.split("&");
			if(subStrList[subStrList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = subStrList[subStrList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";
				}
			}
			listLen = subStrList.length-2;
			// handle QSEE parameter, format: &videosource=3,videostatus=preset,streamoption=1
			if ((url.indexOf(qseestr) != -1) && subStrList[listLen].indexOf("videosource=") == 0)
			{
				subStr=subStrList[listLen].split(",");
				sourceList = subStr[0].split("=");
				sourceId = sourceList[1];
				statusList = subStr[1].split("=");
				statusVal = parseInt(statusList[1]);
				statusList = subStr[2].split("=");
				streamOption = parseInt(statusList[1]);
				oldSourceId = parseInt($("videosource").value);
				oldStatusVal = parseInt($("videostatus").value);
				oldStreamOption = parseInt($("streamoption").value);
				reloadMedia = 0;
				plugId = -1;
				if (oldStatusVal != statusVal)
				{
					// Reload Media Player, if it is preset status
					if (statusVal == 1)
					{
						reloadMedia = 1;
					}
				}
				if (streamOption != oldStreamOption)
				{
					if ((streamOption < 2) && (oldStreamOption > 1))
						reloadMedia = 1;
				}
				if (reloadMedia == 1)
				{
					plugId = parseInt($("plugid").value);
					if (plugId > 0)
					{
						urlList = newurl.split(".");
						playVideoStreaming(urlList[1], urlList[2], plugId);
					}
				}
				$("videosource").value = sourceId;
				$("videostatus").value = statusVal;
				$("streamoption").value = streamOption;
			}
			else
				listLen = subStrList.length - 1;
			for(i=0; i<listLen; i++)
			{
				if(subStrList[i] == "Redirect")
				{
					window.location = "/control/systempage"
					//return;
					break;
				}
				if(subStrList[i] == "No Change")
				{
					/* skip polling the rest for this run if "No Change" */
					if (g_numParamsUpdated > 0)
					{
						g_numParamsUpdated = 0;
					}
					//return;
					break;
				}
				
				subStr=subStrList[i].split("=");
				if(subStr.length < 2)
					continue;

				strName=subStr[0];
				val=subStr[1];
				strNameList = strName.split(".");
				id = strNameList[0];
				type = strNameList[1];
				if($(id+".hidden").type == "select-one")
				{
					if(type == "enumOpt")
						{
							new_opt_list = val.split(":");
							$(id).length = new_opt_list.length;
							for(opt_i = 0; opt_i< new_opt_list.length;opt_i++)
								{
									new_opt_index = parseInt(new_opt_list[opt_i]);
									$(id).options[opt_i].value = new_opt_index;
									$(id).options[opt_i].text = $(id+".hidden").options[new_opt_index].text;	
								}
						}

					if(type == "value")
					{
						$(id).value = parseInt(val);
						for(opt_i = 0; opt_i< $(id).options.length; opt_i++)
						{
							if($(id).options[opt_i].value == $(id).value)
							{
								$(id+".text").value = $(id).options[opt_i].text;
							}
						}
					}
					if(type == "flag")
					{
						if (val & 0x1)
						{
							$(id+".tr").style.display = "none";
						}
						else 
						{
							$(id+".tr").style.display = "";
						}
						if((val & (1<<1)) && (val & (1<<2)) )
						{
							$(id).disabled = false;
							$(id).style.backgroundColor = "#ffffff";
							$(id).style.display = ""
							$(id+".text").style.display = "none";
						}
						else if(val & (1<<1))
						{
							$(id).style.display = "none"
							$(id).disabled = false;
							$(id+".text").style.display = "";
							$(id+".text").className = "read-only";
						}
						else if(val & (1<<2))
						{
							if (val & 0x1)
								$(id).disabled = false;
							else
								$(id).disabled = true;
							$(id).style.backgroundColor = "#eeeeee";
							$(id).style.display = ""
							$(id+".text").style.display = "none";
						}
						else
						{
							//$(id).disabled = true;
							//$(id).style.backgroundColor = "#000000";
							$(id+".text").className = "no-writeable";
							$(id).style.display = "none";
							$(id+".text").style.display = "";
						}
						$(id + ".flag").value = val;
					}
				}
				else
				{
					if(type == "value")
					{
						//alert("val21:"+ val);
						//val = val.replace(/%09/g, "\&");	//& <== tab
						//val = decodeURIComponent(val);
						val = val.replace(/\t/g, "\&");	//& <== tab
						val = val.replace(/\r/g, "\=");	//= <== shift
						//alert("val22:"+ val);
						if (document.activeElement.id == id)
						{
							if($(id+".hidden") != null)
							{
								if($(id+".hidden").value == val)
								{
									//alert("equal val="+val+",hd val="+$(id+".hidden").value);
									//
									paramValue = val;
								}
								else
								{
									//alert("not equal val="+val+",hd val="+$(id+".hidden").value);
									$(id).value=val;
									$(id+".hidden").value = val;
								}
							}
						}
						else
						{
							$(id).value=val;
							if($(id+".hidden") != null)
							{
								$(id+".hidden").value = val;
							}
						}
					}
					else if(type == "flag")
					{
						if (val & 0x1)
						{
							$(id+".tr").style.display = "none";
						}
						else
						{
							$(id+".tr").style.display = "";
						}

						if((val & (1<<1)) && (val & (1<<2)) )
						{
							$(id).readOnly = false;
							$(id).className = "";
						}
						else
						{
							if(val & (1<<1))
							{
								$(id).readOnly = true;
								$(id).className = "read-only";
							}
							else if(val & (1<<2))
							{
								$(id).readOnly = true;
								$(id).className = "no-writeable";
							}
							else
							{
								$(id).readOnly = true;
								//$(id).style.backgroundColor = "#000000";
								//$(id).style.color = "#eeeeee";
								$(id).className = "no-writeable";
								$(id).style.textAlign = "center";
							}
							if (document.activeElement.id == id)
							{
								$(id).value = paramValue;
								$(id+".hidden").value = paramValue;
								$(id).blur();
							}
						}
						$(id + ".flag").value = val;
					}
					else if(type == "range")
					{
						var objRange = null;
						try {
							objRange = $(id+".range");
						}
						catch (e) {
						}
						if (objRange)
							$(id+".range").innerHTML = val;
					}
					else if(type == "unit")
					{
						/*var objRange = null;
						try {
							objRange = $(id+".unit");
						}
						catch (e) {
						}
						if (objRange)*/
							$(id+".unit").innerHTML = val;
					}
				}
			}
			timeoutId = setTimeout("updateParam('"+url+"')", refreshRate*1000);
		},
		onException: function() //Firefox handle exception
		{
			timeoutId = setTimeout("updateParam('"+url+"')", refreshRate*1000);
		},
		onFailure: function()   //IE handle faillure 
		{
			timeoutId = setTimeout("updateParam('"+url+"')", refreshRate*1000);
		}
	}
	);
	g_numParamsUpdated += NUM_PARAMS_TO_POLL;
	if (g_numParamsUpdated >= g_numParamsTotal)
	{
	   g_numParamsUpdated = 0;
	}
	//alert(numParamsTotal);
	//var timeoutId = setTimeout("updateParam('"+url+"', "+numParamsTotal+", "+numParamsUpdated+")", refreshRate*1000);
	if (timeoutId != -1)
		setCookie("timeoutId", timeoutId);
}

function updateParam_start(url, numParamsTotal, numParamsUpdated)
{
	g_numParamsTotal = numParamsTotal;
	g_numParamsUpdated = numParamsUpdated;
	updateParam(url);
}

function getformElementNameValues()
{
	var buf = "";
	var current = null;
	var i = 0;
	for (var j=0;j<document.forms[0].length;j++)
	{
		current = document.forms[0].elements[j];
		if ( current )
		{
			if ( //(current.type.toLowerCase() != "hidden") &&
				//!current.readonly &&	// still want to update read only parameters
				//!current.disabled 	&&
				( (current.id != null && current.id != "" &&  !isNaN(current.id)) ||
				(current.name != null && current.name != "" &&  !isNaN(current.name))
				)
			)
			{
				/* e.g.:
				 *   e1=10:v 
				 *   e2=12:v:enablelist (1.2.3...)
				 */
				buf += "&e" + current.id + "=" + current.id + ":";
				//alert(current.type);
				//if ($(current.id+".tr").style.display == "none")
				//	buf += "1:";
				//else
				//	buf += "0:";
				buf = buf + $(current.id + ".flag").value + ":";
				var type = current.type.toLowerCase();
				if ( type.search("select") >= 0 )
				{
					buf += current.options[current.selectedIndex].value + ":" 
					for (var k=0; k<current.length; k++)
					{
						if (k > 0)
						{
							buf += ".";	 /* . not needed for the first item */
						}
						buf += current.options[k].value;
					}
				}
				else /* other than dropdown selection: interger, string, ... */
				{
					buf += current.value;
					fun = $(current.id).onkeypress;
					if (fun != null)
					{
						funStr = fun.toString();
						// it is integer, add range value
						if (funStr.indexOf("intValueSubmit") > 0)
						{
							var objRange = null;
							try {
								objRange = $(current.id+".range");
							}
							catch (e) {
							}
							if (objRange)
								buf = buf + ":" + $(current.id+".range").innerHTML;
						}
					}
				}
				// add paramFlag
				//buf = buf + ":" + $(current.id + ".flag").value
				i++;
			}
		}
	}
	buf += "&end";
	return buf;
}

function updateAlm(url)
{	
	requestUrl = "/control/update/alm?objList="+url+"&BWID="+window.top.name;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;	
			strList = response.split("&");
			
			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{							
					window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
					window.parent.frames.menu.location = "/control/menuzero.htm";					
				}
			}
			for(i=0; i< strList.length-1; i++)
			{
				if(strList[i] == "Redirect")
				{
					window.location = "/control/systempage"
					return;
				}
				if(strList[i] == "No Change")
				{
					return;
				}
				
				subStr = strList[i].split("=");
				nm = subStr[0];
				val = subStr[1];
				idList = nm.split(".");
				alarmId = idList[0];
				propertyId = parseInt(idList[1]);			
				if(propertyId == 56)
				{
					$(nm).style.backgroundColor = val;
				}		
				else if(propertyId == 52)
				{					
					$(nm).value = val;
					intValue = parseInt(val);
					if(intValue == 1)
					{
					
						$(nm+".pic").style.backgroundImage = "url(/images/disable.PNG)";
					}
					else
					{
						
						$(nm+".pic").style.backgroundImage = "url(/images/enable.PNG)";
					}
				}			
				else if(propertyId == 51)
				{
					$(nm).value = val;
					intValue = parseInt(val);
					if(intValue == 1)
					{
						$(nm+".checkBox").checked = true;
					}
					else
					{
						$(nm+".checkBox").checked = false;
					}

				}
				else
				{
					$(nm).value = val;
					$(nm+".hidden").value = val;
				}

			}
		},
		onFailure: function()
		{
			
		}
	}
	);
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;	
		setCookie("refreshRate", refreshRate, MTMCookieDays);	
	}
	var timeoutId = setTimeout("updateAlm('"+url+"')", refreshRate*1000);
	setCookie("timeoutId", timeoutId);
}

function alarmSubmit(alarmId, propertyId, propertyValue, url)
{
	requestUrl = "/control/formProc?"+url+"&"+alarmId+"."+propertyId+"="+propertyValue;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{			
			var response = transport.responseText;	

			strList = response.split("&");			
			
			for(i=0; i< strList.length; i++)
			{
				subStr = strList[i].split("=");
				nm = subStr[0];
				val = subStr[1];
				idList = nm.split(".");
				alarmId = idList[0];
				propertyId = parseInt(idList[1]);			
				if(propertyId == 56)
				{
					$(nm).style.backgroundColor = val;
				}		
				else if(propertyId == 52)
				{					
					$(nm).value = val;
					intValue = parseInt(val);
					if(intValue == 1)
					{
					
						$(nm+".pic").style.backgroundImage = "url(/images/disable.PNG)";
					}
					else
					{
						
						$(nm+".pic").style.backgroundImage = "url(/images/enable.PNG)";
					}
				}			
				else if(propertyId == 51)
				{
					$(nm).value = val;
					intValue = parseInt(val);
					if(intValue == 1)
					{
						$(nm+".checkBox").checked = true;
					}
					else
					{
						$(nm+".checkBox").checked = false;
					}

				}
				else
				{
					$(nm).value = val;
					$(nm+".hidden").value = val;
				}

			}
					
		},
		onFailure: function()
		{
		
		}
	}
	);
}

function changeDisablePic(obj, alarmId, propertyId, url)
{
	disable = document.getElementById(alarmId+"."+propertyId);
	backImg = obj.style.backgroundImage;
	// For FireFox 3.6 version, backgroundImage value will include '"';
	if(backImg == "url(/images/enable.PNG)" || backImg == "url(\"/images/enable.PNG\")")
	{
		obj.style.backgroundImage = "url(/images/disable.PNG)";
		disable.value = 1;
	}
	else
	{
		obj.style.backgroundImage = "url(/images/enable.PNG)";
		disable.value = 0;
	}
	alarmSubmit(alarmId, propertyId, disable.value, url);
}function changeAddPic(obj, direction)
{
	if(direction == 1)
	{
		obj.style.backgroundImage = "url(/images/add.PNG)";
	}
	else
	{
		obj.style.backgroundImage = "url(/images/sub.PNG)";
 	}
}
function edit(button, id, direction, max, min, url)
{
 	var obj = document.getElementById(id);
 	var value = parseInt(obj.value);
 	if(value>=0)
 	{
 		if(direction == 1)
 		{
 			value+=1;
 			if(value> max)
 			{
 				value = max;
				obj.value = value;
				return;
 			}
 			obj.value = value;
 		}
 		else if(direction == -1)
 		{
 			value-=1;
 			if(value< min)	
 			{
 				value = min;
				obj.value = value;
				return;
			}
 			obj.value = value;
 		}
 	} 	if(direction == 1)
 	{
 		button.style.backgroundImage = "url(/images/add1.PNG)";;
	}
 	else if(direction == -1)
 	{
 		button.style.backgroundImage = "url(/images/sub1.PNG)";
 	}
	idStr = id.split(".");
	alarmId = idStr[0];
	propertyId = idStr[1];
	alarmSubmit(alarmId, propertyId, value, url);
 }
 function checkValue(obj, min, max, url, updateUrl, evt)
 {
	if(resetRefresh(updateUrl, 1, evt) == 0)
	{
		return;
	}
 	value = parseInt(obj.value);
 	if(value > max  || value < min)
	{
		obj.value = $(obj.id+".hidden").value;
	}
	idStr = obj.id.split(".");
	alarmId = idStr[0];
	propertyId = idStr[1];
	alarmSubmit(alarmId, propertyId, obj.value, url);
 }

function almSubmit(obj, url, updateUrl, evt)
{
	if(resetRefresh(updateUrl, 1, evt) == 0)
	{
		return;
	}
	idStr = obj.id.split(".");
	alarmId = idStr[0];
	propertyId = idStr[1];
	alarmSubmit(alarmId, propertyId, obj.value, url);
}

function setCheckValue(obj, alarmId, propertyId, url)
{
	ack = document.getElementById(alarmId+"."+propertyId);
	if(obj.checked == true)
	{
		ack.value = 1;
	}
	else
	{
		ack.value = 0;
	}
	alarmSubmit(alarmId, propertyId, ack.value, url);
	
}

function submitFile()
{
	file = document.getElementById("presetFile");
	if(file.value == "" || file.value.toLowerCase() == ".xml")
	{
		alert("Please select the PRESET xml file!");
	}
	else
	{
		len = file.value.length;
		if(len == 3 || len != (file.value.lastIndexOf(".xml")+4))
		{
			alert("Please select the PRESET xml file!");
		}
		else
		{
			if(if_v_flag == 1)
				document.form1.action = document.form1.action+"&ifVersionFlag=1";
			else if(if_v_flag == 0)
				document.form1.action = document.form1.action+"&ifVersionFlag=0";
			document.form1.submit();
                     return true;
		}
	}	
       return false;
}

function submitFileChk(obj, ignore)
{
	var type;
	if(obj == null || obj.length == 0)
	{
		alert("No file type check.");
		return false;
  }

	type = "." + obj;
	file = document.getElementById("presetFile");
	if(file.value == "" || file.value.toLowerCase() == type)
	{
		alert("Please select " + obj + " file.");
	}
	else
	{
		if (ignore == 1)
		{
			if(if_v_flag == 1)
				document.form1.action = document.form1.action+"&ifVersionFlag=1&BWID=" + window.top.name;
			else if(if_v_flag == 0)
				document.form1.action = document.form1.action+"&ifVersionFlag=0&BWID=" + window.top.name;
			document.form1.submit();
			return true;
		}
		len = file.value.length;
		if(len == 3 || len != (file.value.toLowerCase().lastIndexOf(type)+4))
		{
			alert("Please select " + obj + " file.");
		}
		else
		{
			if(if_v_flag == 1)
				document.form1.action = document.form1.action+"&ifVersionFlag=1&BWID=" + window.top.name;
			else if(if_v_flag == 0)
				document.form1.action = document.form1.action+"&ifVersionFlag=0&BWID=" + window.top.name;
			if(confirm("Device will be rebooted after files are transferred. Continue?"))
			{
			    document.form1.submit();
			    return true;
			}
		}
	}	
	return false;
}

function setNetwork()
	{
		reboot = getCookie("reboot");			
		if(reboot == "true")
		{
			document.getElementById("reboot").value = 1;
		}
		else
		{
			document.getElementById("reboot").value = 0;
		}
		ipAddr = document.getElementById("ipAddr").value;
		subnetMask = document.getElementById("subnetMask").value;
		gateway = document.getElementById("gateway").value;
		if(window.confirm("Write the following network settings to the device?\n\n     IP Address:          "+ipAddr+"\n     Subnet Mask:       "+subnetMask+"\n     Default Gateway: "+gateway))
		{
			document.forms.form1.submit();
		}
	}

function setRebootCookie(obj)
	{
		if(obj.checked == true)
		{
			setCookie("reboot", "true", MTMCookieDays)
			
		}
		else
		{
			setCookie("reboot", "false", MTMCookieDays);
			
		}
	}
		
function setChecked()
	{
		reboot = getCookie("reboot");
		if(reboot == "true")
		{
			document.getElementById("rebootCheck").checked = true;
			document.getElementById("reboot").value = 1;
		}
	}
		
function rebootDevice()
	{
		if(window.confirm("Reboot the device now?"))
		{
			document.forms.form2.submit();
		}
	}

function readLicense()
{
	requestUrl = "/control/readLicense";

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			if( response == "Error")
				alert("Error while getting license key.");
			else
				$("licenseKey").value = response;
			
		},
		onFailure: function()
		{
		
		}
	}
	);

}

function writeLicense()
{	
	keyValue = document.getElementById("licenseKey").value;
	requestUrl = "/control/writeLicense?license="+keyValue;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;

			if(response == "Ok")
			{
				alert("Writing licence key successful. The system is rebooting ...");
			}
			else if(response == "Fail")
			{				
				alert("Fail to write license key.");
			}
			else if(response == "Invalid")
			{
				alert("Invalid license key.");
			}
		},
		onFailure: function()
		{
		
		}
	}
	);

}

function validateLicense()
{
	keyValue = document.getElementById("licenseKey").value;
	requestUrl = "/control/validateLicense?license="+keyValue;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;

			if(response == "Valid")
			{				
				alert("Valid license key.");
			}
			else
			{
				alert("Invalid license key.");
			}	
		},
		onFailure: function()
		{
		
		}
	}
	);
}

function setRefreshRate()
{
	var refreshRate;
	refreshRateVal = document.getElementById("RefreshRate").value;
	if(isNaN(refreshRateVal))
	{
		alert("Invalid input.")
		var prevRefreshRate = getCookie("refreshRate");
		if(prevRefreshRate == null)
		{		
			prevRefreshRate = 5;
		}
		refreshRate = prevRefreshRate;
		$("RefreshRate").value = refreshRate;
		setCookie("refreshRate", refreshRate, MTMCookieDays);	
		return;
	}
	else
	{
		refreshRate = parseInt(refreshRateVal);
	}

	if(refreshRate >= 3 && refreshRate <= 300)
	{
		$("RefreshRate").value = refreshRate;
	}
	else
	{
		if(refreshRate < 3)
		{
			alert("Refresh interval should be a number no less than 3.");
		}
		else
		{
			alert("Refresh interval should be a number no more than 300.");
		}
		
		var prevRefreshRate = getCookie("refreshRate");
		if(prevRefreshRate == null)
		{			
			prevRefreshRate = 5;
		}
		refreshRate = prevRefreshRate;
		$("RefreshRate").value = refreshRate;
	}
	setCookie("refreshRate", refreshRate, MTMCookieDays);	
	
}

function getRefreshRate()
{
	refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{
		refreshRate = 5;
	}
	document.getElementById("RefreshRate").value = refreshRate;
}

function showSlotName(maxSlots)
{	
	if(navigator.appName != "Microsoft Internet Explorer")
	{
		for(i=1; i< maxSlots; i++)
		{
			slotName = $("slot."+i+".name").innerHTML;
			slotNameStr = "";
			for(j=0; j<slotName.length; j++)
			{
				slotNameStr+=slotName.charAt(j);
				if(j!= slotName.length-1)
				{
					slotNameStr+="<br>";
				}
			}			
			$("slot."+i+".name").innerHTML ="<table width=100% height=100%><tr><td style=\"line-height: 90%; vertical-align: middle;\">"+ slotNameStr+"</td></tr></table>";		
			//$("slot."+i+".name").style.lineHeight = "90%";
			//$("slot."+i+".name").style.verticalAlign = "middle";
			//$("slot."+i+".name").innerHTML = slotNameStr;		
		}
	}
}

function checkIpValue(obj, id)
{
	var curstatus = 0;
	str = obj.value;
	strList = str.split(".");
	if(strList.length == 4)
	{
		for(i=0; i< strList.length; i++)
		{
			subStr = strList[i];
			intVal = parseInt(subStr);
			
			if(subStr.length > 3 || subStr.length <1)
			{
				alert("Input format error!");
				curstatus = -1;
				break;
			}
			if(intVal > 255 || intVal < 0)
			{
					alert("Wrong input format for IP address!");
					curstatus = -1;
					break;
			}
			for(j=0; j< subStr.length; j++)
			{
				subVal = subStr.charAt(j);
				
				if(subVal > '9' || subVal < '0')
				{
					alert("Wrong input format for IP address!");
					curstatus = -1;
					break;
				}
				if(j == 0)
				{					
					if(subStr.length > 1 && subVal == '0')
					{
						alert("Wrong input format for IP address!");
						curstatus = -1;
						break;
					}
				}				
			}
			if(curstatus == -1)
			{
				break;
			}
		}	
					
	}
	else
	{
		alert("Wrong input format for IP address!");
		curstatus = -1;
	}
	if(curstatus == -1)
	{
		obj.value = $(id+".hidden").value;
		return -1;;		
	}
	$(id+".hidden").value = obj.value;	
	return 0;		
}

function resetRefresh(url, branchFlag, evt)
{

	var timeoutId = getCookie("timeoutId");

	var refreshRate = getCookie("refreshRate");

	if(refreshRate == null)
	{
		refresheRate = 5;
	}
	
	if(evt.type == "keypress"&& evt.keyCode != 13)
	{			
		
		if(timeoutId != null && url != null)
		{
			clearTimeout(timeoutId);
			setCookie("timeoutId","-1");
		}

		return 0;
	}
	else if(evt.type == "change" || (evt.type == "keypress" && evt.keyCode == 13))
	{
		
		if(timeoutId == "-1")
		{		

			if(branchFlag == 0)
				timeoutId = setTimeout("updateParam('"+url+"')", refreshRate*1000);
			else
				timeoutId = setTimeout("updateAlm('"+url+"')", refreshRate*1000);
			setCookie("timeoutId", timeoutId);
		}

		return 1;
	}	

}

function valueSubmit(obj, url, updateUrl, resetRefreshFlag, evt)
{
	if(resetRefreshFlag == 1)
	{
		if(resetRefresh(updateUrl, 0, evt) == 0)
		{
			return;
		}
		try {
			if (updateUrl)
			{
				//Parameter type is string, flag set 1. If type is int, flag set 0
				var originalObjId = obj.id+".hidden";
				var originalObjValue = $(originalObjId).value;
				$(originalObjId).value = obj.value;
				if ((evt.type == "change" && (obj.value == originalObjValue)))
				{
					return;
				}
			}
		}
		catch (e)
		{
		}
	}

	//requestUrl = "/control/formProc?"+url+"&"+obj.name+"="+obj.value;
	requestUrl = encodeURIComponent(obj.value);
	//alert(requestUrl);
	requestUrl = requestUrl.replace(/%26/g, "%09");	//& ==> tab
	requestUrl = requestUrl.replace(/%23/g, "%1b");	//# ==> escape
	requestUrl = "/control/formProc?"+url+"&"+obj.name+"="+requestUrl;
	//alert(requestUrl);

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: {any:1},
		onSuccess: function(transport)
		{
		
			var response = transport.responseText;
			strList = response.split("&");	
			for(i=0; i<strList.length; i++)
			{
				subStr=strList[i].split("=");
				strName=subStr[0];
				val=subStr[1];
				subStrList = strName.split(".");
				id = subStrList[0];
				type = subStrList[1];
				if($(id).type == "select-one")
				{
					if(type == "enumOpt")
						{
							new_opt_list = val.split(":");
							$(id).length = new_opt_list.length;
							for(opt_i = 0; opt_i< new_opt_list.length;opt_i++)
								{
									new_opt_index = parseInt(new_opt_list[opt_i]);
									$(id).options[opt_i].value = new_opt_index;
									$(id).options[opt_i].text = $(id+".hidden").options[new_opt_index].text;	
								}
						}
					if(type == "value")
					{
						$(id).value = parseInt(val);
						for(opt_i = 0; opt_i< $(id).options.length; opt_i++)
						{
							//$(id+".text").value = $(id).options[parseInt(val)].text
							if($(id).options[opt_i].value == $(id).value)
								$(id+".text").value = $(id).options[opt_i].text;
						}
					}
					if(type == "flag")
					{
						if (val & 0x1)
						{
							$(id+".tr").style.display = "none";
						}
						else 
						{
							$(id+".tr").style.display = "";
						}
						if((val & (1<<1)) && (val & (1<<2)) )
						{
							$(id).disabled = false;
							$(id).style.backgroundColor = "#ffffff";
							$(id).style.display = ""
							$(id+".text").style.display = "none";
		    				}
						else if(val & (1<<1))
						{
							//$(id).style.backgroundColor = "black";
							$(id).style.display = "none"
							$(id).disabled = false;
							$(id+".text").style.display = "";
						}
						else if(val & (1<<2))
						{
							if (val & 0x1)
								$(id).disabled = false;
							else
								$(id).disabled = true;
							$(id).style.backgroundColor = "#eeeeee";
							$(id).style.display = ""
							$(id+".text").style.display = "none";
						}
						else
						{
							//$(id).disabled = true;
							//$(id).style.backgroundColor = "#000000";
							$(id+".text").className = "no-writeable";
							$(id).style.display = "none";
							$(id+".text").style.display = "";
						}
					}
				}
				else
				{
					if(type == "value")
					{
						//alert("val11:"+ val);
						//val = val.replace(/%09/g, "\&");	//& <== tab					   
						val = decodeURIComponent(val);
						val = val.replace(/\t/g, "\&");	//& <== tab
						val = val.replace(/\r/g, "\=");	//= <== shift
						//alert("val12:"+ val);
						$(id).value=val;
						if($(id+".hidden") != null)
						{
							$(id+".hidden").value = val;
						}			
					}
					if(type == "flag")
					{
						if (val & 0x1)
						{
							$(id+".tr").style.display = "none";
						}
						else 
						{
							$(id+".tr").style.display = "";
						}
						if((val & (1<<1)) && (val & (1<<2)) )
						{
							$(id).readOnly = false;
							//$(id).style.backgroundColor = "white";
							//$(id).style.textAlign = "left";
							$(id).className = "";
						}
						else if(val & (1<<1))
						{
							$(id).readOnly = true;
							$(id).className = "read-only";
						}
						else if(val & (1<<2))
						{
							$(id).readOnly = true;
							$(id).className = "no-writeable";
						}
						else
						{
							$(id).readOnly = true;
							//$(id).style.backgroundColor = "#000000";
							//$(id).style.color = "#eeeeee";
							$(id).className = "no-writeable";
							$(id).style.textAlign = "center";
						}
					}
					if(type == "range")
					{
						var objRange = null;
						try {
							objRange = $(id+".range");
						}
						catch (e) {
						}
						if (objRange)
							$(id+".range").innerHTML = val;
					}
				}
			}
			
					
		},
		onFailure: function()
		{
		
		}
	}
	);
}
function ipValueSubmit(obj, id, url, updateUrl, evt)
{
	if(resetRefresh(updateUrl, 0, evt) == 0)
	{
		return;
	}
	if(checkIpValue(obj, id) == 0)
	{
		valueSubmit(obj, url,updateUrl, 0);
	}
}
function intValueSubmit(obj, precision, minVal, maxVal, url, updateUrl,evt)
{
	if(resetRefresh(updateUrl, 0, evt) == 0)
	{
		return;	
	}
	originalId = obj.id+".hidden";
	originalValue = $(originalId).value;
	minValue = minVal/Math.pow(10, precision);
	maxValue = maxVal/Math.pow(10, precision);
	currentValue = obj.value;
	if(isNaN(currentValue) == true)
	{
		alert("Invalid input.");
		obj.value = originalValue;
	}
	else if(currentValue > maxValue || currentValue < minValue)
	{
		alert("Out of range!");
		obj.value = originalValue;
	} 
	else
	{
		$(originalId).value = currentValue;
		//If onchange event not update value, don't submit value to ETH
		if (!(evt.type == "change" && (obj.value == originalValue)))
		{
			//alert("evt="+evt.type+", objv="+obj.value+", origv="+originalValue);
			valueSubmit(obj, url, updateUrl, 0, evt);
		}
	}
}

function getRaidoItem()
{
	len = document.radioForm.saveRadio.length;
	for(i = 0; i < len; i++)
		{
			if(document.radioForm.saveRadio[i].checked)
				{
					chosen = document.radioForm.saveRadio[i].value;
				}
		}
}

function newPage(url)
{
	presetWindow = window.open(url);
}

function getFilename(string)
{
  if(string == null)
    return null;
    
  pos = string.lastIndexOf("\\");
  str = string.substring(pos+1, string.length);
  pos = str.lastIndexOf("/");
  file = str.substring(pos+1, str.length);
  return file;
}

function updateProgress(filename)
{
  var upload;
  var filesize;
  if(filename == null)
  {
    alert("No file selected.");
    return;
  }
	//var ckStat = parseInt($('curState').value);
	//if (ckStat >= 4)
	//	return;

	requestUrl = "/control/update/progress?filename="+filename+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
				
			strList = response.split("&");
			//alert(strList.length);
			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{
					if(window.parent.frames.length != 0)
					{
						window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
						window.parent.frames.menu.location = "/control/menuzero.htm";															
					}
				}
			}

			upload = 0;
			filesize = 0;
			workstatus = 0;
			upgradeFile = "";
			urllink = "";
			bjump = 0;
			frameId = -1;
			slotId = -1;
			muId = -1;
			errId = -1;
			reboot = -1;
			chkState = -1;
			for(i=0; i<strList.length-1; i++)
			{
				subStrList = strList[i].split("=");
				nm = subStrList[0];
				val = subStrList[1];			

				if(nm.indexOf("upload") == 0)
				{
                    intValue = parseInt(val);
                    upload = intValue;
				}
				else if(nm.indexOf("filesize") == 0)
				{
                    intValue = parseInt(val);
                    filesize = intValue;
                }
                else if(nm.indexOf("workStatus") == 0)
                {
                    intValue = parseInt(val);
                    workstatus = intValue;
                }
                else if(nm.indexOf("upgradeFile") == 0)
                {
                    upgradeFile = val;
                }
                else if(nm.indexOf("bjump") == 0)
                {
                    bjump = parseInt(val);
                }
                else if(nm.indexOf("urllink") == 0)
                {
                    urllink = val;
					if(urllink.indexOf("frameId") >= 0)
					{
						frameId = parseInt(subStrList[2]);
					}
                }
                else if(nm.indexOf("slotId") == 0)
                {
                    slotId = parseInt(val);
                }
                else if(nm.indexOf("muId") == 0)
                {
                    muId = parseInt(val);
                }
                else if(nm.indexOf("errId") == 0)
                {
                    errId = parseInt(val);
                }
                else if(nm.indexOf("reboot") == 0)
                {
                    reboot = parseInt(val);
                }
                else if(nm.indexOf("chkState") == 0)
                {
                    chkState = parseInt(val);
                }
                else if(nm.indexOf("frslotId") == 0)  /* parse the frameId and slotId */ 
                {
					/* upgrade in progress: 
					 * check if the same slot or not :
					 *  same slot: update progress
					 *  different slot: abort upgrade
					 */
                    if (frslotId == val)
					{
					}
                }
			}
			if (bjump == 1)
			{
				if(urllink != "")
				{
					if(reboot == -1)
						urllink = urllink+"="+frameId+"&slotId="+slotId+"&muId="+muId+"&errId="+errId+"&chkState="+chkState
					else
						urllink = urllink+"="+frameId+"&slotId="+slotId+"&muId="+muId+"&errId="+errId+"&reboot="+reboot+"&chkState="+chkState
					window.location = urllink;
				}
				return;
			}
			if (filesize == 0)
			   return;

			oldstatus = parseInt($('curState').value);
			oldrunprg = parseInt($('runPrg').value);
			if(upgradeFile != $('ftpPreFirmFile').value)
			{
			    $('ftpPreFirmFile').value = $('ftpFirmFile').value;
		        $('ftpFirmFile').value = upgradeFile;
		        if(workstatus == oldstatus && workstatus == 3)
		        {
		            $('curPos').value = 0;
		            $('runPrg').value = 0;
		            $('curState').value = 2;
		            return;
		        }
		    }
			//oldrightwd = parseInt(rightprg.style.width);
			uploadValue = parseInt((upload*100)/filesize);
			if(workstatus > oldstatus)
			{
			    $('runPrg').value = uploadValue;
			    $('newState').value = workstatus;
			}
			else if(workstatus == oldstatus && oldrunprg < uploadValue)
			{
	            $('runPrg').value = uploadValue;
			}
		},
		onFailure: function()
		{
		
		}
	}
	);

}

function updateUpgrade(frameId, slotId, devName, upgradable)
{
	var ckStat = parseInt($('curState').value);
	if (ckStat >= 4)
		return;

	requestUrl = "/control/update/upgrade?frameId="+frameId+"&slotId="+slotId+"&devName="+encodeURIComponent(devName)+"&upgradable="+upgradable+"&BWID="+window.top.name;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
				
			strList = response.split("&");
			//alert(strList.length);
			if(strList[strList.length-1].indexOf("BRT=") == 0)
			{
				brtStrList = strList[strList.length-1].split("=");
				isBrtReload = brtStrList[1];
				if(isBrtReload == "true")
				{
					if(window.parent.frames.length != 0)
					{
						window.parent.frames.code.location = "/control/code.htm?userName=" + getCookie("userName") + "&BWID=" + window.top.name;
						window.parent.frames.menu.location = "/control/menuzero.htm";
					}
				}
			}

			for(i=0; i<=strList.length-1; i++)
			{			
				subStrList = strList[i].split("=");
				nm = subStrList[0];
				val = subStrList[1];			

				//alert(strList[i]);
				if(strList[i] == "Redirect")
				{
					//alert(frameId);
                    window.location = "/control/frame/slot/upgrade?frameId="+frameId+"&slotId="+slotId;
					//alert(window.location);
				}
				if(strList[i] == "No Change")
				{
					return;
				}
			}
		},
		onFailure: function()
		{
		
		}
	}
	);

	var refreshRate = getCookie("refreshRate");
	if(refreshRate == null)
	{		
		refreshRate = 5;
		setCookie("refreshRate", refreshRate, MTMCookieDays);		
	}

	upgradeTimerId = setTimeout("updateUpgrade("+frameId+", "+slotId+", '"+devName+"', "+upgradable+")", refreshRate*1000);
}

function clearUpgradeTimeout()
{
    if(upgradeTimerId != null)
        window.clearTimeout(upgradeTimerId);
}

function clearCfgTimeout()
{
    if(cfgTimerId != null)
        window.clearTimeout(cfgTimerId);
}

function confirmToLeaveUpgrade()
{
	var answer = true;

	var pbarObj = top.control.document.getElementById("progressbar");
	if (pbarObj && pbarObj.style.display != 'none')
	{
		/*
		answer = confirm ("Leaving the page will abort the upgrade and may leave the device not operational.\nContinue?");
		 */
		var warningObj = top.control.document.getElementById("upgrade_warning");
		if ( warningObj )
		{
			warningObj.style.color = 'red';
			warningObj.style.fontStyle = 'normal';
		} 
		answer = false;
	}
	//alert("confirmToLeave");
	//if (pbarObj) alert(pbarObj.style.display);
	return answer;
}

function disableLinks()
{
	var theLinks = document.getElementsByTagName("a");
	for(var i = 0; i < theLinks.length; i++)
	{
		theLinks[i].onclick = confirmToLeaveUpgrade;
	}

	/* disable navi tree links */
	disableMenuLinks();
}

function disableMenuLinks()
{
	var theLinks = top.menu.document.getElementsByTagName("a");
	for(var i = 0; i < theLinks.length; i++)
	{
		theLinks[i].onclick = confirmToLeaveUpgrade;
	}
}

function getUnknownSlots()
{
	var unknownSlots = null;
	for(var i = 1; i <= 21; i++)
	{
		var elm = document.getElementById("slot."+i+".name");
		if ( elm && 
		     (elm.innerHTML == "UNKNOWN DEVICE" || elm.innerHTML.indexOf("U<br>N<br>K<br>N<br>O<br>W<br>N<br> <br>D<br>E<br>V<br>I<br>C<br>E") >= 0)
		   )
		{
			if (unknownSlots == null)
			{
				unknownSlots = "uslots=" + i;
			}
			else
			{
				unknownSlots += "." +i;
			}			
		}
	}
	return unknownSlots;
}

function userLogonCheck(str)
{
	var userName = document.getElementById("userName").value;
	var password = document.getElementById("password").value;
	requestUrl = "/control/userLogon?userName=" + userName + "&password="+password + "&BWID=" + window.top.name;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			brtStrList = response.split("=");
			if(brtStrList[1] == "true")
			{
				setCookie("userName", userName);
				setCookie("logonUser", userName,365);
				setCookie("logonPass", password,365);
				setCookie("browserID", window.top.name);
				setCookie(window.top.name, "/control/control.htm");
				window.location = "/control/checkLicense.htm";
			}
			else
			{
				if(brtStrList[1] == "-2")
				{
					$("log_system").style.display = "none";
					$("progress_bar").style.display = "";
				}
				else
					alert("The given user name or password is not correct. Please try again.");
			}
		},
		onFailure: function()
		{

		}
	}
	);

}
function submitAccount(action)
{
	var userName=$('userName').value
	var password=$('password').value
	var confirmPass=$('confirmPass').value
	var user = userName.replace(/(^\s*)|(\s*$)/g,"");
	if (user == "") {
		alert("不允许提交内容为空");
		return;
	}

	if(password != confirmPass) {
		alert("两次输入密码不一致，请新输入");
		return;
	}
	pass = password;
	query = "action="+action+"&userName="+user+"&password="+pass+"&confirmPass="+pass+"&BWID=" + window.top.name;
	requestUrl="/control/administration/submitAccount?" + query;

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			brtStrList = response.split("=");
			value = (brtStrList[1]);
			if(value != "0")
			{
				errmsg = parseInt(value);
				switch (errmsg) {
				case -6:
					alert("用户已经存在，请输入新的用户");
					break;
				case -10:
				case -11:
					alert("修改用户密码失败");
					break;
				default:
					alert("Action for user account error.");
					break;
				}
			}

			if (action == 1 || action == 2)
			{
				window.location = "/control/administration/account?BWID=" + window.top.name;
			}
			else if (action == 3)
			{
				window.location = "control/administration/modifyAccount?userName=" + user + "&BWID=" + window.top.name;
			}
		},
		onFailure: function()
		{

		}
	}
	);

}

function mask(obj, event)
{
	obj.value=obj.value.replace(/[^\d]/g,'')
	key1=event.keyCode
	if (key1==37 || key1==39)
	{
		obj.blur();
		nextip=parseInt(obj.name.substr(2,1))
		nextip=key1==37?nextip-1:nextip+1;
		nextip=nextip>=5?1:nextip
		nextip=nextip<=0?4:nextip
		$("ip"+nextip).focus();
	}
	if(obj.value.length>=3)
	{
		if(parseInt(obj.value)>=256 || parseInt(obj.value)<0)
		{
			obj.value="255";
		}
		obj.blur();
		nextip=parseInt(obj.name.substr(2,1))+1
		nextip=nextip>=5?1:nextip
		nextip=nextip<=0?4:nextip
		$("ip"+nextip).focus();
	}
}

function mask_c(obj)
{
	clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))
}

function maskInt(obj)
{
	obj.value=obj.value.replace(/[^\d]/g,'')
}

function rebootSystem()
{	
	if (!confirm("Reboot device?"))
	{
		return;
	}

	requestUrl = "/control/rebootSystem";
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			if(response == "Ok")
			{
				alert("The system is rebooting ...");
			}
			else
			{				
				alert("Fail to reboot, please manually reboot.");
			}
		},
		onFailure: function()
		{
		
		}
	}
	);

}

function reachProgress(length, flag)
{
	if ($("progress_bar").style.display == "none" || length>100)
		return;
        
	len = $("d2").style.width;
	value = parseInt(len)
	value++;
	if(value > length)
	{
		if(flag == 1)
		{
			$("curStatus").value = 1;
			$("progress_bar").style.display = "none";
			$("log_system").style.display = "";
			$("progress_value").innerHTML = 0;
			$("d2").style.display = "none";
			$("d2").style.width = 0;
		}
		else
		{
			$("progress_value").innerHTML = length;
			$("d2").style.width = length;
		}
		return;
	}
    
	if(value != 0)
	{
		$("d2").style.display = ""
		$("d2").style.width=value;
	}
	$("progress_value").innerHTML=value;
	setTimeout("reachProgress(" + length + ")", 20);
}

function displayThumb(id, ipaddr, frameId, slotId, slotAttr, slotName, priority, type, videoStatus)
{
	var obj;
	var clickAllow = 1;
	if (slotAttr < 0 || slotAttr > 6)
		return;
	if (type == 1)
	{
		obj = document.getElementById("slot_name"+id);
		if (obj.readOnly == true)
			$("slot_name"+id).value = slotName;
	}
	else if (type == 2)
		$("slot_name"+id).innerHTML = "<b>"+slotName+"</b>";
	switch (slotAttr) {
	case 0:
		obj = null;
		try {
			if (videoStatus == -1) 
				obj = document.getElementById("slot_img"+id);
			else
			{
				obj = document.getElementById("slot_img"+id);
				if (obj.style.display != "none")
					obj = document.getElementById("slot_alt_img"+id);
			}
		}
		catch (e) {
			
		}
		var dt = new Date();
		//IE and Firefox get date, is not the same format, variable 'newdtstr' will get different value 
		//var dtstr = dt.toString();
		//var strList = dtstr.split(" ");
		//var timeStrList = strList[3].split(":");
		//var newdtstr = strList[0] + strList[1] + strList[2] + timeStrList[0] + timeStrList[1] + timeStrList[2];
		var newdtstr = dt.toString();
		if (obj != null)
		{
			if (ipaddr == "")
				obj.src = "getThumbImage?t="+newdtstr+"&frameId="+frameId+"&slotId="+id;
			else
			{
				if (videoStatus > 0)
				{
					obj.style.width = 128;
					obj.style.height = 96;
					obj.src = "http://"+ipaddr+"/getThumbImage?t="+newdtstr+"&id="+id;
				}
				else if (videoStatus == 0)
				{
					obj = document.getElementById("slot_img"+id);
					obj.src = "/images/novideo.PNG";
					obj = document.getElementById("slot_alt_img"+id);
					obj.src = "/images/novideo.PNG";
				}
				else
					obj.src = "/images/novideo.PNG";
			}
		}
		else
		{
			if (ipaddr == "")
				$("slot_status"+id).innerHTML = "<img id=\"slot_img"+id+"\" src=\"getThumbImage?t="+newdtstr+"&frameId="+frameId+"&slotId="+id+"\"></img>";
			else
			{
				if (videoStatus > 0)
				{
					$("slot_status"+id).innerHTML = "<img id=slot_img"+id+" onerror=\"handle_error("+id+")\" onload=\"img_load("+id+")\" style=\"width:128;height:96\" src=\"http://"+ipaddr+"/getThumbImage?t="+newdtstr+"&id="+id+"\"></img><img id=slot_alt_img"+id+" onerror=\"handle_alt_error("+id+")\" onload=\"img_alt_load("+id+")\" style=\"width:128;height:96;display:none\"></img>";
				}
				else if (videoStatus == 0)
				{
					$("slot_status"+id).innerHTML = "<img id=slot_img"+id+" onerror=\"handle_error("+id+")\" onload=\"img_load("+id+")\" style=\"width:128;height:96\" src=\"/images/novideo.PNG\"></img><img id=slot_alt_img"+id+" onerror=\"handle_alt_error("+id+")\" onload=\"img_alt_load("+id+")\" style=\"width:128;height:96;display:none\"></img>";

				}
				else
					$("slot_status"+id).innerHTML = "<img id=\"slot_img"+id+"\" src=\"/images/novideo.PNG\"></img>";
			}
		}
		break;
	case 1:
		$("slot_status"+id).innerHTML = "<b>Slot is empty</b>";
		clickAllow = 0;
		break;
	case 2:
		$("slot_status"+id).innerHTML = "<b>Streaming not supported</b>";
		break;
	case 3:
		$("slot_status"+id).innerHTML = "<b>Streaming disabled</b>";
		break;
	case 4:
		$("slot_status"+id).innerHTML = "<b>No video source</b>";
		break;
	case 5:
		$("slot_status"+id).innerHTML = "<b>Streaming error</b>";
		break;
	case 6:
		prop = "<div style=\"font-size:93%;font-weight:900;font-family:'Arial';\" "
		prop += "onclick=\"gotoSubdevHome("+frameId+", "+slotId+", "+id+")\" onmouseover=\"this.style.cursor='pointer'\">"
		prop += "Streaming is disabled</div>"
		$("slot_status"+id).innerHTML = "<b>" + prop + "</b>";
		break;
	default:
		clickAllow = 0;
		break;
	}
	if (type == 1)
		$("slot_click"+id).value = clickAllow;
	var bgColor;
	//var fontColor = "white";
	if (priority < 0)
	{
		bgColor = "black";
	}
	else if (priority > 5)
	{
		bgColor = "red";
	}
	else if (priority > 0)
	{
		bgColor = "yellow";
		//fontColor = "black";
	}
	else
	{
		bgColor = "black";
	}
	//$("slot_name"+id).style.color = fontColor;
	$("slot_top"+id).style.backgroundColor = bgColor;
	$("slot_left"+id).style.backgroundColor = bgColor;
	$("slot_right"+id).style.backgroundColor = bgColor;
	$("slot_bottom"+id).style.backgroundColor = bgColor;
}

function updateThumbStream(frameId, slotId, frequency)
{
	var id = -1;
	var requestUrl = "/control/frame/slot/updateThumbStream?frameId="+frameId+"&slotId="+slotId;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			if (response != null)
			{
				strList = response.split("&");
				for (i=0; i<strList.length; i++)
				{
					slotItem = strList[i].split(",")
					if(slotItem.length < 2)
						continue;
					if (slotItem[0].indexOf("id=") == -1)
						continue;
					slotIdStr = slotItem[0].split("=");
					if (slotIdStr.length < 2)
						continue;
					id = -1;
					id = parseInt(slotIdStr[1]);
					if (id < 1 || id > 20)
						continue;
					{
						var slotAttr = -1;
						slotNameStr = slotItem[1].split("=");
						if (slotNameStr.length <= 1 || slotItem.length < 3)
							continue;
						slotAttrStr = slotItem[2].split("=");
						if (slotAttrStr.length < 2)
							continue;
						slotAttr = parseInt(slotAttrStr[1]);
						if (slotAttr < 0 || slotAttr > 5)
							continue;
						// get alarm hightest priority
						priority = -1;
						if (slotItem.length>=4)
						{
							slotAttrStr = slotItem[3].split("=");
							if (slotAttrStr.length < 2)
								continue;
							priority = parseInt(slotAttrStr[1]);
						}
						//slotname = "Slot " + id + " " + slotNameStr[1];
						slotname = slotNameStr[1];
						try {
							displayThumb(id, "", frameId, slotId, slotAttr, slotname, priority, 1, -1);
						}
						catch (e) {
							break;
						}
					}
				}
			}
			setTimeout("updateThumbStream("+frameId+","+slotId+","+frequency+")", frequency*1000);
		},
		onFailure: function()
		{
			setTimeout("updateThumbStream("+frameId+","+slotId+","+frequency+")", frequency*1000);
		}
	}
	);
}

function updateQseeThumbStream(frameId, slotId, subdevId, ipaddr, frequency)
{
	var id = -1;
	var requestUrl = "/control/frame/slot/updateQseeThumbStream?frameId="+frameId+"&slotId="+slotId+"&inputId="+subdevId+"&ipaddr="+ipaddr;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			if (response != null)
			{
				strList = response.split("&");
				for (i=0; i<strList.length; i++)
				{
					subdevItem = strList[i].split(",")
					if(subdevItem.length < 2)
						continue;
					if (subdevItem[0].indexOf("id=") == -1)
						continue;
					subdevIdStr = subdevItem[0].split("=");
					if (subdevIdStr.length < 2)
						continue;
					id = parseInt(subdevIdStr[1]);
					if (id == 0) // it is media player, update its input name
					{
						//subdevNameStr = subdevItem[1].split("=");
						var parsingStr = strList[i].substring(strList[i].indexOf(",")+1, strList[i].length);
						if (parsingStr.indexOf("name=") == -1 || parsingStr.lastIndexOf(",videosource=") == -1)
							continue;
						keyValue = parsingStr.substring(0, parsingStr.lastIndexOf(",videosource="));
						subdevNameStr = keyValue.split("=");
						if (subdevNameStr.length <= 1)
							continue;
						$("slot_name"+id).innerHTML = "<b>"+subdevNameStr[1]+"</b>";
						if (subdevItem.length > 2)
						{
							//sourceList = subdevItem[2].split("=");
							parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
							if (parsingStr.indexOf("videosource=") != 0)
								continue;
							keyValue = parsingStr.substring(0, parsingStr.indexOf(","));
							sourceList = keyValue.split("=");
							if (sourceList.length < 2)
								continue;
							sourceId = sourceList[1];
							//statusList = subdevItem[3].split("=");
							parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
							if (parsingStr.indexOf("videostatus=") != 0)
								continue;
							keyValue = parsingStr.substring(0, parsingStr.indexOf(","));
							statusList = keyValue.split("=");
							if (sourceList.length < 2)
								continue;
							statusVal = parseInt(statusList[1]);
							//statusList = subdevItem[4].split("=");
							parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
							if (parsingStr.indexOf("videostandard=") != 0)
								continue;
							keyValue = parsingStr.substring(0, parsingStr.indexOf(","));
							statusList = keyValue.split("=");
							if (sourceList.length < 2)
								continue;
							standardVal = parseInt(statusList[1]);
							//statusList = subdevItem[5].split("=");
							parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
							if (parsingStr.indexOf("streamoption=") != 0)
								continue;
							keyValue = parsingStr;
							statusList = keyValue.split("=");
							if (sourceList.length < 2)
								continue;
							streamOption = parseInt(statusList[1]);
							oldSourceId = parseInt($("videosource").value);
							oldStatusVal = parseInt($("videostatus").value);
							oldStandardVal = parseInt($("videostandard").value);
							oldStreamOption = parseInt($("streamoption").value);
							reloadMedia = 0
							if (oldStatusVal != statusVal)
							{
								// Reload Media Player, if it is preset status
								if (statusVal == 1)
								{
									reloadMedia = 1;
								}
							}
							// if the video standard changed, it will reload media
							else if (statusVal == 1)
							{
								if (oldStandardVal != standardVal)
								{
									reloadMedia = 1;
								}
							}
							if (streamOption != oldStreamOption)
							{
								if ((streamOption < 2) && (oldStreamOption > 1))
									reloadMedia = 1;
							}
							$("videosource").value = sourceId;
							$("videostatus").value = statusVal;
							$("videostandard").value = standardVal;
							$("streamoption").value = streamOption;
							if (reloadMedia != 1)
								continue;

							plugId = parseInt($("plugid").value);
							if (plugId > 0)
								playVideoStreaming(frameId, slotId, 1);
						}
					}
					else
					{
						var parsingStr = strList[i].substring(strList[i].indexOf(",")+1, strList[i].length);
						if (parsingStr.indexOf("name=") == -1 || parsingStr.lastIndexOf(",type=") == -1)
							continue;
						keyValue = parsingStr.substring(0, parsingStr.lastIndexOf(",type="));

						subdevAttr = -1;
						//subdevNameStr = subdevItem[1].split("=");
						subdevNameStr = keyValue.split("=");
						if (subdevNameStr.length <= 1 || subdevItem.length < 3)
							continue;
						parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
						if (parsingStr.indexOf("type=") != 0)
							continue;
						keyValue = parsingStr.substring(0, parsingStr.indexOf(","));
						//subdevAttrStr = subdevItem[2].split("=");
						subdevAttrStr = keyValue.split("=");
						if (subdevAttrStr.length < 2)
							continue;
						subdevAttr = parseInt(subdevAttrStr[1]);
						if (subdevAttr < 0 || subdevAttr > 6)
							continue;
						parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
						priority = -1;
						//if (subdevItem.length >= 4)
						if (parsingStr.indexOf("priority=") == 0)
						{
							//slotAttrStr = subdevItem[3].split("=");
							keyValue = parsingStr.substring(0, parsingStr.indexOf(","));
							slotAttrStr = keyValue.split("=");
							if (slotAttrStr.length < 2)
								continue;
							priority = parseInt(slotAttrStr[1]);
							parsingStr = parsingStr.substring(keyValue.length+1, parsingStr.length);
						}
						// if alarm hightest priority is 0, update its value to -1, it will show black
						// if value is 0, color is black;
						if (priority == 0)
							priority = -1;
						videoStatus = -1;
						//if (subdevItem.length >= 5) // video status
						if (parsingStr.indexOf("videostatus=") != -1)
						{
							//slotVideoStatus = subdevItem[4].split("=");
							slotVideoStatus = parsingStr.split("=");
							if (slotVideoStatus.length < 2)
								continue;
							videoStatus = parseInt(slotVideoStatus[1]);
							$("slot_imgstatus"+id).value = videoStatus;
						}
						displayThumb(id, ipaddr, frameId, slotId, subdevAttr, subdevNameStr[1], priority, 2, videoStatus);
					}
				}
			}
			setTimeout("updateQseeThumbStream("+frameId+","+slotId+","+subdevId+",'"+ipaddr+"',"+frequency+")", frequency*1000);
		},
		onFailure: function()
		{
			setTimeout("updateQseeThumbStream("+frameId+","+slotId+","+subdevId+",'"+ipaddr+"',"+frequency+")", frequency*1000);
		}
	}
	);

}

function resendRequest(frameId, slotId)
{
	var id = -1;
	var requestUrl = "/control/frame/slot/resendRequest?frameId="+frameId+"&slotId="+slotId;
	new Ajax.Request(requestUrl,
	{
		method : 'post',
		onSuccess: function(transport)
		{
		},
		onFailure: function()
		{
		}
	}
	);
	setTimeout("resendRequest("+frameId+","+slotId+")", 60000);
}

function playVideoStreaming(frameId, slotId, plugId)
{
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject)
		Sys.ie = ua.match(/msie ([\d.]+)/)[1];
	else if (ua.indexOf("firefox"))
		Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	if (plugId == 1)
	{
		ieVersion = 0
		if (Sys.ie && ieVersion == 0)
		{
			control = new ActiveXObject("QuickTimeCheckObject.QuickTimeCheck");
			pluginVersion = control.QuickTimeVersion.toString(16);
			mainVersion = parseInt(pluginVersion.substring(0, 1));
			secondVersion = parseInt(pluginVersion.substring(1, 2));
			if (mainVersion == 7 && secondVersion >= 6)
				ieVersion = 1
			else
			{
				objmp = document.getElementById("mediaplayer");
				urlset = "qseeplayer.mov?frameId=" + frameId + "&slotId=" + slotId;
				objmp.SetURL(urlset);
				objmp.Play();
			}
		}
		if (Sys.firefox || ieVersion == 1)
		{
			player = "<object classid=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" width=300 height=200 id=\"mediaplayer\">"
			player += "<param name=\"src\"  value=\"qseeplayer.mov?frameId="+frameId+"&slotId="+slotId+"\">"
			player += "<param name=\"autoplay\" value=\"true\">"
			player += "<embed src=\"qseeplayer.mov?frameId="+frameId+"&slotId="+slotId+"\" width=300 height=200 autoplay=\"true\"></embed>"
			$("objmedia").innerHTML = player;
		}
	}
	else if (plugId == 2)
	{
		//TODO: Implement VLC play media
	}
}

function submitNumber(action)
{
	var query="";
	var numberElem="";
	var newNumber="";
	var requestUrl;
	var count=0;
	var list="";
	if (action==4)
	{
		var selectedid=document.getElementsByName("checkbox1");
		if (typeof(selectedid.length) == "undefined")
			return;
		for(var i=0; i<selectedid.length; i++) {
			if (selectedid[i].checked) {
				if (list == "")
					list = selectedid[i].value;
				else
					list=list + ',' + selectedid[i].value
				count++;
			}
		}
		if (count <= 0)
			return;
		if (confirm("真的确定删除用户吗?"))
		{
		}
		else
			return;
		query = "action="+action+"&list="+list+"&BWID=" + window.top.name;
		requestUrl="/control/administration/submitNumber?" + query;
	}
	else
	{
		newNumber = $('newNumber').value;
		newNumber = newNumber.replace(/(^\s*)|(\s*$)/g,"");
		if (newNumber=="")
		{
			alert("不允许提交内容为空.");
			return;
		}
		if (action==1)
		{
			query = "action="+action+"&newNumber="+newNumber+"&BWID=" + window.top.name;
		}
		else if (action==3)
		{
			numberElem=$('numberElem').value;
			query = "action="+action+"&numberElem="+numberElem+"&newNumber="+newNumber+"&BWID=" + window.top.name;
		}
		requestUrl="/control/administration/submitNumber?" + query;
	}

	new Ajax.Request(requestUrl,
	{
		method : 'post',
		//parameters: { any:1},
		onSuccess: function(transport)
		{
			var response = transport.responseText;
			brtStrList = response.split("=");
			value = (brtStrList[1]);
			if(value != "0")
			{
				errmsg = parseInt(value);
				switch (errmsg) {
				case -2:
					alert("当前联系人数量已经最大");
					break;
				default:
					if (action==1)
						alert("Create action error");
					else if (action==3)
						alert("Modify action error");
					else if (action==4)
						alert("Delete action error");
					else
						alert("Unknown error");
					break;
				}
			}
			window.location = "/control/administration/listNumber?BWID=" + window.top.name;
			//if (action == 1 || action == 2)
			{
			//	window.location = "/control/administration/?listNumberBWID=" + window.top.name;
			}
			//else if (action == 3)
			{
			//	window.location = "control/administration/modifyAccount?userName=" + user + "&BWID=" + window.top.name;
			}
		},
		onFailure: function()
		{

		}
	}
	);
}

