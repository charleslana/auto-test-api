import logger from '../utils/logger';
import UserItemService from './UserItemService';
import { CronJob } from 'cron';

export default class CronJobService {
  public static start() {
    this.deleteExpiredItemsJob();
    this.secondJob();
  }

  private static deleteExpiredItemsJob() {
    new CronJob('0 */1 * * * *', async () => {
      logger.info('delete expired items');
      UserItemService.deleteExpiredItems();
    }).start();
  }

  private static secondJob() {
    new CronJob('0 */2 * * * *', () => logger.info('event 2')).start();
  }
}
