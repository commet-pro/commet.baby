# 🚀 Deploy — Commet Baby

> Guia de deploy e infraestrutura.

---

## Ambientes

| Ambiente | Frontend | Backend | Database | Branch |
|---|---|---|---|---|
| **Local** | `localhost:3000` | `localhost:4000` | Local PostgreSQL | `feature/*` |
| **Staging** | Vercel Preview | Railway/Render | Staging DB | `develop` |
| **Production** | Vercel | Railway/Render | Production DB | `main` |

## CI/CD Pipeline

```
Push/PR → GitHub Actions → Lint + Type Check + Tests → Deploy

develop → Staging (automático)
main    → Production (manual approval)
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Auth
JWT_SECRET=...
JWT_REFRESH_SECRET=...
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_COMETA_MONTHLY=price_...
STRIPE_PRICE_COMETA_ANNUAL=price_...
STRIPE_PRICE_ESTRELA_MONTHLY=price_...
STRIPE_PRICE_ESTRELA_ANNUAL=price_...
STRIPE_PRICE_GALAXIA_MONTHLY=price_...
STRIPE_PRICE_GALAXIA_ANNUAL=price_...
STRIPE_PRICE_BILINGUAL_MONTHLY=price_...
STRIPE_PRICE_BILINGUAL_ANNUAL=price_...

# Storage (S3/R2)
STORAGE_ENDPOINT=...
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
STORAGE_BUCKET=commet-baby-assets

# Email
RESEND_API_KEY=re_...

# YouTube
YOUTUBE_API_KEY=...

# App
NEXT_PUBLIC_APP_URL=https://commet.baby
NEXT_PUBLIC_API_URL=https://api.commet.baby
```

## Checklist de Deploy (Production)

- [ ] Todas as env vars configuradas
- [ ] Stripe em modo live (não test)
- [ ] Webhook endpoint registrado no Stripe
- [ ] Database migrations executadas
- [ ] SSL/TLS configurado
- [ ] CDN configurado (Cloudflare)
- [ ] Monitoring ativo (Sentry)
- [ ] Backup de database configurado
- [ ] Rate limiting ativo
- [ ] LGPD: Política de privacidade publicada
- [ ] LGPD: Termos de uso publicados
