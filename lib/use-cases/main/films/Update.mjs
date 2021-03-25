import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpFilm } from '../../utils/dumps.mjs';
import Film from '../../../domain-model/Film.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainFilmsUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            title : [ 'string', { 'max_length': 255 } ],
            year  : [ 'integer' ],
            type  : [ 'string', { 'max_length': 255 } ],
            stars : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const film = await Film.findById(id);

            const result = await film.update(data);

            return { data: dumpFilm(result) };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

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
