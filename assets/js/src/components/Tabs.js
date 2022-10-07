class Tabs {
    /**
     *
     * @param props
     */
    constructor(props) {
        const defaults = {
            elements: '.js-tab-open',
            tabs: '.js-tab-item',
            activeClass: 'is-active',
            mobile: '.js-tab-mobile',
            hashchange: true,
        };

        this.options = { ...defaults, ...props };

        if (this.elements.length > 0) this.init();
    }

    // region Getters

    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */
    get elements() {
        return $(this.options.elements);
    }

    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */
    get tabs() {
        return $(this.options.tabs);
    }

    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */
    get mobileDropdown() {
        return $(this.options.mobile);
    }

    // endregion

    // region Init

    /**
     *
     */
    init() {
        this.elements.each((index, element) => {
            const $element = $(element);
            const id = $element.attr('href');
            const group = $element.data('group');
            $element.on('click', ev => {
                ev.preventDefault();
                if (id && group && !ev.currentTarget.classList.contains(this.options.activeClass)) {
                    this.open(id, group, ev.currentTarget.innerHTML);
                }
            });
        });

        this.mobileDropdown.on('click', ev => {
            ev.preventDefault();
            ev.currentTarget.classList.toggle(this.options.activeClass);
        });

        // check for existing hash and open tab accordingly
        if (window.location.hash) {
            const $tab = $(window.location.hash);
            if ($tab.length > 0) {
                const group = $tab.data('group');
                if (group) this.open(window.location.hash, group);
            }
        }
    }

    /**
     *
     * @param id
     * @param group
     * @param text
     */
    open(id, group, text = '') {
        // remove active classes from links and tabs group
        this.elements.filter(`[data-group="${group}"]`).removeClass(this.options.activeClass);
        this.tabs
            .filter(`[data-group="${group}"]`)
            .removeClass(this.options.activeClass)
            .attr('aria-expanded', 'false');

        // add active class to the link and group
        const $active = this.elements.filter(`[href="${id}"]`).addClass(this.options.activeClass);
        this.tabs
            .filter(`[id="${id.replace('#', '')}"]`)
            .addClass(this.options.activeClass)
            .attr('aria-expanded', 'true');

        // replace text on the mobile button
        this.mobileDropdown
            .filter(`[data-group="${group}"]`)
            .html(`<span>${text || $active.text()}</span>`)
            .removeClass(this.options.activeClass);

        // change location has
        if (this.options.hashchange) {
            if (window.history.pushState) {
                history.pushState(null, null, id);
            } else {
                window.location.hash = id.replace('#', '');
            }
        }
    }

    // endregion
}
