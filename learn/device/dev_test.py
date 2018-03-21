import os
import sys
import re
from django.http import HttpResponse
from django.shortcuts import render

STATUS_UNLOCK="unlocked"
LINE_END = '\n'

if os.name == 'nt':
    import win32con, win32file, pywintypes
    FILE_PATH = "learn\\device\\config\\"
    LOCK_EX = win32con.LOCKFILE_EXCLUSIVE_LOCK
    LOCK_SH = 0 # The default value
    LOCK_NB = win32con.LOCKFILE_FAIL_IMMEDIATELY
    __overlapped = pywintypes.OVERLAPPED(  )

    def lock(file, flags):
        hfile = win32file._get_osfhandle(file.fileno(  ))
        win32file.LockFileEx(hfile, flags, 0, 0xffff0000, __overlapped)

    def unlock(file):
        hfile = win32file._get_osfhandle(file.fileno(  ))
        win32file.UnlockFileEx(hfile, 0, 0xffff0000, __overlapped)
elif os.name == 'posix':
    from fcntl import LOCK_EX, LOCK_SH, LOCK_NB
    
    FILE_PATH = "learn/device/config/"

    def lock(file, flags):
        fcntl.flock(file.fileno(  ), flags)

    def unlock(file):
        fcntl.flock(file.fileno(  ), fcntl.LOCK_UN)
else:
    raise RuntimeError("File Locker only support NT and Posix platforms!")

def req_prop_value(req, name):
    if req.method == "GET":
        return req.GET[name]
    elif req.method == "POST":
        return req.POST[name]
    else:
        print ("UNKNOW request method......")

def alter(file_name, cfg_name, new_value):
    file_data = ""
    with open(file_name, "r") as f:
        lock(f, LOCK_EX)
        for line in f:
            if line.find(cfg_name) >= 0:
                line = cfg_name + "=" + new_str.strip() + LINE_END
            file_data += line
        unlock(f)
        f.close()
    with open(file_name,"w") as f:
        lock(f, LOCK_EX)
        f.write(file_data)
        unlock(f)
        f.close()

def get_config_value(file_path, config_name):
    f = open(file_path,'r')
    lock(f, LOCK_EX)
    tmp = ''
    for line in f.readlines():
        line = line.strip()
        if re.search(config_name + '[ ]*=', line):
            tmp = re.sub(config_name + '[ ]*=', '', line).strip()
            tmp = tmp.split("#")
            break
    unlock(f)
    f.close()
    if tmp:
        return  tmp[0].strip()
    else:
        return ""

def dev_json(result, msg):
    jsondata = "{\"result\":\"" + result + "\","
    jsondata += "\"msg\":\"" + msg + "\","
    jsondata += "\"data\":[{"

    for sub_dir in os.listdir(FILE_PATH): 
        path = os.path.join(FILE_PATH, sub_dir)
        files = os.listdir(path)
        if not files:
            continue
        else:
            jsondata += "\"dev_type\":\"" + sub_dir + "\","
            jsondata += "\"devices\":["
            for cfg_file in files: 
                path1 = os.path.join(path, cfg_file)
                
                jsondata += "{" 
                jsondata += "\"dev_name\":\""    + get_config_value(path1, "dev_name")+ "\","
                jsondata += "\"dev_ip\":\""      + get_config_value(path1, "dev_ip")+ "\","
                jsondata += "\"serial_name\":\"" + get_config_value(path1, "serial_name")+ "\","
                jsondata += "\"power_ip\":\""    + get_config_value(path1, "power_ip")+ "\","
                jsondata += "\"power_port\":\""  + get_config_value(path1, "power_port")+ "\","
                jsondata += "\"status\":\""  + get_config_value(path1, "status")+ "\","
                jsondata += "}," 

            jsondata += "]," 
    jsondata += "}," 
    jsondata += "]," 
    jsondata += "}" 

    return jsondata

def dev_add(req):
    dev_type = req_prop_value(req, 'dev_type') 
    dev_name = req_prop_value(req, 'dev_name') 

    path = os.path.join(FILE_PATH, dev_type)

    if not os.path.exists(path): 
        if not os.makedirs(path):
           print ("successful to create %s" %path)
        else:
           print ("failed to create %s" %path)
    else:
        print ("%s is already exist" %path)

    path = os.path.join(path, dev_name)
    if os.path.exists(path): 
        json = dev_json("failed","ERROR: device name " + dev_name + " already exists")
        return json 
    
    new_data = "dev_type=" + dev_type + LINE_END
    new_data += "dev_name=" + dev_name + LINE_END
    new_data += "dev_ip=" + req_prop_value(req, 'dev_ip') + LINE_END
    new_data += "serial_name=" + req_prop_value(req, 'serial_name') + LINE_END
    new_data += "power_ip=" + req_prop_value(req, 'power_ip') + LINE_END
    new_data += "power_port=" + req_prop_value(req,"power_port") + LINE_END
    new_data += "status=" + STATUS_UNLOCK + LINE_END

    new_fd = open(path, "w")
    lock(new_fd, LOCK_EX)
    new_fd.write(new_data)
    unlock(new_fd)
    new_fd.close()
    json = dev_json("successful","")
    return json 

def dev_find_by_name(name):
    pass
     

def dev_remove(req):
    board = req_prop_value(req, "") 
    path = os.path.join(FILE_PATH, board)

    if get_config_value(path, "status") != STATUS_UNLOCK: 
        print ("ERROR: device is busy")
    else:
        pass 

def dev_show():
    pass

def dev_update(req):
    cfg_name = req_prop_value(req, "")
    new_value = req_prop_value(req, "")
    file_name = os.path.join(FILE_PATH, req_prop_value(req, ""))
    alter(file_name, cfg_name, new_value)
    
def dev_get():
    dev_name = req_prop_value(req, "") 
    user = req_prop_value(req, "") 
    path = os.path.join(FILE_PATH, board)
    if get_config_value(path, "status") == STATUS_UNLOCK: 
        alter(path, "status", user)
        return 0
    else:
        return 1 

def dev_put():
    pass

def dev_handle(req):

    print (req.path)
    if req.path.strip() == "/devices/dev_add/":
        data = dev_add(req)
    elif req.path.strip() == "/devices/dev_remove/":
        dev_remove()
        print ("dev_put")
    elif req.path.strip() == "/devices/dev_get/":
        dev_get()
        print ("dev_get")
    elif req.path.strip() == "/devices/dev_put/":
        dev_put()
        print ("dev_put")
    else:
        print ("wrong request path......")
	
    return HttpResponse(data)
