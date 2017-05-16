(function(){
    $('#signin').on('click',function(e){
        e.preventDefault();
        $('#signin').hide();
        $('#signup').hide();

        $data='<div class="form-group">' +
            '<input type="text"  required="required" name = "email" class="form-control" placeholder="Introduce email / username" id="email"></div>';

        $('#formSignIn').append($data);

        $data='<div class="form-group"><input type="password" required="required" name = "pass" placeholder="Introduce your password" class="form-control" id="pass"></div>';
        $('#formSignIn').append($data);

        $data='<a id="submitForm"class="btn btn-default btn-lg">Log in</a>';
        $('#formSignIn').append($data);

        $('#submitForm').on('click',function(e){
            e.preventDefault();
            if(!validaEmail($('#email').val())){
                if(!validaUsername()){
                    $('#email').css('border-color', 'red');
                    swal({
                        title: "Email or Username incorrect format",
                        type: "error",
                        showCancelButton: true,
                        confirmButtonColor: "#66bc97",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: false
                    });
                }
            }
            if(validatePassword($('#pass').val())){
                console.log('pass ok');
                $.ajax({
                    type: 'POST',
                    url: '../html/php/login.php',
                    data: {email:$('#email').val(),pass:$('#pass').val()},
                    success: function($response){
                        console.log($response);
                        if($response==2){
                            swal({
                                title: "User already signed ",
                                type: "error",
                                showCancelButton: true,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "Log Out",
                                closeOnConfirm: true,
                                html: false
                            },function () {
                                window.location = '../html/php/logout.php';
                            });
                        }
                        if($response==1){
                            swal({
                                title: "Logged",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "OK",
                                closeOnConfirm: false,
                                html: false
                            },function () {
                                window.location = '../html/index_blog.html';
                            });
                        }
                        if($response==0){
                            swal({
                                title: "User not found",
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "OK",
                                closeOnConfirm: true,
                                html: false
                            });
                        }
                        //window.location = '../html/index_.html';
                    }
                });

            }else{
                $('#pass').css('border-color', 'red');
                swal({
                    title: "Incorrect password",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#66bc97",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                });
            }
        });
    });

    $('#signup').on('click',function(e) {
        e.preventDefault();
        $('#signin').hide();
        $('#signup').hide();

        $data = '<div class="form-group">' +
            '<input type="text"  required="required" name = "usernamesignup" class="form-control" ' +
            'placeholder="Introduce your username" id="usernamesignup"></div>';

        $('#formSignUp').append($data);

        $data = '<div class="form-group">' +
            '<input type="text"  required="required" name = "email" class="form-control" placeholder="Introduce email" id="emailsignup"></div>';

        $('#formSignUp').append($data);

        $data = '<div class="form-group">' +
            '<input type="password" required="required" name = "passsignup"' +
            ' placeholder="Introduce your password" class="form-control" id="passsignup"></div>';

        $('#formSignUp').append($data);
        $data = '<div class="form-group">' +
            '<input type="password" required="required" name = "confirm_pass" ' +
            'placeholder="Confirm your password" class="form-control" id="confirm_pass"></div>';
        $('#formSignUp').append($data);

        $data = '<div class="form-group">' +
            '<input type="text" required="required" name = "bdate"' +
            ' placeholder="Date of birth: YYYY/MM/DD" class="form-control" id="bdate"></div>';
        $('#formSignUp').append($data);

        $data = '<a id="sendData"class="btn btn-default btn-lg">Register New User</a>';
        $('#formSignUp').append($data);

        $('#sendData').on('click', function (e) {
            e.preventDefault();
            if (!validaEmail($('#emailsignup').val())) {
                $('#emailsignup').css('border-color', 'red');
                swal({
                    title: "Incorrect format on email",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#66bc97",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                });
            }
            if (!validaUsername($('#usernamesignup').val())) {
                $('#usernamesignup').css('border-color', 'red');
            }

            if(!validateDate($('#bdate').val())){
                $('#bdate').css('border-color', 'red');

            }
            if (validatePasswordRegistration($('#passsignup').val(),$('#confirm_pass').val())) {
                console.log('pass ok');
                var reg = new Object();

                reg.email = $('#emailsignup').val();
                reg.pass = $('#passsignup').val();
                reg.date = $('#bdate').val();
                reg.confirm_pass = $('#confirm_pass').val();
                reg.username = $('#usernamesignup').val();
                var stringData = JSON.stringify(reg);
                $.ajax({
                    type: 'POST',
                    url: '../html/php/register.php',
                    data: {myData: stringData},
                    success: function ($response) {
                        console.log($response);
                        if ($response == 2) {
                            swal({
                                title: "User already signed ",
                                type: "error",
                                showCancelButton: true,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "Log Out",
                                closeOnConfirm: true,
                                html: false
                            }, function () {
                                window.location = '../html/php/logout.php';
                            });
                        }
                        if ($response == 1) {
                            swal({
                                title: "New User Registred",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "OK",
                                closeOnConfirm: false,
                                html: false
                            },function () {
                                window.location = '../html/index.html';
                            });
                        }
                        if ($response == 0) {
                            swal({
                                title: "Data not sended",
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#66bc97",
                                confirmButtonText: "OK",
                                closeOnConfirm: true,
                                html: false
                            });
                        }
                    }
                });

            } else {
                $('#pass').css('border-color', 'red');
                swal({
                    title: "Incorrect format parameters",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#66bc97",
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    html: false
                });
            }
        });
    });
}());

function validaEmail($v1){
    var usernameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(usernameRegex.test($v1)){
        return true;
    }else{
        return false;
    }

    return false;
}

function validaUsername($v1){
    var usernameRegex = /^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*[a-zA-Z0-9]$/;
    if(usernameRegex.test($v1)){
        return true;
    }else{
        return false;
    }

    return false;
}
function validatePassword($v1){

    if ($v1.length < 6) {
        return false;
    }
    if ($v1.search(/[a-z]/i) < 0) {
        return false;
    }
    if ($v1.search(/[A-Z]/i) < 0) {
        return false;
    }
    if ($v1.search(/[0-9]/) < 0) {
        return false;
    }
    return true;
}
function validateDate(dateString){
        var regEx = /(\d{4})[-\/](\d{2})[-\/](\d{2})/
        return dateString.match(regEx) != null;
}


function validatePasswordRegistration($v1,$v2){

    if($v1!=$v2){
        return false;
    }
    if ($v1.length < 6) {
        return false;
    }
    if ($v1.search(/[a-z]/i) < 0) {
        return false;
    }
    if ($v1.search(/[A-Z]/i) < 0) {
        return false;
    }
    if ($v1.search(/[0-9]/) < 0) {
        return false;
    }
    return true;
}

