import { z } from 'zod';
import { Language, SubscriptionPlan, BillingCycle, PlayMode } from './constants';

export const RegisterInputSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100)
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória')
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const ForgotPasswordInputSchema = z.object({
  email: z.string().email('E-mail inválido')
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordInputSchema>;

export const ResetPasswordInputSchema = z.object({
  token: z.string().min(1, 'O token é obrigatório'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres')
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;

export const UpdateProfileInputSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').optional(),
  avatarUrl: z.string().url('URL do avatar inválida').optional()
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileInputSchema>;

export const CreateBabyProfileInputSchema = z.object({
  name: z.string().min(1, 'Nome do bebê é obrigatório').max(50),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido (AAAA-MM-DD)').refine((val) => {
    const date = new Date(val);
    if (isNaN(date.getTime())) return false;
    const now = new Date();
    
    // Zera horas para comparação justa de data
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birth = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (birth > today) return false;
    
    const threeYearsAgo = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    if (birth < threeYearsAgo) return false;
    
    return true;
  }, 'A data não pode ser futura e o bebê deve ter no máximo 3 anos'),
  avatarId: z.string().min(1, 'ID do avatar é obrigatório'),
  languagePref: z.nativeEnum(Language)
});

export type CreateBabyProfileInput = z.infer<typeof CreateBabyProfileInputSchema>;

export const UpdateBabyProfileInputSchema = CreateBabyProfileInputSchema.partial();

export type UpdateBabyProfileInput = z.infer<typeof UpdateBabyProfileInputSchema>;

export const WatchProgressInputSchema = z.object({
  profileId: z.string().uuid('ID do perfil inválido'),
  watchedSeconds: z.number().int().min(0),
  completed: z.boolean(),
  language: z.nativeEnum(Language),
  mode: z.nativeEnum(PlayMode)
});

export type WatchProgressInput = z.infer<typeof WatchProgressInputSchema>;

export const CheckoutInputSchema = z.object({
  planId: z.nativeEnum(SubscriptionPlan),
  billingCycle: z.nativeEnum(BillingCycle),
  hasBilingualAddon: z.boolean(),
  successUrl: z.string().url('URL de sucesso inválida'),
  cancelUrl: z.string().url('URL de cancelamento inválida')
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;
