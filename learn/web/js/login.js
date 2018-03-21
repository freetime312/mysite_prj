$(document).ready(function(){
    $('#loginbox').fadeIn('slow');
    
    $('#user_input').focus(function(){
            $("#user_input").css("color","#222222");
            $("#user_input").css("background-color","#ffffff");
            if ($(this).val() == '请输入账号') {
                 $(this).val('');
            }
    });
    
    $('#user_input').blur(function(){
            $("#user_input").css("color","#999999");
            $("#user_input").css("background-color","#d0d0d0");
            if ($(this).val() == '') {
                 $(this).val('请输入账号');
            }
    });
    
    $('#pwd_input').focus(function(){
            $("#pwd_input").css("color","#222222");
            $("#pwd_input").css("background-color","#ffffff");
            if ($(this).val() == '请输入密码') {
                 $(this).val('');
                     $(this).attr('type', 'password');
            }
    });
    
    $('#pwd_input').blur(function(){
            $("#pwd_input").css("color","#999999");
            $("#pwd_input").css("background-color","#d0d0d0");
            if ($(this).val() == '') {
                 $(this).val('请输入密码');
                     $(this).attr('type', 'text');
            }
    });

    $("#pwd_input").keyup(function(event){
        if(event.keyCode == 13) {
           window.location = 'home.html';
        } 
    });

    $("#login_bt").click(function(){
        window.location = 'home.html';
    });
    
});


