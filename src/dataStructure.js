export const initialData = {
  Legion: {
    Characters: []
  }
}

export const emptyCharacter = {
  Name: "CharacterName",
  Class: "Class",
  Level: "Level",
  Image: "",

  Progression: {
    lastDailyReset: '',
    lastWeeklyReset: '',
    ArcaneRiver: {
      isActive: false,
      Region: [
        { RegionName: 'Vanishing Journey', key: 'oblivion', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
        { RegionName: 'Chu Chu Island', key: 'chuchu', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
        { RegionName: 'Lachelein', key: 'lach', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
        { RegionName: 'Arcana', key: 'arcana', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
        { RegionName: 'Morass', key: 'morass', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
        { RegionName: 'Esfera', key: 'esfera', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday' },
      ]
    },
    Grandis: {
      isActive: false,
      Region: [
        { RegionName: 'Cernium', key: 'cernium', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
        { RegionName: 'Hotel Arcs', key: 'arcus', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
        { RegionName: 'Odium', key: 'odium', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
        { RegionName: 'Shangri-La', key: 'shangrila', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
        { RegionName: 'Arteria', key: 'arteria', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
        { RegionName: 'Carcion', key: 'carcion', RegionDailyCompletion: false, isActive: false, CompletionDate: '' },
      ]
    },
    Dailies: {
      isActive: false,
      DailyActivity: [
        { Name: "Erda's Request", key: "erdarequest", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo", maxPerAccount: 7, energyPerCompletion: 600 },
        {
          Name: "Erda's Request (Energy)", key: "erdarequest_energy", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "multi",    // Can be done by multiple characters
          energyPerCompletion: 600 // Added energy per completion
        },
        { Name: 'Monster Park', key: "mp", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo" },
        { Name: 'Ursus', key: "ursus", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo" },
        { Name: 'Gollux', key: "gollux", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "multi" },
        { Name: 'Maple Tour', key: "mapletour", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo" },
        { Name: 'Commerci', key: "commerci", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "multi" },
        { Name: 'Yu Garden', key: "yugarden", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo" },
        { Name: 'Phantom Forest', key: "phantomforest", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "solo" }
      ]
    },
    Weeklies: {
      isActive: false,
      WeeklyActivity: [
        { Name: 'Monster Park Extreme', key: "mpe", CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday', claimType: "solo", maxPerWeek: 2 },
        { Name: 'Dark World Tree', key: "darkworldtree", CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday', claimType: "multi" },
        { Name: 'Haven', key: "haven", CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday', claimType: "multi" },
        { Name: 'Mu Lung Dojo', key: "mulungdojo", CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Sunday', claimType: "multi" },
        { Name: 'High Mountain', key: 'grandisdungeon', CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Thursday', claimType: 'solo', fragments: 40, erdaSol: 9 },
        { Name: 'Angler Company', key: 'grandisdungeon', CompletionStatus: false, isActive: false, CompletionDate: '', ResetDay: 'Thursday', claimType: 'solo', fragments: 55, erdaSol: 9 },

      ]
    },
    Guild: {
      isActive: false,
      DailyActivity: [
        { Name: 'Culvert', key: "culvert", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "multi" },
        { Name: 'Flag Race', key: "flagrace", CompletionStatus: false, isActive: false, CompletionDate: '', claimType: "multi" }
      ]
    },
  },



  Bosses: {
    BossList: [
      {
        Name: 'Zakum',
        key: 'zakum',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Papulatus',
        key: 'papulatus',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Horntail',
        key: 'horntail',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Hilla',
        key: 'hilla',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Cygnus',
        key: 'cygnus',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Arkarium',
        key: 'arkarium',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Ranmaru',
        key: 'ranmaru',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Magnus',
        key: 'magnus',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Von Leon',
        key: 'vonLeon',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Pierre',
        key: 'pierre',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Queen',
        key: 'queen',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Von Bon',
        key: 'vonBon',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Vellum',
        key: 'vellum',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Omni-CLN',
        key: 'omnicln',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Pink Bean',
        key: 'pinkBean',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Lotus',
        key: 'lotus',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Damien',
        key: 'damien',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Guardian Slime',
        key: 'guardianSlime',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Lucid',
        key: 'lucid',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Will',
        key: 'will',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Gloom',
        key: 'gloom',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Darknell',
        key: 'darknell',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Verus Hilla',
        key: 'verusHilla',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Black Mage',
        key: 'blackMage',
        Difficulty: [
          { DifficultyName: 'Hard', DifficultyReset: 'Monthly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Extreme', DifficultyReset: 'Monthly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Seren',
        key: 'seren',
        Difficulty: [
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Extreme', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Kalos',
        key: 'kalos',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Extreme', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      },
      {
        Name: 'Kaling',
        key: 'kaling',
        Difficulty: [
          { DifficultyName: 'Easy', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Normal', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false },
          { DifficultyName: 'Extreme', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
        ]
      }
    ]
  },

}