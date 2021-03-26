
export default class APIException {
    Type = '';

    Fields = '';

    Message = '';

    constructor(error) {
        this.Type = error.Type || '';
        this.Fields = error.Fields || '';
        this.Message = error.Message || '';
    }

    getType = () => {
        return this.Type;
    };

    getFields = () => {
        return this.Fields;
    };

    getMessage = () => {
        return this.Message;
    };
}
