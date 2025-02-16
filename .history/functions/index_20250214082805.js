const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.releaseRooms = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    const db = admin.firestore();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef.where("checkOutDate", "<", today).get();

    const batch = db.batch();

    snapshot.forEach((doc) => {
      const bookingData = doc.data();
      const roomRef = db.collection("rooms").doc(bookingData.roomId);
      batch.update(roomRef, { status: "available" });
      batch.delete(doc.ref); // Optionally remove old bookings
    });

    await batch.commit();
    console.log("Rooms updated successfully.");
  });
