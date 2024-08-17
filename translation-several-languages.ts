/**
 * Translator class
 */
class Translator {
    /**
     * Constructor
     *
     * @param {string} language - The language to translate to (default: 'en')
     * @param {Translations} translations - An object containing translations for each language
     */
    constructor(private language: string, private translations: Translations) {
        this.language = language || 'en';
        this.translations = translations || {};
    }

    /**
     * Set the language to translate to
     *
     * @param {string} language - The new language to translate to
     * @example translator.setLanguage('fr');
     */
    setLanguage(language: string): void {
        this.language = language;
    }

    /**
     * Translate all elements with a `data-translate` attribute
     *
     * @example translator.translate();
     */
    translate(): void {
        document.querySelectorAll('[data-translate]').forEach((element: HTMLElement) => {
            const key: string = element.dataset.translate;
            const translation: string | undefined = this.translations[this.language]?.[key];

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key} in language: ${this.language}`);
            }
        });
    }
}

/**
 * Translations interface
 */
interface Translations {
    [language: string]: {
        [key: string]: string;
    };
}

// Usage example:
const translations: Translations = {
    en: {
        hello: 'Hello',
        goodbye: 'Goodbye'
    },
    uk: {
        hello: 'Привіт',
        goodbye: 'До побачення'
    }
    // other languages...
};

const translator: Translator = new Translator('uk', translations);
translator.translate();

// To change the language:
translator.setLanguage('en');
translator.translate();