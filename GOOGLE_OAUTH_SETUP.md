# Google OAuth Setup Guide

## The Issue
You're getting "Error 401: invalid_client" because the Google OAuth configuration doesn't match your deployed domain.

## Quick Fix

### 1. Update Environment Variables in Vercel
Go to your Vercel dashboard → Project Settings → Environment Variables and update:

\`\`\`
NEXTAUTH_URL=https://v0-dating-app-development-khaki.vercel.app
\`\`\`

### 2. Update Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "APIs & Services" → "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", add:
   \`\`\`
   https://v0-dating-app-development-khaki.vercel.app/api/auth/callback/google
   \`\`\`
5. Under "Authorized JavaScript origins", add:
   \`\`\`
   https://v0-dating-app-development-khaki.vercel.app
   \`\`\`

### 3. Redeploy
After making these changes, redeploy your application.

## Alternative: Create New OAuth Client
If you don't have access to the existing OAuth client:

1. Create a new OAuth 2.0 Client ID in Google Cloud Console
2. Set the redirect URI to your Vercel domain
3. Update your environment variables with the new client ID and secret

The OAuth error will be resolved once the domain configuration matches between Google and your deployment.
