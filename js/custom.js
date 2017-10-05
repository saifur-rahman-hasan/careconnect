/*
 * Main JS
 * Theme Name   : careconnectt
 * Author       : MD. Abu Ahsan Basir
 * Description  : Careconnect | ChatRoom
 * Version      : 1.0
 */


(function($) {
    "use strict";

    var serachHeight = $('.search').height();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    $('.setScreen').css({
        height: windowHeight + 'px',
        paddingTop: '60px',
        paddingBottom: '20px'
    });

    $('.list').css({
        maxHeight: (windowHeight - serachHeight - 120) + 'px',
        paddingBottom : '20px'
    });

    // Code For Mobile device
    if (windowWidth < 767) {
        $('.online-btn').css({display: "block"});
        $('#people-list').addClass("collapse");
        $('.chatbox-tabs').css({display: "block"});
        $('.single-tab-content').each(function(){
            $(this).addClass("tab-pane fade");
        });

        $('.setScreen').css({
            paddingBottom: '0px'
        });

        $('.list').css({
            maxHeight: (windowHeight - serachHeight - 240) + 'px',
            paddingBottom : '20px'
        });
        $('.single-tab-content').css({
            height: (windowHeight - 140) + 'px',
            maxHeight: (windowHeight - 140) + 'px',
            paddingBottom: '0px'
        });

        $('.chat').css({
            height: (windowHeight - 140) + 'px',
        });

        $('.chat-history').css({
            height: ($('.chat').height() - $('.chat-header').outerHeight() - $('.chat-message').outerHeight()) + 'px'
        });

        $('#people-list').removeClass("collapse");

        $('#people-list').css({paddingTop: 0});

        $(document).on("click", function(e){

            if($(e.target).is("#people-list") || $(e.target).is("#search") || $(e.target).is("#listbox") || $(e.target).is("#list")){
                $('#people-list').addClass("activePeople");
            }else if($(e.target).is("#online-btn")){
                $('#people-list').toggleClass("activePeople");
            }else{
                $('#people-list').removeClass("activePeople");
            }
        });

        $('.hide-people').on("click",function(){
            $('#people-list').removeClass("activePeople");
        });

    }else{
        $('.online-btn').css({display: 'none'});
        $('.hide-people').css({display: 'none'});
        $('.chatbox-tabs').css({display: "none"});
        $('.single-tab-content').each(function(){
            $(this).removeClass("tab-pane fade");
        });

        $('.single-tab-content').css({
            height: '100%',
            maxHeight: (windowHeight - 80) + 'px',
        });

        $('.chat').css({
            height: (windowHeight - 100) + 'px',
        });

        $('.chat-history').css({
            height: ($('.chat').height() - $('.chat-header').outerHeight() - $('.chat-message').outerHeight()) + 'px'
        });

        // Code for right side
        $('.rightside').css({
            height: (windowHeight - 80) + 'px',
        });

        var rightsideItems = $('.modules > div');

        var len = 0;

        rightsideItems.each(function(){
            $(this).find("div").css({height: 'auto'});
            len = len + 1;
        });

        var rightsideItemHeight = ((windowHeight - 100)/len);

        //var rightsideHeight = $('.diary').height();

        rightsideItems.each(function(){

            var rightsideHeight = (rightsideItemHeight - 5);
            $(this).css({
                height: '100%',
                maxHeight: rightsideHeight,
                'overflow-y': 'scroll',
                'background-color': '#F2F5F8',
                'margin-left': '15px',
                'margin-bottom': '10px',
                'border-radius': '5px'
            });

            //$('.diary').css({height: rightsideHeight});
        });
    }


    $('.chatbox-tabs li a').on("click",function(){

        $('.chatbox-tabs li a').each(function(){
            var id = $(this).attr("href");
            $(id).removeClass("show active");
        });
        var target =  $(this).attr("href");
       $(target).addClass("show active");

    });

    $(window).resize(function(){
        var serachHeight = $('.search').height();
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        $('.setScreen').css({
            height: windowHeight + 'px',
            paddingTop: '60px',
            paddingBottom: '20px'
        });

        $('.rightside').css({
            height: (windowHeight - 80) + 'px',
        });

        $('.list').css({
            maxHeight: (windowHeight - serachHeight - 20) + 'px',
            paddingBottom : '60px'
        });

        // Code For Mobile device
        if (windowWidth < 767) {
            $('.online-btn').css({display: "block"});
            $('#people-list').addClass("collapse");
            $('.chatbox-tabs').css({display: "block"});
            $('.single-tab-content').each(function(){
                $(this).addClass("tab-pane fade");
            });

            $('.setScreen').css({
                paddingBottom: '0px'
            });

            $('.list').css({
                maxHeight: (windowHeight - serachHeight - 240) + 'px',
                paddingBottom : '20px'
            });
            $('.single-tab-content').css({
                height: (windowHeight - 140) + 'px',
                maxHeight: (windowHeight - 140) + 'px',
                paddingBottom: '0px'
            });

            $('.chat').css({
                height: (windowHeight - 140) + 'px',
            });

            $('.chat-history').css({
                height: ($('.chat').height() - $('.chat-header').outerHeight() - $('.chat-message').outerHeight()) + 'px'
            });

            $('#people-list').removeClass("collapse");

            $('#people-list').css({paddingTop: 0});

            $(document).on("click", function(e){

                if($(e.target).is("#people-list") || $(e.target).is("#search") || $(e.target).is("#listbox") || $(e.target).is("#list")){
                    $('#people-list').addClass("activePeople");
                }else if($(e.target).is("#online-btn")){
                    $('#people-list').toggleClass("activePeople");
                }else{
                    $('#people-list').removeClass("activePeople");
                }
            });

            $('.hide-people').on("click",function(){
                $('#people-list').removeClass("activePeople");
            });

        }else{
            $('.online-btn').css({display: 'none'});
            $('.hide-people').css({display: 'none'});
            $('.chatbox-tabs').css({display: "none"});
            $('.single-tab-content').each(function(){
                $(this).removeClass("tab-pane fade");
            });

            $('.single-tab-content').css({
                height: '100%',
                maxHeight: (windowHeight - 80) + 'px',
            });

            $('.chat').css({
                height: (windowHeight - 100) + 'px',
            });

            $('.chat-history').css({
                height: ($('.chat').height() - $('.chat-header').outerHeight() - $('.chat-message').outerHeight()) + 'px'
            });

            // Code for right side
            $('.rightside').css({
                height: (windowHeight - 80) + 'px',
            });

            var rightsideItems = $('.modules > div');

            var len = 0;

            rightsideItems.each(function(){
                $(this).find("div").css({height: 'auto'});
                len = len + 1;
            });

            var rightsideItemHeight = ((windowHeight - 100)/len);

            //var rightsideHeight = $('.diary').height();

            rightsideItems.each(function(){

                var rightsideHeight = (rightsideItemHeight - 5);
                $(this).css({
                    height: '100%',
                    maxHeight: rightsideHeight,
                    'overflow-y': 'scroll',
                    'background-color': '#F2F5F8',
                    'margin-left': '15px',
                    'margin-bottom': '10px',
                    'border-radius': '5px'
                });

                //$('.diary').css({height: rightsideHeight});
            });
        }
    });

}(jQuery));
