import React from "react";

function About() {
  const about = (
    <div
      className="container-gutters mx-auto text-center top-element-margin"
      style={{ maxWidth: "56.25rem" }}
    >
      <h1 className="px-2 p-3">What is Soundclash?</h1>
      <hr />
      <div className="u-s-mb-base">
        <a href="https://www.google.com/search?q=soundclash">
          <img
            alt="Soundclash dictionary definition screenshot"
            style={{ maxWidth: "100%" }}
            src="https://res.cloudinary.com/soundclash/image/asset/soundclash_defn-0cc8b1b418d0ca290528fa2b373cc4b2.png"
          />
        </a>
      </div>
      <div className="mx-auto text-left">
        <p>
          <a href="http://en.wikipedia.org/wiki/Sound_clash">Soundclashes</a>{" "}
          originated in West Indian culture where opposing soundsystems or DJ's
          would compete for supremacy through their sound system and music
          selection. Winners would be chosen through 'forward surges'.
        </p>
        <p>
          At Soundclash you don't need your own sound system and there won't be
          any forward surges. <a href="/">Challenge</a> a friend whose music
          tastes you admire, discover shed-loads of new music and let the rest
          of the world watch on as two titans of the virtual decks go
          head-to-head.
        </p>
        {/* p>So who's winning? If sharing alone isn't enough for you you'll know who's winning by the mighty social-weapon-of-choice: the Like button.</p> %> */}
        <h2>Get in touch</h2>
        <p>Got questions? Feedback?</p>
        We'd love to hear from you, drop us an email:{" "}
        <a href="mailto:contact@soundcla.sh">contact@soundcla.sh</a>
      </div>
      <p className="my-5" />

      <div className="mt-10" id="version">Ver: 220901</div>

    </div>
  );

  return about;
}

export default About;
