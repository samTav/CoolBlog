
var npass=0;
var nopass=0;
(function(){

    $('#posts').mouseover(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '../html/php/posts.php',
            data:{num: npass},
            success: function(response) {
               $('#post1').append(response);
               npass++;
            }
        });

    });
    $('#submitForm').on('click',function(e){
        $.ajax({
            type: 'POST',
            url: '../html/php/newPosts.php',
            data:$('#newPostForm').serialize(),
            success: function() {
                $('#title').val('');
                $('#content').val('');
                $('#post1').empty();
                $('#rowOwnPosts').empty();
                npass=0;
                nopass=0;
                //window.location = '#posts';
            }

        });
    });
    $('#morePosts').on('click',function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../html/php/extraPosts.php',
            success: function(response) {
                $('#post1').empty();
                $('#post1').append(response);

            }
        });
    });
    $('#ownPosts').mouseover(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../html/php/ownPosts.php',
            data:{nPass:nopass},
            success: function(response) {
                if(response==2){
                    swal({
                        title: "User not logged",
                        type: "error",
                        showCancelButton: true,
                        confirmButtonColor: "#66bc97",
                        confirmButtonText: "Log in",
                        closeOnConfirm: true,
                        html: false
                    },function () {
                        window.location = '../html/index.html';
                    });

                }else{
                    nopass++;
                    $('#rowOwnPosts').append(response);
                }

            }
        });

    });
    $('#logout').on('click',function(e){
        e.preventDefault();

        swal({
            title: "You sure want to sign out?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#66bc97",
            confirmButtonText: "Yes",
            closeOnConfirm: false,
            html: false
        }, function(){
            window.location = '../html/php/logout.php';
        });
    });
}());

