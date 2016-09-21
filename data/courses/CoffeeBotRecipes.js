export default {

  id        : 'coffee-bot-recipes',
  name      : 'Coffee Recipes',
  author    : 'Coffee Bot',

  scenario  : {
    id      : 'coffee-bot-recipes',
    source  : 'local',
  },

  cards: [

    {
      content : `
        1. Grind coffee
        Start with a medium-size grind and experiment.
      `,
      id      : "7a6593fa-dea8-4836-b870-7461ad2d036c",
      tags    : ["moka"]
    },

    {
      content : `
        2. Add coffee to basket
        Unscrew the pot, get the top part off, get the filter off. Mind the gasket.
        Fill the basket evenly, don’t tamp. Replace the filter and the gasket on top. Set aside.
      `,
      id      : "25b7ae13-a9ae-479a-b02e-0c3bbd732f89",
      tags    : ["moka"]
    },

    {
      content : `3. Boil water`,
      id      : "77475fd6-eb58-42c6-847c-f3b6d24c9b0d",
      tags    : ["moka"]
    },

    {
      content : `
        4. Add water to the base
        Pre-heat the base of the pot with boiling water, discard the water after a few seconds.
        Pour boiling water again, stop when you almost reach the safety valve on the side.
        Now the base is very hot, use a towel to handle it from now on.
      `,
      id      : "b5622d6b-ea36-4d69-9b25-1bb08564674e",
      tags    : ["moka"]
    },

    {
      content : `
        5. Put the basket in place, screw the top part in
        Use a towel to hold the base.
      `,
      id      : "4a7f81c9-e449-4042-a761-f2676b8bfb39",
      tags    : ["moka"]
    },

    {
      content : `
        6. Heat pot
        Place your pot on a stove over medium heat. Keep the lid upright.
      `,
      id      : "96287b3e-1a80-4164-a515-05a552fffb97",
      tags    : ["moka"]
    },

    {
      content : `
        7. Brew coffee. Pour heated water evenly over the bloomed coffee. When you reach the mark (or the top, allow for 2–3 mm), stir again.
      `,
      id      : "7678a768-c74c-4917-9a20-4b60ddef7cd0",
      tags    : ["moka"]
    },

    {
      content : `
        8. Clean your pot
        Moka pots are gentle devices that get dirty fast. That dirt is maddeningly hard to get off unless you do it right after your pot cools off. Do that, keep your pot in good condition.
        When it will start to lose pressure at a later time, just replace the rubber gasket with a new one.
      `,
      id      : "966712e0-5a22-4885-9453-aa51a33375cb",
      tags    : ["moka"]
    },

    {
      content : `
        1. Heat water
        Let it sit for about a minute, so the temperature would fall to about 96°C.
        Experiment with time (or temperature if you have a thermometer).
        With Aeropress, you can go as low as 72…76°C.
      `,
      id      : "bc36dcf8-c9b5-49cb-9be0-7ce75df83292",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'image',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/grind.jpg',
        }
      ],
      content : `
        2. Grind coffee
        Grind 15 to 17 grams of coffee. Start with a medium grind and 16 g.
      `,
      id      : "0f7085d4-6f0a-4687-89b1-eca0ec30b913",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/inserting.mov',
        }
      ],
      content : `
        3. Prepare brewer
        Insert the plunger inside the main section about 5 mm deep and put it on the plunger.
      `,
      id      : "9f5c2194-5c75-4240-804f-e7cd6be9cb99",
      tags    : ["aeropress"]
    },
    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/rinse.mov',
        }
      ],
      content : `
        4.Put a paper filter into the filter holder, rinse it with water. Set aside.
      `,
      id      : "fac16429-94be-4292-af0f-28f81ff4497e",
      tags    : ["aeropress"]
    },
    {
      content : `5.Place your Aeropress on the scale.`,
      id      : "aceab6f0-ac59-43d3-9e44-7c9d4e4a550b",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/stir.mov',
        }
      ],
      content : `
        6. Put your ground coffee inside the Aeropress.
        Bloom it with 30 to 50 g of water. Some grounds don’t require blooming; most do, otherwise you risk spilling blooming coffee over the top. Wait 10…15 seconds. Gently stir coffee with the provided plastic spoon at least three times.
      `,
      id      : "fc1e3e8d-158e-4eb5-bbd5-2fdac4be3183",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/pouring.mov',
        }
      ],
      content : `
        7. Brew coffee.
        Pour heated water evenly over the bloomed coffee. Weigh if you must. When you reach the mark (or the top, allow for 2–3 mm), stir again.
      `,
      id      : "80144323-584b-440f-945b-02e704f27182",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/lid.mov',
        }
      ],
      content : `
        8. If you use a paper filter, just put the filter lid on, screw it in.
        If you use a metal filter, carefully put it on top. Screw the lid in.
        Let it sit for up to a minute.
      `,
      id      : "a45a12ce-9591-449e-8007-02ae864649da",
      tags    : ["aeropress"]
    },

    {
      content : `
        9. Prepare your cup or mug. If it’s a small cup, use the provided plastic extender part so you won’t break the cup or spill the coffee. Put the extender on top of the Aeropress.
      `,
      id      : "c420feed-6d61-4b27-9776-d3dd7cd8b9bb",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/invert.mov',
        }
      ],
      content : `
        10. Invert your brewer. Take the main section in one hand, holding the extender with your index finger, and support the plunger with your other hand so it won’t fall out. Now carefully turn it upside down in its correct working position and place it inside your mug.
      `,
      id      : "d3dfe3e6-ef92-47fb-9415-b1dae13d00ff",
      tags    : ["aeropress"]
    },

    {
      blocks  : [
        {
          type  : 'video',
          url   : 'http://getmentorbot.com/mentorbot/admin/images/pushing.mov',
        }
      ],
      content   : `
        11. Press
        Now slowly push the plunger, aiming at a 20 second push.
        If you want a cleaner-tasting coffee, stop at mark 1 and push the rest of the brew into your sink. If you want a stronger cup, push it all the way down.
      `,
      id        : "af1faef5-f7c1-4d3e-acd5-b0a2496155ed",
      tags      : ["aeropress"]
    },

    {
       content  : `
        12. Clean your Aeropress. Remove the cap. If you use a metal filter, get it out and rinse it.
        Now take your Aeropress to your waste basked and with one strong fast push discard the grounds. Rinse the top of the plunger.
      `,
      id        : "5912fcef-4aaf-4a9d-8212-ba9b022deacc",
      tags      : ["aeropress"]
    },

  ]

}
