/* ============================================
   MODULE: PROOF (Guestbook Wall)
   ============================================ */

RigodalModules.register('proof', {

  html: `
    <section class="section proof-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="proof.eyebrow">From our guests</div>
        <h2 class="section-title" data-i18n="proof.title">The Guestbook Wall</h2>
      </div>

      <div class="postcard-scroll" id="postcardScroll"></div>
    </section>
  `,

  init: function () {
    // Postcards live in data.js so they're easy to add to without touching this file
    const scroll = document.getElementById('postcardScroll');
    scroll.innerHTML = RIGODAL_DATA.guestbookPosts.map((post) => `
      <div class="postcard">
        <div class="postcard-quote">"${post.quote}"</div>
        <div class="postcard-author">— ${post.author}</div>
        <div class="postcard-stars">${'★'.repeat(post.stars)}${'☆'.repeat(5 - post.stars)}</div>
      </div>
    `).join('');
  }
});
