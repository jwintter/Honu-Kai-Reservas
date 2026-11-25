// O site pode ficar na raiz de um domínio ou numa subpasta (ex.: /Honu-Kai-Reservas/novo).
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
export const raiz = caminho => BASE + caminho
