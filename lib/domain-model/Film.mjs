import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class Film extends Base {
    static schema = {
        id    : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        title : { type: DT.STRING, allowNull: false, unique: true },
        year  : { type: DT.INTEGER, allowNull: false },
        type  : { type: DT.STRING, allowNull: false },
        stars : { type: DT.STRING, allowNull: false }
    };
}

export default Film;
