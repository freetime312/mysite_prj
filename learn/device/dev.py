import os
import sys
import re
from django.http import HttpResponse
from django.shortcuts import render

DEVICE_DATA_FILE="learn/devices.data"
STATUS_UNLOCK="unlocked"

def dev_read():
    if not os.path.exists(DEVICE_DATA_FILE):
        open(DEVICE_DATA_FILE,'w').close;
    with open(DEVICE_DATA_FILE, 'r') as fdread:
        lines = fdread.readlines()
        fdread.close()
    return lines

def dev_save(lines):
    with open(DEVICE_DATA_FILE, 'w') as fdwrite:
        fdwrite.writelines(lines)
        fdwrite.close()

def dev_find_type(lines, type):
    regexflag = r'%s\:' % type
    patternflag = re.compile(regexflag)
    for n in range(len(lines)):
        if patternflag.search(lines[n]):
            return n
    return -1

def dev_find_name(line, name): regexflag = r'\[%s\,([^\]]*)\]' % name
    patternflag = re.compile(regexflag)
    return patternflag.search(line)

def dev_add(type, name):
    lines = dev_read()
    n = dev_find_type(lines, type)
    if n < 0:
        line = type + ":\n"
    else:
        line = lines[n]
        if dev_find_name(line, name):
            return -1
    line = line[:-1] + "[" + name + "," +STATUS_UNLOCK +"]\n"
    if n < 0:
        lines.insert(len(lines), line)
    else:
        lines[n] = line
    dev_save(lines)
    return 0

def dev_remove(type, name):
    lines = dev_read()
    n = dev_find_type(lines, type)
    if n < 0:
        return -1
    line = lines[n]
    match_obj = dev_find_name(line, name)
    if not match_obj:
        return -1
    if match_obj.group(1) != STATUS_UNLOCK:
        return -1
    regexflag = r'\[%s\,([^\]]*)\]' % name
    patternflag = re.compile(regexflag)
    line = patternflag.sub("", line)
    lines[n]=line
    dev_save(lines)
    return 0

def dev_line_status_set(line, name, status):
    regexflag = r'\[%s\,([^\]]*)\]' % name
    patternflag = re.compile(regexflag)
    return patternflag.sub("["+ name + ","+ status + "]", line)

def dev_status_set(type, name, status):
    lines = dev_read()
    n = dev_find_type(lines, type)
    if n < 0:
        return 0
    line = lines[n]
    match_obj = dev_find_name(line, name)
    if not match_obj:
        return 0
    if match_obj.group(1) == status:
        return name
    if (match_obj.group(1) != STATUS_UNLOCK) and (status != STATUS_UNLOCK):
        print ("Failed to get the device "+ name +",it's locked by " + match_obj.group(1))
        return 0
    line = dev_line_status_set(line, name, status)
    lines[n]=line
    dev_save(lines)
    return name

def dev_get(type, name, status):
    if name:
        return dev_status_set(type, name, status);
    lines = dev_read()
    n = dev_find_type(lines, type)
    if n < 0:
        return 0
    line = lines[n]
    regexflag = r'\[([^\,]*)\,([^\]]*)\]'
    patternflag = re.compile(regexflag)
    devs = patternflag.findall(line)
    for i in range(len(devs)):
        if devs[i][1] == STATUS_UNLOCK:
            line = dev_line_status_set(line, devs[i][0], status)
            lines[n]=line
            dev_save(lines)
            return devs[i][0]
    return 0

def dev_json():
    jsondata = "["
    lines = dev_read()
    print ('====',lines)
    for n in range(len(lines)):
        print (n)
        if n !=0:
            jsondata += ","
        jsondata += "{"
        line = lines[n]
        regexflag = r'([^\:]*)\:(.*)'
        patternflag = re.compile(regexflag)
        match_obj = patternflag.search(line)
        if not match_obj:
            continue
        jsondata += "\"" + match_obj.group(1) + "\":["
        line = match_obj.group(2)
        regexflag = r'\[([^\,]*)\,([^\]]*)\]'
        patternflag = re.compile(regexflag)
        devs = patternflag.findall(line)
        for i in range(len(devs)):
            if i !=0:
                jsondata += ","
            jsondata += "{"
            jsondata += "\"" + devs[i][0] + "\":{\"status\":\"" + devs[i][1] + "\"}"
            jsondata += "}"
        jsondata += "]}"
    jsondata += "]"
    return jsondata


def dev_handle(req):
    get = req.GET
    tp = get['type']
    tp = req.GET['type']
    if req.path == "/listtask/dev_add":
        print (req.method)
    elif req.path == "/listtask/dev_remove":
        dev_remove()
        print ("dev_remove")
    elif req.path == "/listtask/dev_find":
        print ("dev_find")
    print (os.getcwd())
    print (tp)
    return HttpResponse(u"欢迎光临 " + tp + "!")
    
if __name__ == '__main__':
    cfg_opt = sys.argv[1]
    if cfg_opt == "add":
        #add type name
        if len(sys.argv) <= 3:
            sys.exit(1)
        print (dev_add(sys.argv[2], sys.argv[3]))
    elif cfg_opt == "remove":
        #remove type name
        if len(sys.argv) <= 3:
            sys.exit(1)
        print (dev_remove(sys.argv[2], sys.argv[3]))
    elif cfg_opt == "get":
        #get user type name
        if len(sys.argv) <= 3:
            sys.exit(1)
        if len(sys.argv) == 4:
            print (dev_get(sys.argv[3], 0, sys.argv[2]))
        elif len(sys.argv) == 5:
            print (dev_get(sys.argv[3], sys.argv[4], sys.argv[2]))
    elif cfg_opt == "put":
        #put type name
        if len(sys.argv) <= 3:
            sys.exit(1)
        print (dev_status_set(sys.argv[2], sys.argv[3], STATUS_UNLOCK))
    elif cfg_opt == "json":
        print (dev_json())
    else:
        sys.exit(1)
    sys.exit(0)
