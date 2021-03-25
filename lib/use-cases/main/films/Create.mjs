import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpFilm } from '../../utils/dumps.mjs';
import Film from '../../../domain-model/Film.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainFilmsCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            title : [ 'string', { 'max_length': 255 } ],
            year  : [ 'integer' ],
            type  : [ 'string', { 'max_length': 255 } ],
            stars : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ data }) {
        try {
            const film = await Film.create(data);

            return { data: dumpFilm(film) };
        } catch (x) {
            if (x instanceof DMX.NotUnique) {
                throw new X({
                    code   : 'NOT_UNIQUE',
                    fields : { [x.field]: 'NOT_UNIQUE' }
                });
            }

            throw x;
        }
    }
}
