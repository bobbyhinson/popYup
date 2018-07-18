/*
 popYup.js

 Created by Bobby Hinson (github.com/bobbyhinson)

 Distributed under the GNU General Public License, version 3 (GPL-3.0).

 */

$(document).ready(function () {
    var settings = $.extend({}, $.base, $.popYupOptions);
    var shift = '0';
    if (settings.fromTop == 50) {
        var shift = '-50%'
    }
    ;
    $('head').append('<style>#pyLoader{text-align:center;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);margin:0 auto;}.popYup{position:fixed;top:' + settings.fromTop + '%;left:50%;transform:translate(-50%,' + shift + ');-webkit-transform: translate(-50%,' + shift + ');margin:0 auto;z-index:10001;background:' + settings.bgColor + ';border:solid 1px ' + settings.borderColor + ';max-width:' + settings.fixedW + ';}' + '.pyContent{overflow-y:auto;max-height:' + settings.maxH + ';padding:20px;margin-bottom:1px;}' + '#pyOverlay{height:100%;width:100%;position:fixed;background:' + settings.overlayColor + ';top:0;left:0;z-index:10000;opacity: ' + settings.overlayAlpha + ';}' + '.popYup-close.x-out{background:' + settings.xBG + ';position:absolute;cursor:pointer;text-align:center;z-index:10002;border:solid 1px ' + settings.xColor + ';border-radius:3px;height:15px;text-transform:uppercase;color:' + settings.xColor + ';width:15px;right:' + settings.xShift + ';top:' + settings.xShift + ';}' + '.lock{overflow:hidden;}' + '#pyIframe .pyContent,#pyImage .pyContent{max-width:95vw;;padding:0;height:100%;overflow:hidden;margin:0 auto;}' + '#pyIframe iframe{width:100%;height:100%;margin:0;padding:0;clear:both;}' + '#pyImage{background:none;border:none;max-width:95vw;max-height:95vh;height:auto;width:auto;text-align:center;}' + '#pyImage .pyContent{max-height:100%;height:auto;width:auto;display:inline;}' + '#pyImage .pyContent img{border:solid 1px ' + settings.borderColor + ';width:auto;height:auto;max-width:95vw;max-height:90vh;display:block;margin:0 auto;}' + '@media only screen and (max-width:' + settings.breakpoint + '),screen and (max-height:' + settings.breakpoint + '){' + '.popYup,#pyImage{top:0;left:0;transform:none;-webkit-transform:none;height:100% !important;max-width:100% !important;width:100% !important;}' + '.pyContent{max-height:95vh;}' + '#pyIframe .pyContent{height:100%;max-height:100%;max-width:100% !important;}' + '.popYup-close.x-out{right:5px;top:5px;}' + '#pyImage .pyContent img{max-width:100vw;max-height:100vh;}' + '}</style>');
    // if ( $('.popYup-open').attr('rel') == 'iframe' || $('.popYup-open').attr('rel') == 'ajax' || $('.popYup-open').attr('rel') == 'image' || $('.popYup-open').attr('rel') == 'inline' ){
    $('body').append('<div pY="yes" class="popYup"><div class="pyContent"></div></div>');
    //};
    $('.popYup').each(function () {
        $(this).hide();
        $(this).wrapInner('<div class="pyContent"></div>');
        if (settings.showX == true) {
            $(this).prepend('<div class="popYup-close x-out">' + settings.xText + '</div>');
        }
        ;
    });
    $('.popYup-open').click(function () {
        $('div[pY]').css({'width': 'auto', 'height': 'auto'});
        var pySrc = $(this).attr('href');
        if ($(this).attr('rel') == 'iframe') {
            $('div[pY]').attr('id', 'pyIframe');
            $('#pyIframe').css({'width': settings.fixedW, 'height': settings.iframeH});
            $('#pyIframe .pyContent').first().append('<iframe src=" ' + pySrc + ' "></iframe>');
            $('#pyIframe .pyContent > iframe').first().load(function () {
                $('#pyIframe').show();
                killLoader();
            });

            if($('.pyContent > .pyContent').length > 0){
                $('.pyContent > .pyContent').remove();
            }
            if($('#pyIframe iframe').length > 0){
                $('#pyIframe iframe').not(':first').remove();
                setTimeout(function () {
                    $('#pyIframe iframe').attr('src', pySrc);
                }, 500);
            }


        } else if ($(this).attr('rel') == 'ajax') {
            $('div[pY]').attr('id', 'pyAjax');
            popYupAjax();
        } else if ($(this).attr('rel') == 'image') {
            $('div[pY]').attr('id', 'pyImage');
            $('#pyImage .pyContent').first().html('<img src="' + pySrc + '" />');
            $('#pyImage .pyContent img').first().load(function () {
                $('#pyImage').show();
                killLoader();
            });
            $('#pyImage .pyContent img').change(function () {
                imgW = this.width;
                $('#pyImage').css({'width': imgW, 'height': auto});
            });
        } else if ($(this).attr('rel') == 'inline') {
            var inlineSrc = $(this).attr('content');
            $('div[pY]').attr('id', 'pyInline');
            $('#pyInline .pyContent').first().html(inlineSrc);
            $('#pyInline').first().show(function () {
                killLoader();
            });
        } else if ($(this).attr('rel') == 'local') {
            $(pySrc).show(function () {
                killLoader();
            });
        };
        $('body').addClass('lock');
        if ($('#pyOverlay').length === 0) {
            $('body').append('<div id="pyOverlay"><div id="pyLoader">' + settings.loader + '</div></div>');
        }
        $('html, body').css({'overflow': 'hidden'});
        return false;
    });
    $(document).on('click', '.popYup-close', function () {
        closePY();
        return false;
    });
    if (settings.overlayClose == true) {
        $(document).on('click', '#pyOverlay', function () {
            closePY();
        });
    }
    ;
});

function killLoader() {
    $('#pyLoader').remove()
};

function closePY() {
    $('.popYup').hide();
    $('body').removeClass('lock');
    $('#pyOverlay').remove();
    $('div[pY]').removeAttr('id');
    $('div[pY] .pyContent').empty();
    $('html, body').css({'overflow': 'initial'});
};
$.base = {
    loader: 'LOADING...',
    breakpoint: '480px',
    showX: true,
    xText: 'x',
    xBG: '#ccc',
    xColor: '#fff',
    xShift: '-10px',
    borderColor: '#ccc',
    bgColor: '#fff',
    fromTop: 50,
    fixedW: '600px',
    maxH: '75vh',
    iframeH: '400px',
    overlayClose: false,
    overlayColor: '#fff',
    overlayAlpha: 0.9
};
$.popYupOptions = {};

function popYupAjax() {
}
