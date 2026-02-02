# Firebase Cloud Messaging (FCM) Setup Guide

## What You'll Get:
✅ True push notifications that work even when app is completely closed
✅ Scheduled daily reminders at the time user chooses
✅ Custom app icon in notifications
✅ Works on both mobile and desktop

---

## Step 1: Get Your VAPID Key from Firebase

1. Go to: https://console.firebase.google.com
2. Select project: **betweenlines-dbe2b**
3. Click gear icon ⚙️ → **Project settings**
4. Click **Cloud Messaging** tab
5. Scroll to **Web Push certificates**
6. Click **"Generate key pair"** button
7. **COPY** the key that appears (starts with "BH..." - long string)

**SEND ME THIS KEY!** I need it to update your index.html file.

---

## Step 2: Upload Files to GitHub

Once I update your files with the VAPID key, upload these 3 files:

1. **index.html** (updated with your VAPID key)
2. **firebase-messaging-sw.js** (NEW file for FCM)
3. **service-worker.js** (existing file, keep it)

---

## Step 3: Set Up Cloud Function (Server-Side)

For notifications to work when the app is closed, you need a server to send them. The easiest way is Firebase Cloud Functions.

### Option A: Simple Setup (I'll help you)

I'll create a Cloud Function that:
- Checks every day at each user's chosen time
- Sends a push notification via FCM
- Completely automated

**This requires:**
- Upgrading Firebase to Blaze (pay-as-you-go) plan
- Cost: ~$0-2/month for your use case (very cheap)
- Free tier: 2 million function invocations/month (you won't hit this)

### Option B: Skip for Now

You can skip the Cloud Function and just use:
- ✅ Notifications when app is open
- ✅ Notifications when app is in background (minimized)
- ❌ No notifications when app is completely closed

Most users don't close apps completely, so this might be fine!

---

## Quick Test (After Uploading Files):

1. Visit your site
2. Go to Settings
3. Set notification time
4. Grant permission when prompted
5. Check browser console - should see "FCM Token: ..." message
6. Keep app open/minimized and wait for notification time

---

## Next Steps:

1. **Send me your VAPID key** from Step 1
2. I'll update the files with your key
3. Upload to GitHub
4. Test notifications!
5. (Optional) Set up Cloud Function for closed-app notifications

Ready? Go get that VAPID key! 🚀
