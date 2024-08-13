import { describe, expect, test } from "@jest/globals";

import { routeForCarWith1Step, routeForCarWith2Steps } from "./route-for-car";
import {
  routeForBusWith1Step,
  routeForBusWithWalkingStep,
} from "./route-for-bus";
import { emissionFactorByTransport } from "../src/model/emission-factor";
import {
  emptyFootprint,
  FootprintService,
} from "../src/services/footprint-service";
import { TransportMode } from "../src/model/transport-mode";
import { routeForBikeWith1Step } from "./route-for-bike";
import { routeForWalkWith1Step } from "./route-for-walk";
import { routeForSubwayWith1Step } from "./route-for-subway";
import { routeForTrainWith1Step } from "./route-for-train";

describe("FootprintService", () => {
  test("given empty route, then calculate distance", () => {
    const footprintService = new FootprintService();
    expect(footprintService.getFootprint(null)).toEqual(emptyFootprint);
  });

  describe("given route for car", () => {
    test("with 1 step, then calculate distance", () => {
      const footprintService = new FootprintService();
      expect(
        footprintService.getFootprint(routeForCarWith1Step).distance
      ).toEqual(1000);
    });

    test("with 2 steps, then calculate distance", () => {
      const footprintService = new FootprintService();
      expect(
        footprintService.getFootprint(routeForCarWith2Steps).distance
      ).toEqual(2000);
    });

    test("with 1 step, then calculate emissions", () => {
      const footprintService = new FootprintService();
      expect(
        footprintService.getFootprint(routeForCarWith1Step).emissions
      ).toEqual(1000 * emissionFactorByTransport[TransportMode.CAR]);
    });
  });

  describe("given route for bus", () => {
    test("with 1 step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForBusWith1Step)).toEqual({
        distance: 1500,
        emissions: 1500 * emissionFactorByTransport[TransportMode.BUS],
      });
    });

    test("with walking step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForBusWithWalkingStep)).toEqual(
        {
          distance: 1600,
          emissions:
            1500 * emissionFactorByTransport[TransportMode.BUS] +
            100 * emissionFactorByTransport[TransportMode.WALK],
        }
      );
    });
  });

  describe("given route for bike", () => {
    test("with 1 step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForBikeWith1Step)).toEqual({
        distance: 1500,
        emissions: 1500 * emissionFactorByTransport[TransportMode.BIKE],
      });
    });
  });

  describe("given route for walk", () => {
    test("with 1 step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForWalkWith1Step)).toEqual({
        distance: 500,
        emissions: 500 * emissionFactorByTransport[TransportMode.WALK],
      });
    });
  });

  describe("given route for subway", () => {
    test("with 1 step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForSubwayWith1Step)).toEqual({
        distance: 4500,
        emissions: 4500 * emissionFactorByTransport[TransportMode.SUBWAY],
      });
    });
  });

  describe("given route for train", () => {
    test("with 1 step, then calculate footprint", () => {
      const footprintService = new FootprintService();
      expect(footprintService.getFootprint(routeForTrainWith1Step)).toEqual({
        distance: 7500,
        emissions: 7500 * emissionFactorByTransport[TransportMode.TRAIN],
      });
    });
  });
});
