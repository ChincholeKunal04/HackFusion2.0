import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
