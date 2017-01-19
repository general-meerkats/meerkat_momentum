$(document).ready(function () {
    
    var img_array = ['static_background.jpg'];
    var index = 0;

    function fadeToNext() {
        index = (index + 1) % img_array.length;
        $(document.body).css({
            'background-image': 'url(assets/' + img_array[index] + ')'
        });
        waitNext();
    }

    function waitNext() {
        setTimeout(function () {
            fadeToNext();
        }, 2000);
    }
    waitNext();
    
});