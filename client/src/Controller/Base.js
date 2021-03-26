export default class Base {
    errors;

    apiCallUrl;

    formId;

    errorId = '#error';

    alertId = '#alert';

    constructor() {
        this.init();
        this.eventBinder();
    }

    init() {

    }

    initForm(beforeRequest, onSuccess, onError, formType = 'default') {
        $(document).off('submit').on('submit', this.formId, async (e) => {
            e.preventDefault();
            const data = this.getData();
            const beforeRequestResult = beforeRequest(data);

            let response = {};

            if (
                $.isPlainObject(beforeRequestResult) &&
                beforeRequestResult.hasOwnProperty('Status') &&
                beforeRequestResult.Status === 0
            ) {
                $(this.errorId).text(this.errors[beforeRequestResult.Type]);
            } else {
                // eslint-disable-next-line default-case
                switch (formType) {
                    case 'default':
                        // eslint-disable-next-line more/no-window
                        response = await window.api.post(this.apiCallUrl, data);
                        break;
                    case 'multipart':
                        // eslint-disable-next-line more/no-window
                        response = await window.api.postMultipart(this.apiCallUrl, data);
                        break;
                }
            }

            if ($.isPlainObject(response) && response.hasOwnProperty('Status') && response.Status === 1) {
                onSuccess(response);
            } else if (response.Error && response.Error.Type) {
                onError(response);
            }
        });
    }

    /** Get form data by Id attribute
     *
     * @returns {Object}
     */
    getData() {
        const fields = Array.from($(`form${this.formId}`).find('input:enabled, select:enabled, textarea:enabled'));

        const objectData = fields.reduce((obj, field) => {
            const objVal = obj;
            const fieldElement = $(field);
            const key = fieldElement.attr('id') || fieldElement.attr('data-field-name');
            const type = fieldElement.attr('type');

            if (key) {
                if (type === 'file') {
                    objVal[key] = fieldElement.get(0).files[0] ? fieldElement.get(0).files[0] : '';
                } else {
                    objVal[key] = fieldElement.val();
                }
            }

            return objVal;
        }, {});

        return objectData;
    }

    delete() {
        // eslint-disable-next-line more/no-window
        return window.api.delete(this.apiCallUrl);
    }

    convertParams(params) {
        const urlParams = [];

        $.each(params, (name, value) => {
            urlParams.push(`${name}=${value}`);
        });

        return urlParams.join(';');
    }

    showAlert(text) {
        $(`${this.alertId} .text`).text(text);
        $(this.alertId).show();
    }

    eventBinder() {
        $(`${this.alertId} button.close`).off('click').on('click', () => {
            $(this.alertId).hide();
        });

        $(document).off('change').on('change', 'input[type="checkbox"]', (e) => {
            $(e.target).val($(e.target).is(':checked') ? 1 : 0);
        });

        $(document).on('focus', '.error-field', (e) => {
            e.preventDefault();
            $(e.target).removeClass('error-field');
        });
    }
}
