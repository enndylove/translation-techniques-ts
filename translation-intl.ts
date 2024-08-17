class Translator {
    /**
     * Creates a new Translator instance.
     *
     * @param {string} locale - The locale to use for translations (e.g. 'en-US', 'uk-UA', etc.). Defaults to 'en-US'.
     * @param {Translations} translations - An object containing translations for each locale.
     */
    constructor(private locale: string, private translations: Translations) {
        this.locale = locale || 'en-US';
        this.translations = translations || {};

        this.formatter = new Intl.MessageFormat(this.translations[this.locale] || {}, this.locale);
    }

    /**
     * Translates all elements with a `data-translate` attribute.
     */
    translate(): void {
        document.querySelectorAll('[data-translate]').forEach((element: HTMLElement) => {
            const key: string = element.dataset.translate;

            const translation: string | undefined = this.formatter.format({ id: key });

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key} in locale: ${this.locale}`);
            }
        });
    }

    /**
     * Sets a new locale for the translator.
     *
     * @param {string} locale - The new locale to use for translations.
     */
    setLocale(locale: string): void {
        this.locale = locale;
        this.formatter = new Intl.MessageFormat(this.translations[this.locale] || {}, this.locale);
    }
}

/**
 * Translations interface
 */
interface Translations {
    [locale: string]: {
        [key: string]: string;
    };
}

// Usage example:
const translations: Translations = {
    'en-US': {
        hello: 'Hello',
        goodbye: 'Goodbye'
    },
    'uk-UA': {
        hello: 'Привіт',
        goodbye: 'До побачення'
    }
    // other locales...
};

const translator: Translator = new Translator('uk-UA', translations);
translator.translate();

// To change the locale:
translator.setLocale('en-US');
translator.translate();