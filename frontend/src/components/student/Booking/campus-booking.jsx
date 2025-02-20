import React, { useState } from "react";

const FacilityBooking = () => {
  const facilities = ["Tennis Court", "Basketball Court", "Library Hall", "Gym"];
  
  const [bookings, setBookings] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedFacility || !date || !time) return alert("Please fill all fields!");

    const newBooking = {
      id: bookings.length + 1,
      facility: selectedFacility,
      date,
      time,
    };

    setBookings([...bookings, newBooking]);
    setSelectedFacility("");
    setDate("");
    setTime("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">🏆 Campus Facility Booking</h2>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="space-y-4">
        <select
          className="w-full p-3 border rounded-md"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          required
        >
          <option value="">Select Facility</option>
          {facilities.map((facility, index) => (
            <option key={index} value={facility}>
              {facility}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full p-3 border rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="w-full p-3 border rounded-md"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Facility
        </button>
      </form>

      {/* Booking List */}
      <h3 className="text-lg font-semibold mt-6">📅 Your Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {bookings.map((booking) => (
            <li key={booking.id} className="p-3 border rounded-md bg-gray-100">
              <strong>{booking.facility}</strong> - {booking.date} at {booking.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacilityBooking;
