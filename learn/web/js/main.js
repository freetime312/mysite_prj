function jsonGetVal(json, id)
{
    for(var pos = 0; pos < json.data.length; pos++)
    {
        if (typeof json.data[pos].id != 'undefined' && 
            typeof json.data[pos].value != 'undefined' &&
            json.data[pos].id == id) {
            return json.data[pos].value;
        }
    }
    return null;
}


function getBWID()
{ 
    return window.top.name;
}


function loadValByJson(json)
{
    for(var pos = 0; pos < json.data.length; pos++)
    {
        if (typeof json.data[pos].id != 'undefined' && 
            typeof json.data[pos].value != 'undefined') {
            $('#' + json.data[pos].id).val(json.data[pos].value);
            if($('#' + json.data[pos].id + "_hidden").length==0)
                continue;
            $('#' + json.data[pos].id + "_hidden").val(json.data[pos].value);
        }
    }
}

function checkIntValue(int_list)
{
    var i;
    ret = 1;
    for (i=0; i<int_list.length; i++)
    {
        value = $("#" + int_list[i]).val();
        if (isNaN(value))
        {
            name = $("#" + int_list[i] + "_name").html();
            alert(name + "的值'" + value + "'是非法的数字");
            ret = -1;
            break;
        }
    }
    return ret;
}

function gotoPage(tableID,obj,maxpage){
 var i=parseInt(obj.value)-1;
 if(i>=0&&i<maxpage){
    $('#'+tableID).dataTable().fnPageChange(i);
 }
}
