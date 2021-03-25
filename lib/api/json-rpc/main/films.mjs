import chista from '../chista.mjs';

import MainFilmsCreate from '../../../use-cases/main/films/Create.mjs';
import MainFilmsShow from '../../../use-cases/main/films/Show.mjs';
import MainFilmsUpdate from '../../../use-cases/main/films/Update.mjs';
import MainFilmsDelete from '../../../use-cases/main/films/Delete.mjs';
import MainFilmsList from '../../../use-cases/main/films/List.mjs';

export default {
    MainFilmsCreate : chista.makeUseCaseRunner(MainFilmsCreate),
    MainFilmsShow   : chista.makeUseCaseRunner(MainFilmsShow),
    MainFilmsUpdate : chista.makeUseCaseRunner(MainFilmsUpdate),
    MainFilmsDelete : chista.makeUseCaseRunner(MainFilmsDelete),
    MainFilmsList   : chista.makeUseCaseRunner(MainFilmsList)
};
