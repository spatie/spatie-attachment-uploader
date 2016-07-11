import { getIconForExtension } from 'font-awesome-filetypes';

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
    return getIconForExtension(extension(filename));
};
