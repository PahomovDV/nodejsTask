import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpFilm } from '../../utils/dumps.mjs';
import Film from '../../../domain-model/Film.mjs';

export default class MainFilmsList extends Base {
    static validationRules = {
        draw    : [ 'positive_integer' ],
        columns : [ 'not_empty_list' ],
        order   : [ 'not_empty_list' ],
        start   : [ 'integer' ],
        length  : [ 'integer' ],
        search  : [ { 'nested_object' : {
            value : [ 'string' ],
            regex : [ 'string' ]
        } } ]
    };

    async execute({ draw, columns, order, start, length, search }) {
        const searchFields = [ 'title', 'type', 'stars', 'year' ];
        const findQuery = search.value
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search.value }%` } })) }
            : {};

        const columnsList = columns.map((columnObj) => {
            return [ columnObj.name ];
        });

        const orderObj = order[0];
        const sortedBy = columnsList[orderObj.column].join('');
        const orderBy = orderObj.dir;

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, orderBy ] ],
            length,
            start
        };

        const [ films, recordsFiltered, recordsTotal ] = await Promise.all([
            Film.findAll(dbRequest),
            Film.count({ where: findQuery }),
            Film.count()
        ]);

        const data = films.map(dumpFilm);

        return {
            data,
            recordsFiltered,
            recordsTotal,
            draw
        };
    }
}
