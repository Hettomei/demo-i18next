const i18next = require('i18next');
let i = 0;
const lng = 'dev';

console.log('--------DEBUG---------');
i18next.init({
    lng,
    debug: true,
    resources: {
        en: {
            translation: {
                "hello": "hello world"
            }
        },
        fr: {
            translation: {
                "hello": "hello world",
            }
        },
        dev: {
            translation: {
                "hello": "hello world",
                "error": {
                    "unspecific": "Something went wrong.",
                    "404": "The page was not found."
                },
                "helloName": "Hello Mr {{name}}",
                "helloContext": "Hello -- {{name}}",
                "helloContext_male": "Hello Mr {{name}}",
                "helloContext_female": "Hello Mrs {{name}}",
                "helloContext_vulcain": "Hello master {{name}}",
            }
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


function slide(...str) {
    i++
    console.log(`
######### SLIDE ${i} ############

${str.join('\n')}

######### /SLIDE ${i} ###########




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

slide(`
 notre code :

 if (program.seriesName && seasonNumber && episodeNumber) {
     alias = 'DIC_GENERIC_EPISODE_FULL';
 } else if (seasonNumber && episodeNumber) {
     alias = 'DIC_GENERIC_EPISODE_FULL_WITHOUT_EP_TITLE';
 } else if (episodeName && seasonNumber) {
     alias = 'DIC_GENERIC_EPISODE_FULL_WITHOUT_EP_NR';
 } else if (program.eventTitle && episodeName && episodeNumber) {
     alias = 'DIC_GENERIC_EPISODE_FULL_WITHOUT_SEASON';
 } else if (episodeNumber) {
     alias = 'DIC_GENERIC_EPISODE_FULL_WITHOUT_SEASON_AND_EP_TITLE';
 } else {
     alias = 'DIC_GENERIC_EPISODE_FULL_WITHOUT_SEASON_AND_EP_NR';
 }

 return Locale.getFormattedString({
    alias,
    subs: [
        { key: 'seriesName', value: program.eventTitle },
        { key: 'seasonNumber', value: seasonNumber },
        { key: 'episode_number', value: episodeNumber },
        { key: 'episodeName', value: episodeName }
    ]
});
`)
