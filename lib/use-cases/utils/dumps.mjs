import { generateImagesURL } from './imagesURLGeneration.mjs';

export function dumpUser(user) {
    const dump = {
        id         : user.id,
        email      : user.email,
        firstName  : user.firstName,
        secondName : user.secondName,
        avatarUrl  : user.avatar ? generateImagesURL(user.avatar) : '',
        lang       : user.lang,
        createdAt  : user.createdAt.toISOString(),
        updatedAt  : user.updatedAt.toISOString()
    };

    return dump;
}

export function dumpAdmin(admin) {
    const dump = {
        id        : admin.id,
        email     : admin.email,
        createdAt : admin.createdAt.toISOString(),
        updatedAt : admin.updatedAt.toISOString()
    };

    return dump;
}

export function dumpFilm(film) {
    const dump = {
        id        : film.id,
        title     : film.title,
        year      : film.year,
        type      : film.type,
        stars     : film.stars,
        createdAt : film.createdAt.toISOString(),
        updatedAt : film.updatedAt.toISOString()
    };

    return dump;
}
