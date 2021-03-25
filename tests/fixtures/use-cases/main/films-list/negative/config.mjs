import MainFilmsList from '../../../../../../lib/use-cases/main/films/List.mjs';

export default {
    useCaseClass : MainFilmsList,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const films = await factory.setupFilms();

        const userId = users[0].id;
        const filmId = films[0].id;

        return { userId, filmId };
    }
};
