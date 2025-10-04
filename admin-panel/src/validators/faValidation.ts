export const faMessages = {
  required: 'پر کردن این فیلد الزامی است',
  invalidSlug: 'شناسه باید با حروف کوچک، نقطه یا خط تیره باشد (مثال: view.users)',
  minLength: (n: number) => `حداقل ${n} کاراکتر لازم است`,
  maxLength: (n: number) => `حداکثر ${n} کاراکتر مجاز است`,
  number: 'باید عدد باشد',
}

export const slugRegex = /^[a-z0-9]+([._-][a-z0-9]+)*$/




