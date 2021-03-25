import MainFilmsCreate from '../../../../../../lib/use-cases/main/films/Create.mjs';

export default {
    useCaseClass : MainFilmsCreate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const films = await factory.setupFilms();

        const userId = users[0].id;
        const filmId = films[0].id;

        return { userId, filmId };
    }
};
