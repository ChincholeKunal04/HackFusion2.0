import express from 'express';
import {
  bookFacility,
  getFacilityStatus,
  getAvailableTimeSlots
} from '../controller/facility/facility.controller.js';

const facilityrouter = express.Router();

facilityrouter.post('/book', bookFacility);
facilityrouter.get('/status', getFacilityStatus);
facilityrouter.get('/available-slots', getAvailableTimeSlots);

export default facilityrouter;
