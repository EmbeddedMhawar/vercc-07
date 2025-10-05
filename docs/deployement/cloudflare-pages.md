# Deploy to Cloudflare Pages (Free)

This guide shows how to deploy your React/Vite frontend to Cloudflare Pages for free.

## Prerequisites

- A Cloudflare account (free)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Choose **Connect to Git**
5. Select your Git provider and authorize Cloudflare
6. Choose your repository

### 2. Configure Build Settings

Set the following build configuration:

- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `frontend` (if your frontend is in a subdirectory)

### 3. Environment Variables (if needed)

If your app uses environment variables:
1. Go to **Settings** > **Environment variables**
2. Add your variables (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### 4. Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy your site
3. You'll get a free `.pages.dev` subdomain

## Custom Domain (Optional)

To use your own domain:
1. Go to **Custom domains** in your Pages project
2. Click **Set up a custom domain**
3. Follow the DNS configuration steps

## Automatic Deployments

Cloudflare Pages automatically redeploys when you push to your connected branch (usually `main` or `master`).

## Free Tier Limits

- 500 builds per month
- Unlimited bandwidth
- Unlimited requests
- 20,000 files per deployment
- 25 MB per file

## Troubleshooting

### Build Fails
- Check that your `package.json` has the correct build script
- Ensure all dependencies are listed in `package.json`
- Check build logs in the Cloudflare dashboard

### Environment Variables Not Working
- Prefix Vite environment variables with `VITE_`
- Set them in Cloudflare Pages settings, not in `.env` files

### 404 on Refresh
Add a `_redirects` file to your `public` folder:
```
/*    /index.html   200
```

This handles client-side routing for SPAs.