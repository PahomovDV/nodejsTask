import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpFilm } from '../../utils/dumps.mjs';
import Film from '../../../domain-model/Film.mjs';

const DEFAULT_LIMIT  = 20;
const DEFAULT_OFFSET = 0;

export default class MainFilmsList extends Base {
    static validationRules = {
        search   : [ { 'min_length': 2 } ],
        limit    : [ 'positive_integer' ],
        offset   : [ 'integer', { 'min_number': 0 } ],
        sortedBy : [ { 'one_of': [ 'id', 'createdAt', 'updatedAt' ] } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    async execute({
        limit    = DEFAULT_LIMIT,
        offset   = DEFAULT_OFFSET,
        search   = '',
        sortedBy = 'createdAt',
        order    = 'DESC'
    }) {
        const searchFields = [ 'title', 'type', 'stars' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ films, filteredCount, totalCount ] = await Promise.all([
            Film.findAll(dbRequest),
            Film.count({ where: findQuery }),
            Film.count()
        ]);

        const data = films.map(dumpFilm);

        return {
            data,
            meta : {
                totalCount,
                filteredCount,
                limit,
                offset
            }
        };
    }
}
