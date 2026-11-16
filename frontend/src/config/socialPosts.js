// Latest posts shown in the home page "Latest from Arizona Lifts" section, newest first.
// Keep three of each. For every post:
// - id: Instagram code after /p/ or /reel/ in the post URL, or TikTok number after /video/.
// - date: publish date (YYYY-MM-DD).
// - caption: one or two short sentences from the post, without hashtags (shown as page text).
// - poster: add public/images/social/ig-<id>.webp or tt-<id>.webp (540x960, cover frame).
export const instagramPosts = Object.freeze([
  {
    id: 'Dfg7Q04ALaf',
    date: '2026-11-09',
    caption:
      'Hodajući iskorak, da ili ne za rast gluteusa? Pogledaj video do kraja da čuješ šta ja mislim o tome.',
  },
  {
    id: 'DfZk9IsArrh',
    date: '2026-11-06',
    caption:
      'Proteinske palačinke koje savršeno vajbuju za ovaj period godine, a uz to podržavaju tvoje fitness ciljeve.',
  },
  {
    id: 'Dehcm3RA0iK',
    date: '2026-10-15',
    caption:
      'Proteinske plazma kuglice: kremaste iznutra, čokoladne spolja i savršene uz kafu ili kao brza slatka užina.',
  },
])

export const tiktokVideos = Object.freeze([
  {
    id: '7706205102134103304',
    date: '2026-11-09',
    caption: 'Da li je hodajući iskorak dobra vežba za rast gluteusa?',
  },
  {
    id: '7697259933603007762',
    date: '2026-10-16',
    caption:
      'Negativna (ekscentrična) faza pokreta: nije poenta samo da podigneš teg, već i kako ga spuštaš.',
  },
  {
    id: '7692121062733040897',
    date: '2026-10-02',
    caption:
      'Šaka badema može da ima 200+ kalorija, a da te ne zasiti ni približno kao pravi obrok.',
  },
])

// Everything else about a post is derived from its platform and id.
export const socialPlatforms = Object.freeze({
  instagram: {
    name: 'Instagram',
    posts: instagramPosts,
    poster: (id) => `/images/social/ig-${id}.webp`,
    url: (id) => `https://www.instagram.com/p/${id}/`,
    // cr/v/wp are the params Instagram's embed.js adds; without them the frame never reports its height.
    embed: (id) => `https://www.instagram.com/p/${id}/embed/?cr=1&v=14&wp=540`,
  },
  tiktok: {
    name: 'TikTok',
    posts: tiktokVideos,
    poster: (id) => `/images/social/tt-${id}.webp`,
    url: (id) => `https://www.tiktok.com/@arizonalifts/video/${id}`,
    embed: (id) => `https://www.tiktok.com/player/v1/${id}?autoplay=1&description=1&rel=0`,
  },
})
