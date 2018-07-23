const i18next = require('i18next');
let i = 0;

console.log('--------DEBUG---------');
i18next.init({
    // lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: {
                "hello": "en hello world"
            }
        },
        fr: {
            translation: {
                "hello": "fr hello world",
            }
        },
        dev: {
            translation: {
                "hello": "dev hello world",
                "error": {
                    "unspecific": "Something went wrong.",
                    "404": "The page was not found."
                },
            }
        },
    }
});
console.log('--------/DEBUG---------');


function slide(...str) {
    i++
    console.log(`
######### SLIDE ${i} ############

${str.join('\n')}

######### /SLIDE ${i} ###########




`);
}

slide(`Vous connaissez ?`)
slide(`
Quels problemes ?
- Interpolation
- fallback
-
`)

slide(`
Interpolation
`)

slide(`
Fallback
`)
