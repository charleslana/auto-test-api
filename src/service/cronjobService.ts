import UserItemService from './userItemService';
import { CronJob } from 'cron';

export default class CronJobService {
  public static start() {
    this.deleteExpiredItemsJob();
    this.secondJob();
  }

  private static deleteExpiredItemsJob() {
    new CronJob('0 */1 * * * *', async () => {
      console.log('delete expired items');
      UserItemService.deleteExpiredItems();
    }).start();
  }

  private static secondJob() {
    new CronJob('0 */2 * * * *', () => console.log('event 2')).start();
  }
}
