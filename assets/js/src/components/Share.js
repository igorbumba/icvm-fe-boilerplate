class Share {
    /**
     *
     * @param props
     */
    constructor(props) {
        const defaults = {
            share: ".js-share",
            modal: "#pageshare",
            modalClose: ".js-close-modal",
        };

        this.options = Object.assign({}, defaults, props);

        if (this.share.length > 0) {
            this.init();
        }
    }

    // region Getters

    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */
    get share() {
        return $(this.options.share);
    }

    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */
    get modal() {
        return $(this.options.modal);
    }

    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */
    get modalClose() {
        return $(this.options.modalClose);
    }

    // endregion

    // region Init

    /**
     *
     */
    init() {
        this.share.on("click", (ev) => {
            ev.preventDefault();
            this.open(this.modal, this.modal.find(".c-pageshare__inner"));
        });
        this.modalClose
            .on("click", (ev) => {
                ev.preventDefault();
                this.close(this.modal, this.modal.find(".c-pageshare__inner"));
            })
            .on("keydown", (ev) => {
                if (ev.keyCode === 13) {
                    ev.preventDefault();
                    this.close(this.modal, this.modal.find(".c-pageshare__inner"));
                }
            });
    }

    /**
     *
     * @param modal
     * @param inner
     */
    open(modal, inner) {
        TweenMax.to(modal, 0.3, {
            autoAlpha: 1,
            onComplete: () => {
                setTimeout(() => {
                    modal.find(".js-pageshare-focus").focus();
                }, 100);
            },
        });
        TweenMax.fromTo(
            inner,
            0.3,
            {
                y: -20,
                autoAlpha: 0,
            },
            {
                y: 0,
                autoAlpha: 1,
            },
        );
    }

    /**
     *
     * @param modal
     * @param inner
     */
    close(modal, inner) {
        TweenMax.to(inner, 0.3, {
            y: 20,
            autoAlpha: 0,
        });
        TweenMax.to(modal, 0.3, {
            autoAlpha: 0,
        });
    }

    // endregion
}
