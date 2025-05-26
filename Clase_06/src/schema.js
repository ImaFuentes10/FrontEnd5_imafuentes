/*Este MODULO contiene los "moldes" para las validaciones (como las Clases en POO) */
import { z } from "zod"

/* schemas */
export const userSchema = z.object({
    name: z.string().trim().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Correo inválido"), /* email requerido*/
    password: z.string().min(12).max(20).regex("[a-zA-Z]+[0-9]+\-+\${1}"), /* max 20 min 12 ab[-_$*#.]*/
    phone: z
        .string()
        .regex("\d{10}")
        .optional()
        .or(z.literal("")), /* 10 digitos opcional*/
})