
import { addMinutes, calculateDuration } from '@/time.ts'

describe('Time', () => {
  describe('addMinutes', () => {
    
    it('should return 12:00', () => {
      expect(addMinutes('11:30', 30)).toBe('12:00')
      expect(addMinutes('11:30', '30')).toBe('12:00')
    })

    it('should return 11:30', () => {
      expect(addMinutes('11:00', 30)).toBe('11:30')
      expect(addMinutes('11:00', '30')).toBe('11:30')
    })

    it('should return 12:45', () => {
      expect(addMinutes('11:50', 55)).toBe('12:45')
      expect(addMinutes('11:50', '55')).toBe('12:45')
    })

    it('should return 12:30', () => {
      expect(addMinutes('11:00', 90)).toBe('12:30')
      expect(addMinutes('11:00', '90')).toBe('12:30')
    })

    it('should return 13:00', () => {
      expect(addMinutes('12:59', 1)).toBe('13:00')
      expect(addMinutes('12:59', '1')).toBe('13:00')
      expect(addMinutes('12:59', '01')).toBe('13:00')
    })

    it('should return prepend 0', () => {
      expect(addMinutes('07:59', 1)).toBe('08:00')
      expect(addMinutes('07:59', '1')).toBe('08:00')
      expect(addMinutes('07:59', '01')).toBe('08:00')
    })

  })

  describe("calculateDuration", () => {
    test("Adds pair hours", () => {
      expect( calculateDuration('10:00', '18:00')).toBe( 8* 60);
      expect( calculateDuration('11:00', '12:00')).toBe(60);
      expect( calculateDuration('12:00', '13:00')).toBe(60);
      expect( calculateDuration('12:00', '23:00')).toBe(11 * 60);
    })
    test("Adds pair minutes", () => {
      expect( calculateDuration('11:30', '12:30')).toBe(60);
      expect( calculateDuration('11:30', '12:35')).toBe(65);
      expect( calculateDuration('11:30', '12:25')).toBe(55);
      expect( calculateDuration('11:30', '17:30')).toBe(6 * 60);
      expect( calculateDuration('11:30', '17:35')).toBe((6 * 60) + 5);
      expect( calculateDuration('11:30', '17:25')).toBe((6 * 60) - 5);
    })
  })
})
