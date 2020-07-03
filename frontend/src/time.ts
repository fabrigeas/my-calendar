/** Calculates and returns the sum final time based on @time and @minutes
 *
 * @param time -the actual time
 * @param minutes -the number of minutes to be added
 */
export function addMinutes(time: string, minutes: number | string): string {
  const [h, m] = time.split(':');

  const sumMinutes = Number(m) + Number(minutes);
  const H = Number(h) + Math.floor(sumMinutes / 60);
  const M = sumMinutes % 60;

  return `${H < 10 ? '0' + H : H}:${M < 10 ? '0' + M : M}`;
}

/** Calculates the absolute difference in minutes
 * between the startTime and the endTime
 *
 * @param startTime
 * @param endTime
 */
export function calculateDuration(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':');
  const [eh, em] = endTime.split(':');

  const endHour = Number(eh);
  const endMin = Number(em);

  const H = Math.abs(endHour - Number(sh)) * 60;
  const M = endMin - Number(sm);

  return H + M;
}
