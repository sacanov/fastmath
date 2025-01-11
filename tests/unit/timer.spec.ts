import { Timer } from "@/composables/timer.ts";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("countdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useFakeTimers();
  });

  test("initializes", () => {
    const timer = new Timer(3);

    expect(timer.getTime().value).toBe(3);

    vi.advanceTimersByTime(2000);

    expect(timer.getTime().value).toBe(3);
  });

  test("time progresses", () => {
    const timer = new Timer(3);

    timer.start();

    vi.advanceTimersByTime(1100);

    expect(timer.getTime().value).toBe(2);
  });

  test("finishes at 0", () => {
    const timer = new Timer(3);

    timer.start();

    vi.advanceTimersByTime(2100);

    expect(timer.getTime().value).toBe(1);

    vi.advanceTimersByTime(1050);

    expect(timer.getTime().value).toBe(0);

    vi.advanceTimersByTime(1050);

    expect(timer.getTime().value).toBe(0);
  });

  test("restarts", () => {
    const timer = new Timer(3);

    timer.start();

    vi.advanceTimersByTime(3100);

    timer.restart();

    expect(timer.getTime().value).toBe(3);

    vi.advanceTimersByTime(1000);

    expect(timer.getTime().value).toBe(2);
  });
});
