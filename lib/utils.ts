import { Identity } from '@/types';
import { z } from 'zod';

export const identityValidation = z.discriminatedUnion('type', [
  z.object({
    address_line_1: z.string().min(1),
    entity_type: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    country_of_citizenship: z.string().optional().nullable(),
    date_of_entity_formation: z.string().min(1),
    legal_name: z.string().min(1),
    postal_code: z.string().min(1),
    region: z.string().min(1).nullable(),
    tax_id: z.string().min(1),
    tax_id_type: z.string().min(1),
    type: z.literal('Individual')
  }),
  z.object({
    address_line_1: z.string().min(1),
    city: z.string().min(1).nullable(),
    country: z.string().min(1),
    country_of_citizenship: z.string().optional().nullable(),
    date_of_entity_formation: z.string().min(1),
    entity_type: z.string().min(1),
    legal_name: z.string().min(1),
    postal_code: z.string().min(1),
    region: z.string().min(1).nullable(),
    tax_id: z.string().min(1),
    tax_id_type: z.string().min(1),
    type: z.literal('Entity')
  })
]);

export const isIdentityValid = (identity: Identity) => {
  if (!identity) return;
  const result = identityValidation.safeParse(identity);
  console.log(result);
  return result;
};

export const getFullName = (user: any) => {
  if (!user) return '';
  if (user && user.first_name)
    return `${user.first_name} ${user.last_name ?? ''}`.trim();
  return user.email;
};

export const getFirstLetter = (email: string | undefined | null) => {
  if (!email) return 'A';
  return email[0];
};

export const copyCurrentUrl = async (toast: any) => {
  await navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard');
};

export const formatDeal = (deal: any, divide = true) => {
  return {
    ...deal,
    total_carry: divide
      ? parseFloat(String(deal.total_carry)) / 100
      : parseFloat(String(deal.total_carry)) * 100,
    management_fee_percent: divide
      ? parseFloat(String(deal.management_fee_percent)) / 100
      : parseFloat(String(deal.management_fee_percent)) * 100
  };
};

export const downloadFile = async (fileData: Blob, fileName: string) => {
  const url = URL.createObjectURL(fileData);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}`;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  link.remove();
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent;

  // Regular expressions to match device types
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /Tablet|iPad/i;

  if (mobileRegex.test(userAgent)) {
    return 'Mobile';
  } else if (tabletRegex.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
};

export const limitString = (str: string, limit = 22) => {
  if (str.length <= limit) return str;
  return str.slice(0, limit) + '...';
};

export const passwordValidation = (
  password: string,
  confirmPassword: string
) => {
  const validator = z
    .object({
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(30, 'Password must be less than 30 characters long')
        .regex(
          /^(?=.*\p{Ll}|\p{Lo})(?=.*\p{Lu}|\p{Lo})(?=.*\p{N})(?=.*[@$!%*?&])[\p{L}\p{N}\p{S}@$!%*?&]+$/u,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),
      confirmPassword: z.string()
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword']
    });
  return validator.safeParse({
    password,
    confirmPassword
  });
};
