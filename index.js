const i18next = require('i18next');
const lng = 'dev';

const maxSlide = 9;

console.log('--------DEBUG---------');
i18next.init({
    lng,
    debug: true,
    fallbackLng: {
        'de-CH': ['fr', 'it'],
        'zh-HANT': ['zh-HANS', 'en'],
        'es': ['fr'],
        'dev': ['fr'],
        'default': ['en']
    },
     interpolation: {
        format: function(value, format, lng) {
            if (format === 'uppercase') return value.toUpperCase();
            if (format === 'capitalize') return value[0].toUpperCase() + value.substring(1);
            return value;
        }
    },
    resources: {
        en: {
            translation: {
                "hello": "hello world",
                "profile": "Profile of {{name, uppercase}} - uppercase",
            }
        },
        fr: {
            translation: {
                "hello": "hello world",
                "aFallback": "Un fallback francais",
                "profile": "Profile de {{name, capitalize}} - premiere lettre",
            }
        },
        dev: {
            translation: {
                "hello": "hello world",
                "helloName": "Hello Mr {{name}}",
                "helloContext": "Hello -- {{name}}",
                "helloContext_male": "Hello Mr {{name}}",
                "helloContext_female": "Hello Mrs {{name}}",
                "helloContext_vulcain": "Hello master {{name}}",
                "error": {
                    "unspecific": "Something went wrong.",
                    "404": "The page was not found."
                },
                "item": "{{count}} item",
                "item_plural": "{{count}} items"
            }
        },
        cs: {
            translation: {
                "item": "{{count}} item",
                "item_plural": "{{count}} items",
                "item_0": "{{count}} items -- 0",
                "item_1": "{{count}} items -- 1",
                "item_2": "{{count}} items -- 2",
                "profile": "Profile of {{name}} - aucune modif",
            },
        },
    }
});
const t = (key, args) => {
    let code = `${JSON.stringify(key)}`
    if (args) {
        code += `, ${JSON.stringify(args)}`
    }

    return `code:
  i18n.t(${code})
translate in '${lng}':
  ${i18next.t(key, args)}`;
}

console.log('--------/DEBUG---------');


let i = 0;

function slide(...str) {
    i++
    console.log(`
######### SLIDE ${i}/${maxSlide} ############

${str.join('\n')}

################################




`);
}

slide(`Vous connaissez ?`)

///////////////////

slide(`
Quels problemes ?

- Les traducteurs traduisent, les dev dev

Pour les devs :
- Key/Value
- Interpolation
- Context (ex: le genre)
- Fallback
- Pluralisation
- Formatting (ex: Mettre en majuscule)


Moins connus

- Nesting -> une clef appel une autre clef
`)

///////////////////

slide(`
        Key/Value

${t('hello')}
`)

///////////////////

slide(`
Interpolation

${t('helloName', { name: 'Timothée' })}

Probleme, 'Mr', besoin du contexte
`)

////////////////

slide(`
        Contexte

${t('helloContext', { name: 'Timothée', context: 'male' })}

${t('helloContext', { name: 'Angie', context: 'female' })}

${t('helloContext', { name: 'Spock', context: 'vulcain' })}

${t('helloContext', { name: 'gvfdfgd', context: 'unknown' })}
${t('helloContext', { context: 'unknown' })}
`)

//////////

const error1 = 404
const error2 = 405
slide(`
Fallback

- Le classique, une trad n'existe pas, je la cherche dans une autre langue
${t(`aFallback`, { lng: 'en' })}

${t(`aFallback`)}

- Forcer un defaut
${t([`error.${error1}`, 'error.unspecific'])}

${t([`error.${error2}`, 'error.unspecific'])}
`)


//////////

slide(`
Pluralisation

CZ a des regles etrange, voir :
https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals

Déjà dans i18next https://github.com/i18next/i18next/blob/master/src/PluralResolver.js

dev :
${t('item', { count: 0 })}
${t('item', { count: 1 })}
${t('item', { count: 2 })}


cs :
${t('item', { count: 0, lng: 'cs' })}
${t('item', { count: 1, lng: 'cs' })}
${t('item', { count: 2, lng: 'cs' })}
${t('item', { count: 3, lng: 'cs' })}
${t('item', { count: 4, lng: 'cs' })}
${t('item', { count: 5, lng: 'cs' })}
${t('item', { count: 6, lng: 'cs' })}
${t('item', { count: 700, lng: 'cs' })}

`)

//////////

const name = 'tim'
slide(`
Formatting

On ne connais pas tous les us et coutumes.
Les traducteurs si.

Exemple, imaginons qu'il soit bien vu de mettre le nom du profile
en uppercase
    exemple de code sans librairie :

    const name = 'tim'
    if (lng === 'cs') {
      return i18n.t('profileUppercase', { name })
      // Or
      // return i18n.t('profile', { name: name.toUpperCase() })
    } else {
      return i18n.t('profile', { name })
    }

Peut etre ramplacer par

      return i18n.t('profile', { name })


Exemple :

${t('profile', { name, lng: 'fr' })}

${t('profile', { name, lng: 'en' })}

${t('profile', { name, lng: 'cs' })}
`);

slide(`
Conclusion

- ne pas reinventer la roue
- chacun son domaine
- On peut combiner contexte, pluralisation, formatting, ajout de plugin
- besoin de former les traducteurs (? une standardisation existe ?)
`);
