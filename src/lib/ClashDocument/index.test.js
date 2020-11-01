import { insertComment } from ".";

describe("Clash Document - search and manipulation", () => {
  describe("Insert comment", () => {
    const clashStub = {
      rounds: [
        {
          owner_track: {
            id: 171,
            comments: [{ comment_text: "Atque neque commodi autem." }],
          },
          opponent_track: {
            id: 172,
            comments: [{ comment_text: "Round Atque neque commodi autem." }],
          },
        },
        {
          owner_track: {
            id: 181,
            comments: [{ comment_text: "Atque neque commodi autem." }],
          },
          opponent_track: {
            id: 182,
            comments: [{ comment_text: "Round Atque neque commodi autem." }],
          },
        },
      ],
    };

    const comment = {
      comment_text: "The new comment",
    };

    test("Comment should be added to correct owner track", () => {
      const updatedClash = insertComment(181, comment, clashStub);
      const track = updatedClash.rounds[1].owner_track;
      expect(track.comments[0].comment_text).toEqual("The new comment");
    });

    test("Comment should be added to correct opponent track", () => {
      const updatedClash = insertComment(172, comment, clashStub);
      const track = updatedClash.rounds[0].opponent_track;
      const firstComment = track.comments[track.comments.length - 1];
      expect(track.comments[0].comment_text).toEqual("The new comment");
    });
  });
});
