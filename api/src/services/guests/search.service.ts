import { GuestSearchParamBuilder } from "../../builder";
import { Defaults } from "../../constants";
import { Guest } from "../../models";
import * as guestRepository from '../../repositories/guest.repository';

export const search = async (paramBuilder: GuestSearchParamBuilder): Promise<{
    guests: Guest[] | null,
    limit: number
  }> => {
  
  // TODO: any kind of business logic can be implemented here if needed.

  return {
    limit: Defaults.SEARCH_RESULT_LIMIT,
    guests: await guestRepository.getGuests(paramBuilder, Defaults.SEARCH_RESULT_LIMIT),
  }
}