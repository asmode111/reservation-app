import { GuestSearchParamBuilder } from '../builder';
import { Guest, Reservation } from '../models';
import { Op } from 'sequelize';

async function getGuests(paramBuilder: GuestSearchParamBuilder, limit: number): Promise<Guest[] | null> {
  try {
    const where: any = {};
    
    if (paramBuilder.getFirstName()) {
      where.first_name = { [Op.iLike]: `%${paramBuilder.getFirstName()}%` };
    }
    if (paramBuilder.getMiddleName()) {
      where.middle_name = { [Op.iLike]: `%${paramBuilder.getMiddleName()}%` };
    }
    if (paramBuilder.getLastName()) {
      where.last_name = { [Op.iLike]: `%${paramBuilder.getLastName()}%` };
    }
    if (paramBuilder.getEmailAddress()) {
      where.email_address = { [Op.iLike]: `%${paramBuilder.getEmailAddress()}%` };
    }
    if (paramBuilder.getPhoneNumber()) {
      where.phone_number = { [Op.iLike]: `%${paramBuilder.getPhoneNumber()}%` };
    }

    const reservationWhere: any = {};
    if (paramBuilder.getBookingReference()) {
      reservationWhere.booking_reference = { [Op.iLike]: `%${paramBuilder.getBookingReference()}%` };
    }
    if (paramBuilder.getStatus()) {
      reservationWhere.status = paramBuilder.getStatus();
    }
    
    const guests = await Guest.findAll({
      where,
      include: [{
        model: Reservation,
        as: 'reservations',
        required: Object.keys(reservationWhere).length > 0,
        where: reservationWhere
      }],
      limit,
      offset: paramBuilder.getOffset()
    });
    
    return guests;
  } catch (error) {
    console.error('Failed to get guests:', error);
    return null;
  }
}

export { getGuests }