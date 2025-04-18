import Facility from '../../models/Facility.model.js';
import Booking from '../../models/Booking.model.js';

// Book a facility

const bookFacility = async (req, res) => {
  const { facilityId, bookedBy, date, timeSlot } = req.body;

  try {
    const existing = await Booking.findOne({ facility: facilityId, date, timeSlot });
    if (existing) {
      return res.status(400).json({ message: 'Facility already booked for this time slot.' });
    }

    const booking = new Booking({ facility: facilityId, bookedBy, date, timeSlot });
    await booking.save();

    res.status(201).json({ message: 'Facility booked successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error booking facility', error });
  }
};

// Get facility availability for a given date
 const getFacilityStatus = async (req, res) => {
  const { date } = req.query;

  try {
    const facilities = await Facility.find();
    const bookings = await Booking.find({ date }).populate('facility');

    const statusMap = {};

    facilities.forEach(facility => {
      statusMap[facility._id] = {
        facility,
        bookedSlots: [],
        available: true
      };
    });

    bookings.forEach(booking => {
      if (statusMap[booking.facility._id]) {
        statusMap[booking.facility._id].bookedSlots.push(booking.timeSlot);
        statusMap[booking.facility._id].available = false;
      }
    });

    const status = Object.values(statusMap);

    res.json({ date, status });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facility status', error });
  }
};

// Get available time slots for a facility
const getAvailableTimeSlots = async (req, res) => {
  const { facilityId, date } = req.query;

  const allSlots = ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'];

  try {
    const bookings = await Booking.find({ facility: facilityId, date });
    const bookedSlots = bookings.map(b => b.timeSlot);

    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({ facilityId, date, availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error });
  }
};

export{
    getAvailableTimeSlots,getFacilityStatus,bookFacility
}