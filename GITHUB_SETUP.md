# GitHub setup — quick steps

1. Create a new GitHub repository, for example `barnali-geospatial-portfolio`.
2. Upload the contents of this folder to the repository root (not the ZIP itself).
3. Commit to the `main` branch.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, select **GitHub Actions**.
6. The included workflow `.github/workflows/deploy-pages.yml` will build `client/` and publish it.
7. After the action completes, open the Pages URL shown by GitHub.

## Before going public

Replace the placeholder profile/experience/fieldwork boxes with your own photographs. Keep the resume and completion letter only if you are comfortable making those documents public.

## Custom domain

If you later connect a custom domain, add it in GitHub Pages settings. If your host requires a CNAME file, put the domain in `client/public/CNAME` before deployment.
