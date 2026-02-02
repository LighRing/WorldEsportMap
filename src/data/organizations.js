export const organizations = [
  // ===== TIER 1 (Toujours visible) =====
  {
    id: 1,
    name: "T1",
    region: "ASIA",
    tier: 1,
    buildings: [
      {
        id: "t1-hq",
        name: "T1 HQ",
        type: "headquarters",
        address: "Seoul, South Korea",
        coordinates: [126.9780, 37.5665]
      }
    ],
    teams: {
      lol: {
        league: "LCK",
        roster: [
          { name: "Zeus", role: "Top", nationality: "🇰🇷" },
          { name: "Oner", role: "Jungle", nationality: "🇰🇷" },
          { name: "Faker", role: "Mid", nationality: "🇰🇷" },
          { name: "Gumayusi", role: "ADC", nationality: "🇰🇷" },
          { name: "Keria", role: "Support", nationality: "🇰🇷" }
        ],
        trophies: ["Worlds 2023", "LCK Spring 2024", "MSI 2024"]
      }
    }
  },
  {
    id: 2,
    name: "G2 Esports",
    region: "EMEA",
    tier: 1,
    buildings: [
      {
        id: "g2-berlin",
        name: "G2 Berlin HQ",
        type: "headquarters",
        address: "Berlin, Germany",
        coordinates: [13.4050, 52.5200]
      }
    ],
    teams: {
      lol: {
        league: "LEC",
        roster: [
          { name: "BrokenBlade", role: "Top", nationality: "🇩🇪" },
          { name: "Yike", role: "Jungle", nationality: "🇨🇳" },
          { name: "Caps", role: "Mid", nationality: "🇩🇰" },
          { name: "Hans Sama", role: "ADC", nationality: "🇫🇷" },
          { name: "Mikyx", role: "Support", nationality: "🇸🇮" }
        ],
        trophies: ["LEC Winter 2024", "MSI 2019", "Worlds Finalist 2019"]
      }
    }
  },
  {
    id: 3,
    name: "Team Vitality",
    region: "EMEA",
    tier: 1,
    buildings: [
      {
        id: "vit-paris",
        name: "V.Hive Paris",
        type: "headquarters",
        address: "Paris, France",
        coordinates: [2.3522, 48.8566]
      }
    ],
    teams: {
      lol: {
        league: "LEC",
        roster: [
          { name: "Photon", role: "Top", nationality: "🇰🇷" },
          { name: "Daglas", role: "Jungle", nationality: "🇵🇱" },
          { name: "Vetheo", role: "Mid", nationality: "🇫🇷" },
          { name: "Crownie", role: "ADC", nationality: "🇨🇿" },
          { name: "Hylissang", role: "Support", nationality: "🇧🇬" }
        ],
        trophies: ["LFL Spring 2024"]
      }
    }
  },
  {
    id: 4,
    name: "Fnatic",
    region: "EMEA",
    tier: 1,
    buildings: [
      {
        id: "fnc-london",
        name: "Fnatic HQ",
        type: "headquarters",
        address: "London, UK",
        coordinates: [-0.1276, 51.5074]
      }
    ],
    teams: {
      lol: {
        league: "LEC",
        roster: [
          { name: "Oscarinin", role: "Top", nationality: "🇪🇸" },
          { name: "Razork", role: "Jungle", nationality: "🇪🇸" },
          { name: "Humanoid", role: "Mid", nationality: "🇨🇿" },
          { name: "Noah", role: "ADC", nationality: "🇰🇷" },
          { name: "Jun", role: "Support", nationality: "🇰🇷" }
        ],
        trophies: ["Worlds Finalist 2018", "LEC Summer 2023"]
      }
    }
  },

  // ===== TIER 2 (Visible à zoom > 4) =====
  {
    id: 5,
    name: "Karmine Corp",
    region: "EMEA",
    tier: 2,
    buildings: [
      {
        id: "kc-paris",
        name: "KC Gaming House",
        type: "headquarters",
        address: "Paris, France",
        coordinates: [2.3488, 48.8534]
      }
    ],
    teams: {
      lol: {
        league: "LEC",
        roster: [
          { name: "Cabo", role: "Top", nationality: "🇫🇷" },
          { name: "113", role: "Jungle", nationality: "🇫🇷" },
          { name: "Saken", role: "Mid", nationality: "🇫🇷" },
          { name: "Caliste", role: "ADC", nationality: "🇫🇷" },
          { name: "Targamas", role: "Support", nationality: "🇫🇷" }
        ],
        trophies: ["LFL Winter 2023", "EMEA Masters 2023"]
      }
    }
  },
  {
    id: 6,
    name: "Team BDS",
    region: "EMEA",
    tier: 2,
    buildings: [
      {
        id: "bds-swiss",
        name: "BDS Academy",
        type: "headquarters",
        address: "Lausanne, Switzerland",
        coordinates: [6.6323, 46.5197]
      }
    ],
    teams: {
      lol: {
        league: "LEC",
        roster: [
          { name: "Adam", role: "Top", nationality: "🇫🇷" },
          { name: "Sheo", role: "Jungle", nationality: "🇫🇷" },
          { name: "nuc", role: "Mid", nationality: "🇵🇱" },
          { name: "Crownie", role: "ADC", nationality: "🇨🇿" },
          { name: "Labrov", role: "Support", nationality: "🇧🇬" }
        ]
      }
    }
  },
  {
    id: 7,
    name: "Solary",
    region: "EMEA",
    tier: 2,
    buildings: [
      {
        id: "solary-lyon",
        name: "Solary Gaming House",
        type: "training_facility",
        address: "Lyon, France",
        coordinates: [4.8357, 45.7640]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },

  // ===== TIER 3 (Visible à zoom > 7) =====
  {
    id: 8,
    name: "GameWard",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "gw-marseille",
        name: "GameWard Office",
        type: "training_facility",
        address: "Marseille, France",
        coordinates: [5.3698, 43.2965]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 9,
    name: "LDLC OL",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "ldlc-lyon",
        name: "LDLC Campus",
        type: "training_facility",
        address: "Lyon, France",
        coordinates: [4.8320, 45.7578]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 10,
    name: "Gentle Mates",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "gm-nice",
        name: "Gentle Mates HQ",
        type: "headquarters",
        address: "Nice, France",
        coordinates: [7.2619, 43.7102]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 11,
    name: "Mirage Elyandra",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "me-toulouse",
        name: "Mirage Office",
        type: "training_facility",
        address: "Toulouse, France",
        coordinates: [1.4442, 43.6047]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 12,
    name: "IZI Dream",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "izi-bordeaux",
        name: "IZI Gaming House",
        type: "training_facility",
        address: "Bordeaux, France",
        coordinates: [-0.5792, 44.8378]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 13,
    name: "Mkers",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "mk-strasbourg",
        name: "Mkers Office",
        type: "training_facility",
        address: "Strasbourg, France",
        coordinates: [7.7521, 48.5734]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  },
  {
    id: 14,
    name: "Aegis",
    region: "EMEA",
    tier: 3,
    buildings: [
      {
        id: "aegis-nantes",
        name: "Aegis Gaming House",
        type: "training_facility",
        address: "Nantes, France",
        coordinates: [-1.5534, 47.2184]
      }
    ],
    teams: {
      lol: {
        league: "LFL",
        roster: []
      }
    }
  }
];
