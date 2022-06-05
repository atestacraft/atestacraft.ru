export function validateNickname(nickname: string): boolean {
  const regex = new RegExp(/^[a-zA-Z_]{3,16}/i)
  return regex.test(nickname)
}
