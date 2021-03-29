import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import Film from '../../../domain-model/Film.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainFilmsDelete extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        console.log(id);
        try {
            const film = await Film.findById(id);

            await film.destroy();

            return { };
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
