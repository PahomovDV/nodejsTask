import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpFilm } from '../../utils/dumps.mjs';
import Film from '../../../domain-model/Film.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainFilmsShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const film = await Film.findById(id);

            return { data: dumpFilm(film) };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

            throw x;
        }
    }
}
