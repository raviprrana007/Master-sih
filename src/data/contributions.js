function seededRandom(seed) {
  let x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function generateContributions(userId = 'student-1') {
  const seed = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const weeks = 52;
  const days = 7;
  const data = [];

  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      const rand = seededRandom(seed + w * 7 + d);
      let count = 0;
      if (rand > 0.45) {
        count = Math.floor(seededRandom(seed + w * 7 + d + 100) * 9);
      }
      const date = new Date();
      date.setDate(date.getDate() - ((weeks - 1 - w) * 7 + (6 - d)));
      week.push({ date: date.toISOString().split('T')[0], count });
    }
    data.push(week);
  }
  return data;
}

export function getTotalContributions(userId) {
  const data = generateContributions(userId);
  return data.flat().reduce((sum, d) => sum + d.count, 0);
}
