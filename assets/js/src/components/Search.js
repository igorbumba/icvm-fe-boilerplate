class Search {
    /**
     *
     * @param props
     */
    constructor(props) {
        const defaults = {
            open: '.js-open-search',
            close: '.js-close-search',
            toggle: '.js-toggle-search',
            formID: 'searchform',
            inputID: 'searchkey',
            json: '/typeahead.json',
            activeClass: 'is-active',
        };

        this.options = { ...defaults, ...props };

        this.isActive = false;

        this.data = [];

        if (this.form.length > 0) this.init();
    }

    // region Getters

    /**
     *
     * @returns {[]|*|jQuery|HTMLElement}
     */
    get form() {
        return $(`#${this.options.formID}`);
    }

    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */
    get input() {
        return $(`#${this.options.inputID}`);
    }

    /**
     *
     * @returns {*}
     */
    get autosuggestElement() {
        return this.form.find('#as_searchkey');
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

        $(this.options.toggle).on('click', ev => {
            ev.preventDefault();
            this.toggleSearch(ev);
        });

        if (this.form.length > 0 && this.options.inputID && this.options.json) {
            const dataJSONattr = this.form.data('json');
            $.ajax({
                dataType: 'json',
                url: dataJSONattr || this.options.json,
                success: results => {
                    this.data = [...results];
                    new bsn.AutoSuggest(this.options.inputID, {
                        script: (keyword, itemType) =>
                            this.search(keyword, itemType),
                        varname: 'input',
                        maxresults: 10,
                        timeout: 600000,
                        json: true,
                        formID: this.options.formID || '',
                    });
                },
            });
        }
    }

    /**
     *
     */
    toggleSearch(ev) {
        if (this.form.length > 0) {
            const formId = ev.currentTarget.dataset.target;
            this.isActive ? this.close(ev, formId) : this.open(ev, formId);
        }
    }

    /**
     *
     */
    open(ev, formId) {
        const trigger = $(ev.currentTarget);
        const searchForm = $(`#${formId}`);

        if (searchForm.length > 0) {
            // open search
            searchForm.addClass(this.options.activeClass);

            // add active class to the toggle elements
            trigger.addClass(this.options.activeClass);

            // set active state
            this.isActive = true;
        }
    }

    /**
     *
     */
    close(ev, formId) {
        const trigger = $(ev.currentTarget);
        const searchForm = $(`#${formId}`);

        if (searchForm.length > 0) {
            // reset search
            this.resetSearch(formId);

            // hide top bar
            searchForm.removeClass(this.options.activeClass);

            // add active class to the toggle elements
            trigger.removeClass(this.options.activeClass);

            // remove active state
            this.isActive = false;
        }
    }

    /**
     *
     * @param keyword
     * @param itemType
     */
    search(keyword, itemType = 0) {
        const outputdata = [];
        keyword = decodeURIComponent(keyword).toLowerCase();
        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            if (
                (itemType === 0 || item.itemType === itemType) &&
                (item.title.toLowerCase().indexOf(keyword) !== -1 ||
                    item.extraFields.toLowerCase().indexOf(keyword) !== -1 ||
                    this.normalizeNFD(item.title.toLowerCase()).indexOf(
                        keyword
                    ) !== -1)
            ) {
                outputdata.push({ id: item.pageUrl, value: item.title });
            }
        }
        return outputdata;
    }

    /**
     *
     * @param input {string}
     */
    normalizeNFD(input) {
        return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     *
     */
    resetSearch(formId) {
        const searchForm = $(`#${formId}`);
        const searchInput = searchForm.find('input');

        if (searchInput.length > 0) searchInput.val('');
        if (this.autosuggestElement.length > 0)
            this.autosuggestElement.remove();
    }

    // endregion
}
