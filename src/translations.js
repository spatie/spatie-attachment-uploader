import { includes, keys } from './helpers';

const translations = {
    nl: {
        'add': 'Voeg een bijlage toe (max. :size Mb)',
        'error.generic': 'Er is iets misgegaan',
        'error.tooBig': 'Het bestand is te groot (max. :size Mb)',
    },
    fr: {
        'add': 'Ajouter une pièce jointe (max. :size Mo)',
        'error.generic': 'Quelque chose a mal tourné',
        'error.tooBig': 'Le fichier est trop grand (max. :size Mo)',
    },
    en: {
        'add': 'Add an attachment (max. :size Mb)',
        'error.generic': 'Something went wrong',
        'error.tooBig': 'The file is too large (max. :size Mb)',
    },
};

const language = (() => {
    const language = document.querySelector('html').getAttribute('lang');
    const languages = keys(translations);

    return includes(languages, language) ? language : 'en';
})();

export const translate = (key, parameters = {}) => {

    const translation = translations[language][key];

    if (!translation) {
        return key;
    }

    return translation.replace(/:[a-z_]+/gi, (key => parameters[key.slice(1)] || key));
};

export default translate;
