import { useFAGameSettingsStore } from "@/stores/FAGameSettings";
import { FAGame } from "@/composables/faGame";
import { beforeEach, describe, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";

describe("Flash arithmetic game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("verify answer", () => {
    const store = useFAGameSettingsStore();
    const game = new FAGame(store);

    const solution = game.numbers.reduce((acc, num) => acc + num);

    expect(solution).toEqual(game.solution);
  });
});
