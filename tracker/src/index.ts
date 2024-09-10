import express, { Request, Response } from 'express'; 
import { Logger } from './logger';
import { doMigration } from './migrate';
import { startTrackingDeposits } from './tracker';
import { db } from './db';
import { deposits } from './schema';
import cors from 'cors';

const logger = new Logger();
const app = express();
const PORT = 3000;
app.use(cors());
async function main() {
  try {
    logger.info('Executing migrations');
    await doMigration();

    logger.info('Starting tracker...');
    startTrackingDeposits();

    // API endpoint to fetch deposits
    app.get('/deposits', async (req: Request, res: Response) => {
      try {
        const result = await db.select().from(deposits);
        res.json(result);
      } catch (error) {
        logger.error(`Error fetching deposits: ${error}`);
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(PORT, () => {
      logger.info(`API server running on port ${PORT}`);
    });
    
  } catch (error) {
    logger.error(error);
  }
}

main();
