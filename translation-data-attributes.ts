/**
 * A class that translates text on a webpage based on a provided translation map.
 */
class Translator {
    /**
     * A private map of translations, where each key is a translation key and each value is the corresponding translation.
     */
    private translateMap: { [key: string]: string };

    /**
     * Creates a new Translator instance with an optional translation map.
     * @param {Object} translateMap - An object with translation keys as properties and their corresponding translations as values.
     * @example
     * const translations = {
     *   hello: 'Привіт',
     *   goodbye: 'До побачення'
     * };
     * const translator = new Translator(translations);
     */
    constructor(translateMap: { [key: string]: string } = {}) {
        this.translateMap = translateMap;
    }

    /**
     * Translates all elements on the webpage that have a `data-translate` attribute.
     * @example
     * <div data-translate="hello"></div>
     * <div data-translate="goodbye"></div>
     * const translator = new Translator(translations);
     * translator.translate();
     */
    translate(): void {
        document.querySelectorAll('[data-translate]').forEach((element: HTMLElement) => {
            const key: string = element.dataset.translate;
            const translation: string | undefined = this.translateMap[key];

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });
    }
}

// Example Usage:
const translations: { [key: string]: string } = {
    hello: 'Привіт',
    goodbye: 'До побачення'
    // other translations...
};

const translator: Translator = new Translator(translations);
translator.translate();