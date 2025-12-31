import {
  cn,
  calculateProgress,
  getScoreColor,
  getProgressColor,
  generateId,
  calculateStreak,
  getWeekDates,
  getMonthDates,
} from '@/lib/utils';

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('should merge Tailwind classes correctly', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});

describe('calculateProgress', () => {
  it('should calculate progress correctly', () => {
    expect(calculateProgress(50, 100)).toBe(50);
    expect(calculateProgress(75, 100)).toBe(75);
    expect(calculateProgress(100, 100)).toBe(100);
  });

  it('should cap progress at 100%', () => {
    expect(calculateProgress(150, 100)).toBe(100);
  });

  it('should return 0 when goal is 0', () => {
    expect(calculateProgress(50, 0)).toBe(0);
  });

  it('should handle decimal values', () => {
    expect(calculateProgress(1, 3)).toBeCloseTo(33.33, 1);
  });
});

describe('getScoreColor', () => {
  it('should return green for high scores (>= 80)', () => {
    expect(getScoreColor(80)).toBe('text-green-600');
    expect(getScoreColor(100)).toBe('text-green-600');
  });

  it('should return yellow for medium scores (60-79)', () => {
    expect(getScoreColor(60)).toBe('text-yellow-600');
    expect(getScoreColor(79)).toBe('text-yellow-600');
  });

  it('should return orange for low-medium scores (40-59)', () => {
    expect(getScoreColor(40)).toBe('text-orange-600');
    expect(getScoreColor(59)).toBe('text-orange-600');
  });

  it('should return red for low scores (< 40)', () => {
    expect(getScoreColor(39)).toBe('text-red-600');
    expect(getScoreColor(0)).toBe('text-red-600');
  });
});

describe('getProgressColor', () => {
  it('should return green for high progress (>= 80)', () => {
    expect(getProgressColor(80)).toBe('bg-green-500');
    expect(getProgressColor(100)).toBe('bg-green-500');
  });

  it('should return yellow for medium progress (60-79)', () => {
    expect(getProgressColor(60)).toBe('bg-yellow-500');
    expect(getProgressColor(79)).toBe('bg-yellow-500');
  });

  it('should return orange for low-medium progress (40-59)', () => {
    expect(getProgressColor(40)).toBe('bg-orange-500');
    expect(getProgressColor(59)).toBe('bg-orange-500');
  });

  it('should return red for low progress (< 40)', () => {
    expect(getProgressColor(39)).toBe('bg-red-500');
    expect(getProgressColor(0)).toBe('bg-red-500');
  });
});

describe('generateId', () => {
  it('should generate a unique ID', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should generate a string ID', () => {
    expect(typeof generateId()).toBe('string');
  });

  it('should generate a non-empty ID', () => {
    expect(generateId().length).toBeGreaterThan(0);
  });
});

describe('calculateStreak', () => {
  it('should return 0 for empty array', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('should return 1 for a single date', () => {
    expect(calculateStreak(['2024-01-01'])).toBe(1);
  });

  it('should calculate consecutive days correctly', () => {
    const dates = ['2024-01-01', '2024-01-02', '2024-01-03'];
    expect(calculateStreak(dates)).toBe(3);
  });

  it('should stop counting at gaps', () => {
    const dates = ['2024-01-01', '2024-01-02', '2024-01-04', '2024-01-05'];
    expect(calculateStreak(dates)).toBe(2);
  });
});

describe('getWeekDates', () => {
  it('should return 7 dates', () => {
    const dates = getWeekDates();
    expect(dates).toHaveLength(7);
  });

  it('should return Date objects', () => {
    const dates = getWeekDates();
    dates.forEach((date) => {
      expect(date).toBeInstanceOf(Date);
    });
  });

  it('should end with today', () => {
    const dates = getWeekDates();
    const today = new Date();
    const lastDate = dates[dates.length - 1];
    expect(lastDate.toDateString()).toBe(today.toDateString());
  });
});

describe('getMonthDates', () => {
  it('should return 30 dates', () => {
    const dates = getMonthDates();
    expect(dates).toHaveLength(30);
  });

  it('should return Date objects', () => {
    const dates = getMonthDates();
    dates.forEach((date) => {
      expect(date).toBeInstanceOf(Date);
    });
  });

  it('should end with today', () => {
    const dates = getMonthDates();
    const today = new Date();
    const lastDate = dates[dates.length - 1];
    expect(lastDate.toDateString()).toBe(today.toDateString());
  });
});
