# 🚀 Deploy to Vercel

This guide will help you deploy your AI Carbon Footprint Calculator to Vercel.

## Prerequisites

1. **GitHub Account**: You'll need a GitHub account to host your code
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

## Step 1: Push to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Carbon Footprint Calculator"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `ai-carbon-footprint-calculator`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-carbon-footprint-calculator.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Find and select your `ai-carbon-footprint-calculator` repository
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `ai-carbon-footprint-calculator` (or your preferred name)
   - **Framework Preset**: Other (or Static Site)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (not needed for static sites)
   - **Output Directory**: Leave empty (not needed for static sites)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? → No
   - Project name → `ai-carbon-footprint-calculator`
   - Directory → `./` (current directory)

## Step 3: Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to your project dashboard in Vercel
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

## Step 4: Environment Variables (If Needed)

For this project, no environment variables are required since it's a static site.

## Step 5: Update README

Update your `README.md` with the live URL:

```markdown
## 🌐 Live Demo

Visit the live application: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)
```

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that all files are committed to GitHub
   - Ensure `vercel.json` is in the root directory
   - Verify all file paths are correct

2. **404 Errors**:
   - The `vercel.json` file should handle routing
   - Make sure `index.html` is in the root directory

3. **Styling Issues**:
   - Check that `styles.css` is properly linked
   - Verify Google Fonts are loading correctly

### Performance Tips:

1. **Enable Compression**: Vercel automatically compresses static assets
2. **CDN**: Vercel uses a global CDN for fast loading
3. **Caching**: Static assets are cached automatically

## Monitoring

- **Analytics**: Enable Vercel Analytics in your project settings
- **Performance**: Use Vercel's built-in performance monitoring
- **Logs**: Check deployment logs in the Vercel dashboard

## Updates

To update your deployed site:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
3. Vercel will automatically redeploy

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

🎉 **Congratulations!** Your AI Carbon Footprint Calculator is now live on the internet!
