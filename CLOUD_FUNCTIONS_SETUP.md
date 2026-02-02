# Cloud Functions Setup Guide - TRUE Push Notifications! 🚀

This will enable notifications **even when the app is completely closed**.

---

## What You Need:

1. **Upgrade Firebase to Blaze Plan** (Pay-as-you-go)
   - Cost: ~$0-2/month for your use case
   - Free tier: 2 million function calls/month (you won't hit this)
   - Only pay for what you use beyond free tier

2. **Install Firebase CLI** on your laptop
3. **Deploy the Cloud Function** (I'll guide you)

---

## Step 1: Upgrade Firebase to Blaze Plan

1. Go to: `console.firebase.google.com`
2. Select: **betweenlines-dbe2b**
3. Click **Upgrade** (bottom left)
4. Select **Blaze Plan**
5. Add credit card (won't be charged much, if at all)
6. Confirm upgrade

**Why?** Cloud Functions require Blaze plan. The free tier is generous - you'll likely stay within it.

---

## Step 2: Install Firebase CLI

**On Windows:**
1. Download Node.js: `nodejs.org` (LTS version)
2. Install Node.js (follow installer)
3. Open Command Prompt (cmd)
4. Run: `npm install -g firebase-tools`
5. Run: `firebase login`
6. Sign in with your Google account

**On Mac:**
```bash
# Install Node.js with Homebrew
brew install node

# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login
```

---

## Step 3: Set Up Cloud Functions

1. **Create a folder** on your laptop: `C:\between-lines-functions` (or wherever)

2. **Copy these 2 files** (from downloads) into that folder:
   - `package.json` (Cloud Function dependencies)
   - `index.js` (Cloud Function code)

3. **Open Command Prompt** and navigate to that folder:
   ```
   cd C:\between-lines-functions
   ```

4. **Initialize Firebase Functions:**
   ```
   firebase init functions
   ```
   
   When prompted:
   - **Select project:** Choose "betweenlines-dbe2b"
   - **Language:** JavaScript
   - **ESLint:** No (or Yes, doesn't matter)
   - **Install dependencies:** Yes

5. **Replace the functions files:**
   - Delete `functions/index.js`
   - Delete `functions/package.json`
   - Copy YOUR `index.js` into `functions/` folder
   - Copy YOUR `package.json` into `functions/` folder

6. **Deploy the function:**
   ```
   firebase deploy --only functions
   ```
   
   Wait ~2-3 minutes for deployment...

7. **Done!** ✅

---

## Step 4: Test It!

1. **Set notification time** in app (try 5 minutes from now)
2. **Close the app completely** on your phone
3. **Turn off phone screen**
4. **Wait for notification time**
5. **Should get notification!** 🎉

---

## How It Works:

- **Cloud Function runs every hour**
- **Checks all users** for their notification time
- **Sends push notification** via FCM to users whose time has arrived
- **Works even when app is closed** because server sends it

---

## Troubleshooting:

**"firebase: command not found"**
- Node.js not installed or not in PATH
- Restart Command Prompt after installing Node.js

**"Permission denied"**
- Run Command Prompt as Administrator

**"Error deploying functions"**
- Make sure you're on Blaze plan
- Check that package.json and index.js are in functions/ folder

**"No notifications when closed"**
- Wait up to 1 hour (function runs every hour)
- Check Cloud Functions logs in Firebase Console
- Ensure FCM token was saved (check browser console for "FCM Token: ...")

---

## Cost Estimate:

**Blaze Plan Pricing:**
- **Cloud Functions:** First 2 million invocations FREE/month
- Your usage: ~1,440 invocations/month (24 hours × 60 users max)
- **Cost:** $0/month for your use case

**If you had 10,000 users:**
- ~14,400 invocations/month
- Still within free tier!
- **Cost:** Still $0/month

**Firebase is very generous with free tiers!**

---

## Next Steps:

1. Upgrade to Blaze plan
2. Install Firebase CLI
3. Deploy Cloud Function
4. Test closed-app notifications!

Let me know when you're ready to start! 🚀
