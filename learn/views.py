# coding:utf-8
from django.http import HttpResponse
from django.shortcuts import render



def index(request):
    return HttpResponse(u"欢迎光临!")

def home(request):
    return render(request, 'home.html')

def login(request):
    return render(request, 'login.html')

def task(request):
    return render(request, 'task.html')

def device(request):
    return render(request, 'device.html')

def help(request):
    return HttpResponse("Help Web Page online!")

def add(request):
    return HttpResponse("Help Web Page online!")
   # a = request.GET['a']
    #b = request.GET['b']
  #  a = int(a)
   # b = int(b)
    #return HttpResponse(str(a+b))

def get(request):
    board = "avnet:zed0<br>"
    board += "avnet:zed1<br>"
    board += "avnet:zed2<br>"
    return HttpResponse(board)

def tasklist(request):
    djson =dev_json()
    board =  "1 Task1 <br>"
    board += "3 Task2 <br>"
    board += "6 Task3 <br>"
    board += djson
    return HttpResponse(board)
