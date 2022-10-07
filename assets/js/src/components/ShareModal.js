class ShareModal {
    /**
     *
     * @param props
     */
    constructor(props) {
        const defaults = {
            element: '#sharemodal',
            open: '.js-open-sharemodal',
            close: '.js-close-sharemodal',
            email: '.js-share-email',
            linkedin: '.js-share-linkedin',
            facebook: '.js-share-facebook',
            twitter: '.js-share-twitter',
        };

        this.options = { ...defaults, ...props };

        if (this.element.length > 0) this.init();
    }

    // region Getters

    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */
    get element() {
        return $(this.options.element);
    }

    /**
     *
     * @returns {*}
     */
    get focusableFirst() {
        return $(this.options.element).find('.js-focus-sharemodal');
    }

    // endregion

    // region Init

    /**
     *
     */
    init() {
        $(this.options.open).on('click', ev => {
            ev.preventDefault();
            this.open();
        });

        $(this.options.close).on('click', ev => {
            ev.preventDefault();
            this.close();
        });

        $(this.options.email).on('click', ev => {
            ev.preventDefault();
            const title = ev.currentTarget.getAttribute('data-subject');
            this.shareEmail(title, location.href);
        });

        $(this.options.linkedin).on('click', ev => {
            ev.preventDefault();
            this.shareLinkedIn(location.href);
        });

        $(this.options.facebook).on('click', ev => {
            ev.preventDefault();
            this.shareFacebook(location.href);
        });

        $(this.options.twitter).on('click', ev => {
            ev.preventDefault();
            this.shareTwitter(location.href);
        });
    }

    /**
     *
     */
    open() {
        if (this.element.length > 0) {
            gsap.to(this.element, {
                duration: 0.2,
                autoAlpha: 1,
                onComplete: () => {
                    this.element.attr('aria-hidden', 'false');
                    if (this.focusableFirst.length > 0) this.focusableFirst.focus();
                },
            });
        }
    }

    /**
     *
     */
    close() {
        if (this.element.length > 0) {
            gsap.to(this.element, {
                duration: 0.2,
                autoAlpha: 0,
                onComplete: () => {
                    this.element.attr('aria-hidden', 'true');
                },
            });
        }
    }

    /**
     *
     * @param title {string}
     * @param url {string}
     */
    shareEmail(title, url) {
        location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
            url
        )}`;
    }

    /**
     *
     * @param url {string}
     */
    shareLinkedIn(url) {
        window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    }

    /**
     *
     * @param url {string}
     */
    shareFacebook(url) {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank'
        );
    }

    /**
     *
     * @param url {string}
     */
    shareTwitter(url) {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    }

    // endregion
}
