export const BadgeType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type BadgeTypeType = (typeof BadgeType)[keyof typeof BadgeType];
