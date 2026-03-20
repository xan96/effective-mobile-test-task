import { z } from 'zod';

export const userIdParamSchema = z.object({
  id: z.uuid({ message: 'Invalid user ID format' }),
});
