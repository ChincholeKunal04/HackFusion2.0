import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  bookedBy: { type: String, required: true },
  date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
  timeSlot: { type: String, required: true }, // Format: '10:00-12:00'
});

bookingSchema.index({ facility: 1, date: 1, timeSlot: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
