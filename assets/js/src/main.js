$(document).ready(function() {
    new Search();

    new Tabs();

    new ShareModal();

    $('.js-select-dropdown').each(function(index, element) {
        jcf.replace($(element), 'Select', {
            wrapNative: false,
            wrapNativeOnMobile: false,
        });
    });

    $('.js-print').on('click', function(ev) {
        ev.preventDefault();
        window.print();
    });

    $('.js-show-next').on('click', ev => {
        ev.preventDefault();
        const $element = $(ev.currentTarget);
        const $next = $element.next();
        if ($next.length > 0) {
            $element.css({ display: 'none' });
            $next.css({ display: 'block' });
        }
    });

    if ('ontouchstart' in document.documentElement) {
        (function(l) {
            var i,
                s = {
                    touchend: function() {},
                };
            for (i in s) l.addEventListener(i, s);
        })(document);
    }
});
