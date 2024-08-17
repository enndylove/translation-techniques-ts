# Advanced Typescript Translation Techniques <img src="https://img.shields.io/static/v1?label=🔥 Typescript&message=Translation 🧠&color=ffffff" />
##### In this post, we dive into advanced Typescript techniques to create more flexible and scalable translation systems. Whether you're dealing with single-language support, multi-language localization, or dynamic content updates, these strategies—including data- attributes, multi-language handling, Intl integration, and Proxy usage—will help you elevate your code to a senior developer level. Discover how to write cleaner, more maintainable, and future-proof translation logic that can easily adapt to the evolving needs of your projects.

![](https://i.ibb.co/WyBPTqz/300x300-logo.png)

## Usage

### A method to apply translation to the DOM in [file](https://github.com/enndylove/translation-techniques-ts/blob/main/translation-to-the-DOM.ts)
To use the `Translate` class, follow these steps:

1. Import your translations from a JSON file.
2. Initialize a `Translate` instance with the class name of the HTML element(s) to be translated, the original text to be translated, and the translated text.
3. Call the `translate()` method to perform the translation.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div class="menu-item">Pork Ribs</div>
    
    <!--  Text-content  -->
    <div class="menu-item">Steak</div>

    <!--  Connecting the script  -->
    <script src="path/to/translation-to-the-DOM.ts"></script>
</body>
```

#### Example `your_file.json` file:
```json
[
    { 
      "translateItem": "menu-item",
      "translateFor": "Pork Ribs",
      "translateTo": "Свинині ребра"
    },
  
    { 
      "translateItem": "menu-item",
      "translateFor": "Steak",
      "translateTo": "Стейк"
    }
]
```

###### translation-to-the-DOM.ts file:
```typescript
// Import the translations from a JSON file
import translateList from 'path/to/your_file.json';

// Define a Translation class that handles the translation process
class Translate {
    /**
     * Constructor to initialize the Translation class.
     * @param {string} translateItem - The class name of the HTML element(s) to be translated.
     * @param {string} translateFor - The text to be translated from.
     * @param {string} translateTo - The text to translate to.
     */
    constructor(private translateItem: string, private translateFor: string, private translateTo: string) {}

    /**
     * Method to perform the translation.
     * It searches for all elements with the specified class name and replaces
     * the inner text if it matches the `translateFor` value.
     */
    translate(): void {
        if (this.translateItem) {
            // Select all elements with the specified class name
            const translateItems: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this.translateItem}`);
            if (translateItems) {
                // Iterate over each element and check if the text matches

                for (const translateItem of translateItems) {
                    if (translateItem.innerText.toLowerCase() === this.translateFor.toLowerCase()) {
                        // Replace the inner text with the translation
                        translateItem.innerHTML = this.translateTo;
                    }
                }
            }
        }
    }
}

// Example Usage:

// Suppose we have some HTML like this:
// <div class="menu-item">Pork Ribs</div>
// <div class="menu-item">Steak</div>

// Let's assume `translateList` contains an array of translations like this:
// [
//     { "translateItem": "menu-item", "translateFor": "Pork Ribs", "translateTo": "Свинині ребра" },
//     { "translateItem": "menu-item", "translateFor": "Steak", "translateTo": "Стейк" }
// ]

// Iterate over the translation list and apply translations
translateList.forEach((item: { translateItem: string; translateFor: string; translateTo: string }) => {
    const translator: Translate = new Translate(item.translateItem, item.translateFor, item.translateTo);
    translator.translate(); // This will replace "Pork Ribs" with "Свинині ребра" and "Steak" with "Стейк"
});

// Resulting HTML after translation:
// <div class="menu-item">Свинині ребра</div>
// <div class="menu-item">Стейк</div>
```

### Use of data-attributes and template strings in [file](https://github.com/enndylove/translation-techniques-ts/blob/main/translation-data-attributes.ts)
To use the `Translator` class, follow these steps:

1. Define a map of translation keys and their corresponding translated values.
2. Initialize an instance of the `Translator` class, passing in the translation map.
3. Call the `translate()` method to apply the translations to all elements with a data-translate attribute.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <p data-translate="hello">Hello</p>

    <!--  Text-content  -->
    <p data-translate="goodbye">Goodbye</p>

    <!--  Connecting the script  -->
    <script src="path/to/translation-data-attributes.ts"></script>
</body>
```
###### translation-data-attributes.ts file:
```typescript
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
```

### Localization with support for several languages in [file](https://github.com/enndylove/translation-techniques-ts/blob/main/translation-several-languages.ts)
To use the `Translator` class, follow these steps:

1. Define an object containing translations for each language.
2. Initialize an instance of the `Translator` class, specifying the initial language and the translations object.
3. Use the `translate()` method to apply translations to all elements with a `data-translate` attribute.
4. If needed, change the language using the `setLanguage()` method and reapply the translations.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <p data-translate="hello">Hello</p>
    <!--  Text-content  -->
    <p data-translate="goodbye">Goodbye</p>

    <!--  Connecting the script  -->
    <script src="path/to/translation-several-languages.ts"></script>
</body>
```

###### translation-several-languages.ts file:
```typescript
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
```

### Contextual localization using Intl in [file](https://github.com/enndylove/translation-techniques-ts/blob/main/translation-intl.ts)
To use the `Translator` class, follow these steps:

1. Define an object containing translations for each locale.
2. Initialize an instance of the `Translator` class, specifying the initial locale and the translations object.
3. Use the `translate()` method to apply translations to all elements with a `data-translate` attribute.
4. Optionally, change the locale using the `setLocale()` method and reapply the translations.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div data-translate="hello">Hello</div>

    <!--  Text-content  -->
    <div data-translate="goodbye">Goodbye</div>

    <!--  Connecting the script  -->
    <script src="path/to/translator.ts"></script>
</body>
```
###### translation-intl.ts file:
```typescript
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
```

### Using Proxy for dynamic localization in [file](https://github.com/enndylove/translation-techniques-ts/blob/main/translation-proxy.ts)
The Translator class allows you to create a proxy object that dynamically returns translations based on the keys you provide.
#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div data-translate="hello">Hello</div>
    
    <!--  Text-content  -->
    <div data-translate="goodbye">Goodbye</div>

    <!--  Connecting the script  -->
    <script src="path/to/translation-proxy.ts"></script>
</body>
```

###### translation-proxy.ts file:
```typescript
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
```


## License
#### This project is licensed under the [MIT License](https://github.com/enndylove/translation-techniques-ts/blob/main/LICENSE).

### Delicious coffee to you friends ☕
