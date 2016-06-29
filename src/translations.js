import { includes, keys } from './helpers';

const translations = {
    nl: {
        add: 'Voeg een bijlage toe (max. :size\Mb)',
        error: 'Er is iets misgegaan',
    },
    fr: {
        add: 'Ajouter une pièce jointe (max. :size\Mo)',
        error: 'Quelque chose a mal tourné',
    },
    en: {
        add: 'Add an attachment (max. :size\Mb)',
        error: 'Something went wrong',
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
