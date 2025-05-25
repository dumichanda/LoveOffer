import { getTimeAgo, formatDate, formatTime, formatDateTime, generateId } from "@/lib/utils"

describe("Utils", () => {
  describe("getTimeAgo", () => {
    it('returns "just now" for recent timestamps', () => {
      const now = new Date()
      expect(getTimeAgo(now)).toBe("just now")
    })

    it("returns minutes ago for timestamps within an hour", () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      expect(getTimeAgo(fiveMinutesAgo)).toBe("5m ago")
    })

    it("returns hours ago for timestamps within a day", () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      expect(getTimeAgo(twoHoursAgo)).toBe("2h ago")
    })

    it("returns days ago for timestamps within a week", () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      expect(getTimeAgo(threeDaysAgo)).toBe("3d ago")
    })

    it("handles string dates", () => {
      const dateString = new Date(Date.now() - 10 * 60 * 1000).toISOString()
      expect(getTimeAgo(dateString)).toBe("10m ago")
    })
  })

  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-06-15")
      const formatted = formatDate(date)
      expect(formatted).toMatch(/June 15, 2024/)
    })

    it("handles string dates", () => {
      const dateString = "2024-06-15"
      const formatted = formatDate(dateString)
      expect(formatted).toMatch(/June 15, 2024/)
    })
  })

  describe("formatTime", () => {
    it("returns formatted time as is", () => {
      const time = "14:30"
      expect(formatTime(time)).toBe("14:30")
    })

    it("handles unformatted time", () => {
      const time = "1430"
      expect(formatTime(time)).toBe("1430")
    })
  })

  describe("formatDateTime", () => {
    it("formats date with start and end time", () => {
      const date = new Date("2024-06-15")
      const result = formatDateTime(date, "18:00", "21:00")
      expect(result).toMatch(/Jun 15, 2024 at 18:00 - 21:00/)
    })

    it("formats date with start time only", () => {
      const date = new Date("2024-06-15")
      const result = formatDateTime(date, "18:00")
      expect(result).toMatch(/Jun 15, 2024 at 18:00/)
    })

    it("formats date without time", () => {
      const date = new Date("2024-06-15")
      const result = formatDateTime(date)
      expect(result).toMatch(/Jun 15, 2024/)
    })
  })

  describe("generateId", () => {
    it("generates ID with correct prefix", () => {
      const id = generateId("test")
      expect(id).toMatch(/^test_\d+_[a-z0-9]+$/)
    })

    it("generates unique IDs", () => {
      const id1 = generateId("test")
      const id2 = generateId("test")
      expect(id1).not.toBe(id2)
    })
  })
})
