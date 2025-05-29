const getAllUsers = () => {
  return [
    {
      id: 1,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      nickname: 'janes',
      emoji: '👩‍💻',
      perWeekHours: 6,
      hoursConsumed: 20,
    },
    {
      id: 2,
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      role: 'user',
      nickname: 'alicej',
      emoji: '👩‍💼',
      perWeekHours: 30,
      hoursConsumed: 15,
    },
    {
      id: 3,
      firstname: 'Bob',
      lastname: 'Brown',
      email: 'bob.brown@example.com',
      role: 'user',
      nickname: 'bobb',
      emoji: '👨‍💼',
      perWeekHours: 40,
      hoursConsumed: 25,
    },
    {
      id: 4,
      firstname: 'Charlie',
      lastname: 'Davis',
      email: 'charlie.davis@example.com',
      role: 'user',
      nickname: 'charlied',
      emoji: '👨‍🔧',
      perWeekHours: 25,
      hoursConsumed: 10,
    },
    {
      id: 5,
      firstname: 'David',
      lastname: 'Wilson',
      email: 'david.wilson@example.com',
      role: 'admin',
      nickname: 'davidw',
      emoji: '👨‍🏫',
      perWeekHours: 20,
      hoursConsumed: 5,
    },
    {
      id: 6,
      firstname: 'Eve',
      lastname: 'Miller',
      email: 'eve.miller@example.com',
      role: 'user',
      nickname: 'evem',
      emoji: '👩‍🔬',
      perWeekHours: 30,
      hoursConsumed: 18,
    },
    {
      id: 7,
      firstname: 'Frank',
      lastname: 'Moore',
      email: 'frank.moore@example.com',
      role: 'user',
      nickname: 'frankm',
      emoji: '👨‍🎨',
      perWeekHours: 35,
      hoursConsumed: 22,
    },
    {
      id: 8,
      firstname: 'Grace',
      lastname: 'Taylor',
      email: 'grace.taylor@example.com',
      role: 'user',
      nickname: 'gracet',
      emoji: '👩‍🎤',
      perWeekHours: 40,
      hoursConsumed: 30,
    },
    {
      id: 9,
      firstname: 'Hank',
      lastname: 'Anderson',
      email: 'hank.anderson@example.com',
      role: 'user',
      nickname: 'hanka',
      emoji: '👨‍🚀',
      perWeekHours: 25,
      hoursConsumed: 12,
    },
    {
      id: 10,
      firstname: 'Ivy',
      lastname: 'Thomas',
      email: 'ivy.thomas@example.com',
      role: 'user',
      nickname: 'ivyt',
      emoji: '👩‍🚀',
      perWeekHours: 20,
      hoursConsumed: 8,
    },
  ];
};

const usePlatformData = () => {
  return {
    maxPlatformDailyHours: 14,
    maxPlatformWeeklyHours: 80,
    maxUserWeeklyHours: 3,
  };
};

const getUser = (id) => {
  if (!id) {
    return null;
  }

  const users = getAllUsers();
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }
  return user;
};

export { getUser, getAllUsers, usePlatformData };
