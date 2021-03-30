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
                // eslint-disable-next-line more/no-then
                this.createFilm().then(response => {
                    if (response.status === 1) {
                        $('#films-modal').modal('hide');
                    } else {
                        $('#films-modal').modal('hide');
                        $('#error-modal').modal('show');
                    }
                });
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
                }
            ],
            ajax : {
                url : 'films'
            },
            columns : [
                { data: 'id', name: 'id', searchable: false, orderable: true },
                { data: 'title', name: 'title', searchable: true, orderable: true },
                { data: 'year', name: 'year', searchable: false, orderable: true },
                { data: 'type', name: 'type', searchable: false, orderable: true },
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
            headers : {
                'Content-Type' : data.type ? data.type : 'application/json'
            },
            body : data.type ? data : JSON.stringify(data)
        });

        const result = await response;

        if (result.ok) {
            table.ajax.reload();

            return result.json();
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

    createFilm() {
        const data = {
            title : $('#films-input-title').val(),
            year  : $('#films-input-year').val(),
            type  : $('#films-select-format option:selected').val(),
            stars : $('#films-input-stars').val()
        };

        try {
            return this.fetcher('films', 'POST', { data });
        } catch (e) {
            console.log(e);
        }
    }

    deleteFilm(id) {
        const data = { id };

        try {
            return this.fetcher(`films/${id}`, 'DELETE', data);
        } catch (e) {
            console.log(e);
        }
    }

    importFilms(file) {
        try {
            return this.fetcher('import', 'POST', file);
        } catch (e) {
            console.log(e);
        }
    }

    eventBinder() {
        $(document).on('hidden.bs.modal', '#films-modal', (e) => {
            e.preventDefault();
            $(e.target).find('form').trigger('reset');
        });

        $(document).on('click', 'button.btn-delete', (e) => {
            e.preventDefault();

            $('#confirmation-modal').modal('show');
            $('#deleteFilm').attr('data-id', e.target.id);
        });

        $('#deleteFilm').on('click', (e) => {
            e.preventDefault();
            const id = e.target.dataset.id;

            this.deleteFilm(id);
            $('#confirmation-modal').modal('hide');
        });

        $('.btn-upload').on('click', (e) => {
            e.preventDefault();
            $('#uploadDocument').trigger('click');
        });

        $('.btn-add').on('click', (e) => {
            e.preventDefault();
            $('#films-modal').modal('show');
        });

        $('#uploadDocument').on('change', e => {
            e.preventDefault();
            const file = document.getElementById('uploadDocument').files[0];

            console.log(file);
            this.importFilms(file);
        });
    }
}
