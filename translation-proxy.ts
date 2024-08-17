/**
 * Creates a translator object that allows for dynamic translation of keys.
 *
 * @param {Object} translations - An object containing key-value pairs of translations.
 * @returns {Proxy} A proxy object that allows for dynamic translation of keys.
 */
class Translator {
    constructor(private translations: { [key: string]: string }) {
        return new Proxy(this, {
            /**
             * Returns the translation for a given key.
             *
             * @param {Object} target - The target object.
             * @param {string} prop - The key to translate.
             * @returns {string} The translated value or a fallback message if not found.
             */
            get(target: Translator, prop: string): string {
                return target.translations[prop] || `Translation not found for key: ${prop}`;
            }
        });
    }
}

// Usage example:
/**
 * Usage example: translating HTML elements with data-translate attribute.
 *
 * @example
 * const translations = new Translator({
 *   hello: 'Привіт',
 *   goodbye: 'До побачення'
 *   // other translations...
 * });
 *
 * document.querySelectorAll('[data-translate]').forEach((element: HTMLElement) => {
 *   const key: string = element.dataset.translate;
 *   element.innerHTML = translations[key];
 * });
 */