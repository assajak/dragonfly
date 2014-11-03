$(document).ready(function () {

    var scrollPosition = 0;
    var scrollSpeed = 15;
    var pullUpSpeed = 13;
    var startEventTime;
    var startEventYCoordinate;
    var refreshFlag;
    $('#wrapper')
        .on('movestart', function (e) {
            startEventYCoordinate = e.distY;
            startEventTime = new Date().getTime();
        })
        .on('move', function (e) {

            if (scrollPosition === 0) {
                scrollPosition = e.distY;
            } else {
                if (scrollPosition < e.distY) {
                    $('#wrapper').scrollTop($('#wrapper').scrollTop() - scrollSpeed);

                    if ($('#wrapper').scrollTop() === 0) {
                        $('#scroller').css('top', parseInt($('#scroller').css('top'), 10) + pullUpSpeed);

                        if (parseInt($('#scroller').css('top'), 10) > 0){
                            refreshFlag = true;
                        }
                    }

                } else {
                    $('#wrapper').scrollTop($('#wrapper').scrollTop() + scrollSpeed)
                }

                scrollPosition = e.distY;
            }
        })
        .on('moveend', function (e) {
            var road = startEventYCoordinate - e.distY;
            var time = new Date().getTime() - startEventTime;

            if (road !== 0 && Math.abs(road) > 50 && time < 200){

                if (road > 0){
                    $('#wrapper').scrollTop($('#wrapper').scrollTop() + 300);
                }else{
                    $('#wrapper').scrollTop($('#wrapper').scrollTop() - 300);
                }
            }

//                    $('#scroller').animate({css:'top = -51px;'});
            if (!refreshFlag){
                $('#scroller').css('top', '-51px');
            }else{
                $('#scroller').css('top', '-0px');

                setTimeout(function(){

                    for (var i =0; i < 3; i++){
                        var li = $('#thelist > li :first').clone();
                        $('#thelist').prepend(li.html('1111'))

                    }
                    $('#scroller').css('top', '-51px');
                }, 1500)
            }
        })
        .on('swipeup', function () {
//                    console.log('swipe');
//                    $('#wrapper').scrollTop($('#wrapper').scrollTop() + 500)
        }
    );

})