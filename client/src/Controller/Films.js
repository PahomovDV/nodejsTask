import 'datatables.net';
import config from '../../assets/config.json';
import BaseController from './Base.js';


export default class Films extends BaseController {
    errors = {
        FORMAT_ERROR : 'Заполните обязательные поля'
    };

    init() {
        console.log('CONNECTED');
        $('#default-table').dataTable({
            retrieve   : true,
            responsive : true,
            stateSave  : true,
            paging     : true,
            language   : {
                url : config.datatable.language
            }
        });
    }

    eventBinder() {
        super.eventBinder();
    }
}
