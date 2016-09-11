export default {

  id        : 'coffee-bot-basics',
  name      : 'Coffee Basics',
  author    : 'Anton Outkine',
  scenario  : {
    id      : 'coffee-bot-basics',
    source  : 'local',
  },

  cards: [
    {
      id      : '2e668303-d559-4d5d-bed0-96093f2a41be',
      content : `
        Buy whole beans only. Ground coffee quickly loses its flavour and aroma because of volatiles that make a great cup of coffee. Grind coffee only before making a cup.
      `,
      tags    : ['buying']
    },
    {
      id      : '539f3d10-7f97-43ad-9c5d-3d0fc589adee',
      content : `
        Buy fresh beans. One or two week old coffee is okay. Try to keep that under a month. No “roasted on“ date on packaging — don’t buy it.
      `,
      tags    : ['buying']
    },
    {
      id      : '4ffb3461-cd3b-488f-b3f6-0476789a19a4',
      content : `
        Look for beans sealed in an airtight bag. If not, transfer coffee to an airtight bag or container immediately upon opening.
      `,
      tags    : ['buying']
    },
    {
      id      : 'a93ad23a-b803-4225-80c2-1bb459788935',
      content : `
        Know where your coffee comes from. There’s usually a country of origin marked on the bag, but that’s not enough — ideally, you should find a region and the name of the producer as well.
      `,
      tags    : ['buying']
    },
    {
      id      : '8be3268b-bd6a-4779-892d-bd722c842400',
      content : `
        Treat coffee like wine — “Made in EU” is not good enough, because a bottle from Alsace would be very different from a bottle from Bordeaux. Avoid coffee blends if you don’t know the roaster, go for single-origin coffee.
      `,
      tags    : ['buying']
    },
    {
      id      : 'beb5d13d-3ecd-4806-9ac0-137e443d20d8',
      content : `
        Dark roasts are a good way to mask coffee that is not very good or fresh. Avoid oily beans — a giveaway of over-roasting. Consider trying medium or even light roasts that accentuate the flavour of coffee in a balanced way.
      `,
      tags    : ['buying']
    },
    {
      id      : '04820013-198a-42ef-acd3-907b8915c986',
      content : `
        Great fresh coffee that was carefully sourced and roasted is usually called “specialty coffee” or “third wave coffee”. Find a local specialty coffee roaster or a cafe that brews specialty coffee, and you’ll be all set.
      `,
      tags    : ['buying']
    },
    {
      id      : '2f48f652-c1ca-403d-9014-e0788da68df5',
      content : `
        For more info on specialty coffee and list of roasters and cafes, try the Third Wave Wichteln Facebook group.
      `,
      tags    : ['buying'],
      origin  : {
        title : `Third Wave Wichteln Facebook Group`,
        url   : 'https://www.facebook.com/groups/thirdwavewichteln'
      }
    },

    {
      id      :'8bf6d535-eec5-4a03-8f02-e47e51a0768b',
      content : `
        Avoid cheap blade grinders that break up coffee into uneven bits of various sizes — that significantly affects the taste. Buy a burr grinder — a device with a system of ceramic or metal rings that produces a uniform grind of noticeably better quality.
      `,
      tags    :  ['grinder']
    },

    {
      id      : 'c7e41c67-0ade-460d-b937-518c71fb139a',
      content : `
        Porlex Mini (around $50) — an upgrade on Harios, it’s portable and convenient.
      `,
      tags    : ['grinder']
    },

    {
      id      : '236a9e72-9703-4ffe-a825-1ccbb155676c',
      content : `
        Baratza Encore (around $130) — manually grinding your morning cup of coffee might be not very convenient, so here’s a good entry-level electric burr coffee grinder. Not great for espresso grinds, very good for everything else. Be sure to learn how to clean it properly so it won’t break on you — cleaning is easy, you just have to do it.
      `,
      tags    : ['grinder']
    },

    {
      id      : 'a4777dbd-adde-4c59-94d8-a908946e2e81',
      content : `
        Hario MSS-1B or Hario Skerton — a good entry-level manual grinder that won’t break the bank and will replace your old trusty blade grinder that continually spoils your grounds. Both models are usually in the $30…$40 price range.
      `,
      tags    : ['grinder']
    },

    {
      content : `
        Keep brewing and making grind adjustments — go from coarse to fine. Note the taste — if your brew gets off-balance and bitter, that means overextraction. Go back a step and note the setting — that’s your ideal grind size for this particular method of coffee.
      `,
      id      : "a0667c67-01ad-402c-bb81-9d757aeb3fad",
      tags    : ["brewing"]
    },

    {
      "content":"Brew the coffee according to your brew method, taste the cup, note the taste.",
      "id":"4ff71292-3d98-47ae-b937-64c83b58a261",
      "tags":["brewing"]
    },

    {
      "content":"Play with other parameters: Always start with the grind, then experiment with other parameters. #1 mistake is to add more coffee when the taste is bland or off in hopes that it will get better. It won’t. Start with the grind, get it right.",
      "id":"a521f090-0e0f-410e-8ebd-7be8f0b21448",
      "tags":["brewing"]
    },

    {
      "content":"The idea is to extract all the flavour and taste from ground beans into water, but not too much. If your coffee is powerfully bitter, that means that you’re extracting too much — that is called overextracton.",
      "id":"945d53bc-ada4-4bfe-b430-b87dc823f450",
      "tags":["brewing"]
    },

    {
      "content":"Use a medium grind — the coffee should feel like fine salt mixed with bits of ground pepper. Note the grind setting.",
      "id":"da5807bb-765f-4791-83c3-a3e19efc90e6",
      "tags":["brewing"]
    },

    {
      "content":"Rule of thumb: sourness = underextraction (decrease grind size, increase temperature and/or brew time etc.), bitterness = overextraction (increase grind, decrease temperature etc.)",
      "id":"42d09192-26b4-48f2-99ee-80a3bb85d151",
      "tags":["brewing"]
    },

    {
      "content":"Taste, adjust your grind size: Now grind your beans a bit finer and make another cup. Is the taste (sourness / sweetness / bitterness) more balanced and even? The aftertaste longer and nicer? Good, you’re increasing extraction (finer grind = more flavour and taste extracted from coffee) and it gets better.",
      "id":"f1644a95-e13c-43be-8903-70c0cf3d5d03",
      "tags":["brewing"]
    },

    {
      "content":"The brew method, the coffee itself, even room conditions (temperature and humidity) will play their part on the final taste of cup — and tastes differ. ",
      "id":"9771ef4f-b5ad-4f0c-b9e8-0266b637d1bf",
      "tags":["brewing"]
    },

    {
      "content":"There are several keys to a perfect cup of coffee: coffee to water ratio, grind size, temperature, and extraction time. ",
      "id":"d2d27baf-b43e-4f95-a7dc-2fc331417f35",
      "tags":["brewing"]
    },

    {
      "content":"Brew your first cup of coffee: Pick a brewing method — whichever you’re more familiar with. Weight your coffee and water, use the starting ratio of 7.5% of coffee to water — i.e. 15 g of coffee for 200 ml of water, a typical Aeropress ratio. You can adjust that later.",
      "id":"9ed16a59-b2c0-48d1-96fd-5b419e029458",
      "tags":["brewing"]
    },

    {
      "content":"If you underextract your coffee, the resulting taste is weak and usually on the sour size — that means that not all the flavour and taste was extracted into water and some was left in your ground coffee.",
      "id":"853002e7-731c-41e1-abc1-4a9406a4aa78",
      "tags":["brewing"]
    },

    {
      "content":"Experiment with the temperature if you use a filtration system. Try slightly increasing your coffee to water ratio — 8% coffee to 100% water, maybe a tad more. Then try the reverse. Change your brew time. Look for different recipes for your particular brewing method.",
      "id":"c3c9f19b-01c8-452f-96c5-32f71901ef4c",
      "tags":["brewing"]
    }
  ]

}
