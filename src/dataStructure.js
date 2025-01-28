export const initialData = {
    Legion: {
      Characters: []
    }
  }
  
  export const emptyCharacter = {
    Name: "CharacterName",
    Class: "Class",
    Level: "Level",
    Progression: {
      ArcaneRiver: {
        isActive: false,
        Region: [
          { RegionName: 'Vanishing Journey', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false },
          { RegionName: 'Chu Chu Island', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false },
          { RegionName: 'Lachelein', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false },
          { RegionName: 'Arcana', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false },
          { RegionName: 'Morass', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false },
          { RegionName: 'Esfera', RegionDailyCompletion: false, RegionWeeklyCompletion: false, isActive: false }
        ]
      },
      Grandis: {
        isActive: false,
        Region: [
          { RegionName: 'Cernium', RegionDailyCompletion: false, isActive: false },
          { RegionName: 'Burning Cernium', RegionDailyCompletion: false, isActive: false },
          { RegionName: 'Hotel Arcs', RegionDailyCompletion: false, isActive: false },
          { RegionName: 'Odium', RegionDailyCompletion: false, isActive: false },
          { RegionName: 'Shangri-La', RegionDailyCompletion: false, isActive: false },
          { RegionName: 'Arteria', RegionDailyCompletion: false, isActive: false }
        ]
      },
      Dailies: {
        isActive: false,
        DailyActivity: [
          { Name: 'Daily Quest 1', CompletionStatus: false, isActive: false },
          { Name: 'Daily Quest 2', CompletionStatus: false, isActive: false }
        ]
      },
      Weeklies: {
        isActive: false,
        WeeklyActivity: [
          { Name: 'Weekly Quest 1', CompletionStatus: false, isActive: false },
          { Name: 'Weekly Quest 2', CompletionStatus: false, isActive: false }
        ]
      }
    },
    Bosses: {
      BossList: [
        {
          Name: 'Boss 1',
          Difficulty: [
            { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
            { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
          ],
          CompletionStatus: false,
          CompletionDate: ''
        },
        {
          Name: 'Boss 2',
          Difficulty: [
            { DifficultyName: 'Normal', DifficultyReset: 'Daily', CompletionStatus: false, CompletionDate: '', isActive: false },
            { DifficultyName: 'Hard', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false  },
            { DifficultyName: 'Chaos', DifficultyReset: 'Weekly', CompletionStatus: false, CompletionDate: '', isActive: false }
          ],
          
          
        }
      ]
    }
  }