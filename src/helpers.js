export const keys = object => {

    const keys = [];

    for (let key in object) {
        keys.push(key);
    }

    return keys;
};

export const includes = (array, value) => array.indexOf(value) !== -1;

export const extension = filename => filename.split('.').pop().toLowerCase();

export const getIconForFile = filename => {
    switch (extension(filename)) {
        case 'pdf':
            return 'file-pdf';
        case 'doc':
        case 'docx':
            return 'file-word';
        case 'xls':
        case 'xlsx':
            return 'file-excel';
        default:
            return 'doc';
    }
};
