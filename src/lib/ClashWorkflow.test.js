import React from "react";
import CurrentUserStub from "../stubs/CurrentUser";
import ClashWorkflow from "./ClashWorkflow";
import { isContext } from "vm";
const STATES = ClashWorkflow.STATES;
const state = ClashWorkflow.state;

// ReadyToAccept: 1,
// DisplayInfo: 2,
// Hidden: 3,
// Upload: 4,

/*
# Workflow Matrix for current round
State              Description                              Owner  Opponent   Spectator
challenge_sent     Created, awaiting response from opponent Info   Accept?    Hidden
awaiting_owner     Waiting for owner to upload a track      Play   Info       Hidden
awaiting_opponent  Waiting for opponent to upload a track   Info   Play       Info
*/

const owner = {
  id: 101,
  userName: "P1",
  email: "player_one@gmail.com",
};

const opponent = {
  id: 102,
  userName: "P2",
  email: "player_two@gmail.com",
};

const spectator = {
  id: 99,
  userName: "Spectator",
  email: "spectator@gmail.com",
};

describe("Current round workflow - ", () => {
  describe("challengeSent to unregistered opponent", () => {
    const challengeSentToUnregisteredPlayer = {
      state: "challenge_sent",
      opponent: null,
    };

    test("viewed by anyone should be hidden", () => {
      expect(state(challengeSentToUnregisteredPlayer, spectator)).toEqual(
        STATES.Hidden
      );
      expect(state(challengeSentToUnregisteredPlayer, owner)).toEqual(
        STATES.Hidden
      );
      expect(state(challengeSentToUnregisteredPlayer, opponent)).toEqual(
        STATES.Hidden
      );
      expect(state(challengeSentToUnregisteredPlayer, null)).toEqual(
        STATES.Hidden
      );
    });
  });
  describe("challengeSent to registered opponent", () => {
    const challengeSent = {
      state: "challenge_sent",
      waiting_for_description: "Waiting for..",
      opponent: opponent,
      owner: owner,
    };

    test("viewed by registered opponent should be ready to accept", () => {
      expect(state(challengeSent, opponent)).toEqual(STATES.ReadyToAccept);
    });

    test("viewed by owner should display info", () => {
      expect(state(challengeSent, owner)).toEqual(STATES.DisplayInfo);
    });

    test("viewed by spectator should be hidden", () => {
      expect(state(challengeSent, spectator)).toEqual(STATES.Hidden);
    });
  });

  describe("awaiting owner", () => {
    const awaitingOwner = {
      state: "awaiting_owner",
      opponent: opponent,
      owner: owner,
    };
    test("viewed by owner should be ready for track upload ", () => {
      expect(state(awaitingOwner, owner)).toEqual(STATES.Upload);
    });
    test("viewed by opponent should display info", () => {
      expect(state(awaitingOwner, opponent)).toEqual(STATES.AwaitingPlayer);
    });
    test("viewed by spectator should be hidden", () => {
      expect(state(awaitingOwner, spectator)).toEqual(STATES.AwaitingPlayer);
      expect(state(awaitingOwner, null)).toEqual(STATES.AwaitingPlayer);
    });
  });

  describe("awaiting opponent", () => {
    const awaitingOpponent = {
      state: "awaiting_opponent",
      opponent: opponent,
      owner: owner,
    };
    test("viewed by owner should display info", () => {
      expect(state(awaitingOpponent, owner)).toEqual(STATES.DisplayInfo);
    });
    test("viewed by opponent should ", () => {
      expect(state(awaitingOpponent, opponent)).toEqual(STATES.Upload);
    });
    test("viewed by spectator", () => {
      expect(state(awaitingOpponent, null)).toEqual(STATES.DisplayInfo);
    });
  });
});
