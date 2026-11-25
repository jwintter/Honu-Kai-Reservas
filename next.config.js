/** Site estático: as regras ficam no Supabase, então não há servidor próprio. */
module.exports = { output: 'export', trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || '' }
