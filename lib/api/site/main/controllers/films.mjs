import chista from '../../chista.mjs';

import MainFilmsCreate from '../../../../use-cases/main/films/Create.mjs';
import MainFilmsShow from '../../../../use-cases/main/films/Show.mjs';
import MainFilmsUpdate from '../../../../use-cases/main/films/Update.mjs';
import MainFilmsDelete from '../../../../use-cases/main/films/Delete.mjs';
import MainFilmsList from '../../../../use-cases/main/films/List.mjs';

export default {
    create : chista.makeUseCaseRunner(MainFilmsCreate, req => req.body),
    show   : chista.makeUseCaseRunner(MainFilmsShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(MainFilmsUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(MainFilmsDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(MainFilmsList, req => ({ ...req.query, ...req.params }))
};
