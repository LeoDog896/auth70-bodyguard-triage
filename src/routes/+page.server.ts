import { Bodyguard } from '@auth70/bodyguard';
import { z } from 'zod';

// Define a validator, using Zod in this example
const RouteSchema = z.object({ name: z.string() }); 

const bodyguard = new Bodyguard(); // Or use a singleton, or put it in locals

export const actions = {
    default: async ({ request, locals }) => {
        // Use softForm() to parse the form into an object.
        // It does not throw an error if the body is invalid (compared to form() which does).
        const { success, error, value } = await bodyguard.softForm(
            request, // Pass in the request
            RouteSchema.parse // Pass in the validator
        );
         // The output is now typed based on the validator!
         // success: boolean
         // error?: Error
         // value?: { name: string } <-- typed!
        if(!success) {
            return {
                status: 400,
                body: JSON.stringify({ error: error.message }),
            }
        }
        console.log(value)
        return;
    },
} satisfies Actions;
