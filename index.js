const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Scheduled function that runs every hour to check for users who need notifications
exports.sendDailyNotifications = functions.pubsub
  .schedule('every 1 hours')
  .timeZone('UTC')
  .onRun(async (context) => {
    const db = admin.firestore();
    const messaging = admin.messaging();
    
    // Get current hour in UTC
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
    
    console.log(`Checking for notifications at ${currentHour}:${currentMinute} UTC`);
    
    try {
      // Get all users
      const usersSnapshot = await db.collection('users').get();
      
      const notifications = [];
      
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        
        // Check if user has notification time set and FCM token
        if (userData.notificationTime && userData.fcmToken) {
          const [userHour, userMinute] = userData.notificationTime.split(':').map(Number);
          
          // Convert user's local time to UTC (assume user timezone from signup, or default to UTC)
          // For simplicity, we'll use the time as-is and let users set it in their local time
          // TODO: Add timezone support if needed
          
          // Check if it's time to send notification (within current hour)
          if (userHour === currentHour && currentMinute < 60) {
            const message = {
              notification: {
                title: 'Between Lines',
                body: 'A quiet thought for today.'
              },
              data: {
                click_action: 'https://huy-lannon.github.io/'
              },
              token: userData.fcmToken,
              webpush: {
                notification: {
                  icon: 'https://huy-lannon.github.io/icon-192.png',
                  badge: 'https://huy-lannon.github.io/icon-192.png',
                  tag: 'daily-reminder'
                },
                fcm_options: {
                  link: 'https://huy-lannon.github.io/'
                }
              }
            };
            
            notifications.push(messaging.send(message));
            console.log(`Scheduled notification for user ${userDoc.id}`);
          }
        }
      }
      
      // Send all notifications
      const results = await Promise.allSettled(notifications);
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      console.log(`Sent ${successful} notifications, ${failed} failed`);
      
      return null;
    } catch (error) {
      console.error('Error sending notifications:', error);
      return null;
    }
  });
