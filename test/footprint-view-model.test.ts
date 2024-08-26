import { describe, expect, test } from "@jest/globals";

import { emptyFootprint } from "../src/services/footprint-service";
import { FootprintViewModel } from "../src/model/footprint-view-model";

describe("FootprintViewModel", () => {
  test("given empty footprint, then get view model", () => {
    const footprintViewModel = new FootprintViewModel(emptyFootprint);
    expect(footprintViewModel).toEqual({
      distanceInKm: "0,0",
      durationInMin: "0",
      emissionsInGr: "0,00",
    });
  });

  test("given footprint with integer numbers, then get view model", () => {
    const footprintViewModel = new FootprintViewModel({
      distance: 1000,
      duration: 60,
      emissions: 3,
      transportModes: [],
    });
    expect(footprintViewModel).toEqual({
      distanceInKm: "1,0",
      durationInMin: "1",
      emissionsInGr: "3,00",
    });
  });

  test("given footprint with decimal numbers, then get view model", () => {
    const footprintViewModel = new FootprintViewModel({
      distance: 1500,
      duration: 90,
      emissions: 3.45,
      transportModes: [],
    });
    expect(footprintViewModel).toEqual({
      distanceInKm: "1,5",
      durationInMin: "2",
      emissionsInGr: "3,45",
    });
  });
});
