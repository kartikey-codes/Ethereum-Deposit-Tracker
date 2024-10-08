import { AlchemyProvider, Contract, ContractEventPayload } from 'ethers';
import { ALCHEMY_API_KEY, BEACON_DEPOSIT_CONTRACT_ADDRESS } from './config';
import { Logger } from './logger';
import { db } from './db';
import { deposits } from './schema';


const deposit_event_abi = [
  'event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)',
];


const provider = new AlchemyProvider('homestead', ALCHEMY_API_KEY);


const contract = new Contract(
  BEACON_DEPOSIT_CONTRACT_ADDRESS,
  deposit_event_abi,
  {
    provider,
  }
);

const logger = new Logger();

interface DepositEventPayload {
  pubkey: string;
  withdrawal_credentials: string;
  amount: string;
  signature: string;
  index: string;
  event: ContractEventPayload;
}

const handleDepositEvent = async ({
  pubkey,
  withdrawal_credentials,
  amount,
  signature,
  index,
  event,
}: DepositEventPayload): Promise<void> => {
  try {
    const { transactionHash, blockNumber } = event.log;

    const block = await provider.getBlock(blockNumber);
    if (!block) {
      throw new Error('Block not found');
    }

    const transaction = await provider.getTransaction(transactionHash);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const transactionReceipt = await provider.getTransactionReceipt(
      transactionHash
    );
    if (!transactionReceipt) {
      throw new Error('Transaction receipt not found');
    }

   
    const fee = transactionReceipt.gasUsed * transaction.gasPrice;

    const senderAddress = transaction.from;
    const timestamp = new Date(block.timestamp * 1000);

  
    logger.info({
      blockNumber,
      transactionHash,
      timestamp,
      senderAddress,
      pubkey,
      withdrawal_credentials,
      amount,
      signature,
      index,
      fee: fee.toString(),
    });

  
    await db.insert(deposits).values({
      hash: transactionHash,
      blockNumber: blockNumber.toString(),
      blockTimestamp: timestamp,
      fee: fee.toString(),
      pubkey: pubkey,
    });
  } catch (error) {
    logger.error(`Error processing deposit event: ${error}`);
  }
};

export function startTrackingDeposits() {
 
  contract.on(
    'DepositEvent',
    (
      pubkey: string,
      withdrawal_credentials: string,
      amount: string,
      signature: string,
      index: string,
      event: ContractEventPayload
    ) => {
      handleDepositEvent({
        pubkey,
        withdrawal_credentials,
        amount,
        signature,
        index,
        event,
      });
    }
  );
}
