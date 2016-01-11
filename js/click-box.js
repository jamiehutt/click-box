$(document).ready(function() {
    $('article').fadeIn();
    $('#next').on('click', getNext);
    $('#prev').on('click', getPrev);
    showVars();
    buttonSetup();
});
var maxHeight;
if (maxHeight) {
    $('main,article,.clickbox li').css('height', maxHeight + 'px');
}

if (!nextText) {
    var nextText = "Next";
}
if (!prevText) {
    var prevText = "Previous";
}
if (!beginText) {
    var beginText = "Begin";
}
if (!againText) {
    var againText = "Start again";
}
var counter = 1;
var paneCount = $(".clickbox li").length;
$(".clickbox li").each(function(index) {
    $(this).addClass("item" + index);
});
$('.controls').css('z-index', paneCount + 1);
var restart = false;
hasBegun = false;

function showVars() {
    $('.numItems').text(paneCount);
    $('.whichItem').text(counter);
}

function buttonSetup() {
    $('#prev').text(prevText);
    if (counter > 1 && counter < paneCount) {
        $('#next').text(nextText);
        $('#prev').fadeIn();
    } else if (counter == paneCount) {
        $('#next').text(againText);
        restart = true;
    } else if (restart || hasBegun) {
        $('#next').text(nextText);
        $('#prev').fadeOut();
    } else {
        $('#next').text(beginText);
        $('#prev').fadeOut();
    }
}
function getNext() {
    var $curr = $('.clickbox li:visible'),
        $next = ($curr.next().length) ? $curr.next() : $('.clickbox li').first();
    transition($curr, $next);
    if (counter < paneCount) {
        counter = counter + 1;
    } else {
        counter = 1;
    }
    hasBegun = true;
    showVars();
    buttonSetup();
}
function getPrev() {
    var $curr = $('.clickbox li:visible'),
        $next = ($curr.prev().length) ? $curr.prev() : $('.clickbox li').last();
    transition($curr, $next);
    counter = counter - 1;
    showVars();
    buttonSetup();
}
function transition($curr, $next) {
    $next.css('z-index', 2).fadeIn('slow', function() {
        $curr.hide().css('z-index', 0);
        $next.css('z-index', 1);
    });
}
var pymChild = new pym.Child();