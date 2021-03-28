let table;

export default class App {
    init() {
        $.validator.addMethod('unique', (value) => {
            let array = [];

            array = value.split(',').map(item => {
                return item.toLowerCase().replace(/^[\w]|\s[\w]|[а-яА-ЯЁё\w]|\s[а-яА-ЯЁё\w]/g, letter => {
                    return letter.toUpperCase().trim();
                });
            });

            return new Set(array).size === array.length;
        }, 'Please enter a unique actors');

        $('#films-form').validate({
            rules : {
                title : {
                    required : true
                },
                year : {
                    required : true,
                    min      : 1890,
                    max      : 2021
                },
                stars : {
                    required : true,
                    unique   : true
                },
                format : {
                    required : true
                }
            },
            errorElement  : 'div',
            errorClass    : 'alert alert-danger',
            submitHandler : () => {
                if (findFilm() === 'false') {
                    createFilm();
                    $('#films-modal').modal('hide');
                } else {
                    $('#films-modal').modal('hide');
                    $('#error-modal').modal('show');
                }
            }
        });

        table = $('#films-table').DataTable({
            processing : true,
            serverSide : true,
            ordering   : true,
            searching  : true,
            order      : [ [ 1, 'asc' ] ],
            dom        : 'r<"row mb-3"<"col-md-12 col-lg-6"B>><"row"<"col-md-12 col-lg-6"l><"col-md-12 col-lg-6"f>><"row"<"col-12"t>><"row"<"col-md-12 col-lg-6"i><"col-md-12 col-lg-6"p>>',
            buttons    : [
                {
                    text      : 'Add',
                    className : 'btn btn-primary btn-lg btn-add'
                },
                {
                    text      : 'Upload',
                    className : 'btn btn-primary btn-lg btn-upload'
                },
                {
                    text      : 'Delete All',
                    className : 'btn btn-primary btn-lg btn-delete-all'
                }
            ],
            ajax : {
                url : 'films'
            },
            columns : [
                { data: 'id', name: 'id', searchable: false, orderable: true },
                { data: 'title', name: 'title', searchable: true, orderable: true },
                { data: 'release_year', name: 'release_year', searchable: false, orderable: true },
                { data: 'format', name: 'format', searchable: false, orderable: true },
                { data: 'stars', name: 'stars', searchable: true, orderable: false },
                {
                    name       : 'delete_button',
                    searchable : false,
                    orderable  : false,
                    render     : (data, type, row) => {
                        return `<button class="btn btn-primary btn-delete" id="${  row.id  }">DELETE</button>`;
                    }
                }
            ]
        });

        this.eventBinder();
    }

    async fetcher(url = '', method = 'POST', data = {}) {
        const response = await fetch(url, {
            method,
            mode        : 'cors',
            cache       : 'no-cache',
            credentials : 'same-origin',
            headers     : {
                'Content-Type' : 'application/json'
            },
            redirect       : 'follow',
            referrerPolicy : 'no-referrer',
            body           : JSON.stringify(data)
        });

        const result = await response.json();

        if (result.ok) {
            return result;
        }

        const responseError = {
            type    : 'Error',
            message : result.message || 'Something went wrong',
            data    : result.data || '',
            code    : result.code || ''
        };
    
        let error = new Error();
    
        error = { ...error, ...responseError };
        throw (error);
    }

    findFilm(title) {
        const data = { title };

        try {
            const result = this.fetcher('/api/v1/films/find', 'POST', data);

            table.ajax.reload();

            return result;
        } catch (e) {
            console.log();
        }
    }

    createFilm() {
        const data = {
            title       : $('#films-input-title').val(),
            releaseYear : $('#films-input-year').val(),
            format      : $('#films-select-format option:selected').val(),
            stars       : $('#films-input-stars').val()
        };

        try {
            const result = this.fetcher('/api/v1/films/create', 'POST', data);

            table.ajax.reload();

            return result;
        } catch (e) {
            console.log();
        }
    }

    deleteFilm(id) {
        const data = { id };

        try {
            const result = this.fetcher('/api/v1/films/delete', 'DELETE', data);

            table.ajax.reload();

            return result;
        } catch (e) {
            console.log();
        }
    }

    deleteAllFilms() {
        try {
            const result = this.fetcher('/api/v1/films/deleteAll', 'DELETE');

            table.ajax.reload();

            return result;
        } catch (e) {
            console.log();
        }
    }

    eventBinder() {
        $(document).on('hidden.bs.modal', '#films-modal', () => {
            $(this).find('form').trigger('reset');
        });

        $(document).on('click', '.btn-delete', () => {
            $('#confirmation-modal').modal('show');
            $('#deleteFilm').attr('data-id', this.id);
        });

        $('#deleteFilm').on('click', () => {
            const id = this.dataset.id;

            this.deleteFilm(id);
        });

        $('.btn-upload').on('click', () => {
            $('#uploadDocument').trigger('click');
        });

        $('.btn-delete-all').on('click', () => {
            this.deleteAllFilms();
        });

        $('.btn-add').on('click', () => {
            $('#films-modal').modal('show');
        });
    }
}
