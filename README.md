# Ethereum Deposit Tracker
Develop a robust and efficient Ethereum Deposit Tracker to monitor and record ETH deposits on the Beacon Deposit Contract.

## Clone the repository

## Create and configure the .env file
- navigate to the tracker folder
- create a .env file
- paste the below code
  
```
DATABASE_URL=postgresql://admin:admin@localhost:5432/luganodes
ALCHEMY_API_KEY=<Your_Alchemy_API_Key
```
## Create a Docker network

```
docker network create g-net
```

## Run the Frontend 

Enter the `frontend` folder:

```
cd frontend
```

Start Frontend

```
docker-compose up --build

```

## Run the monitor (for alerts with Grafana)

Enter the `monitor` folder:

```
cd monitor
```

Start Grafana

```
docker compose up -d
```

## Run the tracker app

Enter the `tracker` folder:

```
cd tracker
```
Start the Postgre Sql Server and Tracker application

```
docker compose up -d
```

## Access API Endpoint
Enter `http://localhost:3000/deposits`

## Access Frontend
Enter `http://localhost:3002`

![image](https://github.com/user-attachments/assets/aa16de7b-e4a8-4043-bca2-3d1263a75a27)


## Create dashboard for seeing deposit table

Enter `localhost:3001/login`

```
Email: admin
Password: admin
```

- Click to create a new dashboard
- Add PostgreSQL as a data source
```
*Connection*
Host URL: postgres:5432
Database name: luganodes

*Authentication*
Username: admin
Password: admin
```
![image](https://github.com/user-attachments/assets/557311f4-477e-4e42-bb96-f830d63e46e4)

- Add visualization, select PostgreSQL data source you have just created
  ![image](https://github.com/user-attachments/assets/cd0690c1-8b10-4dae-b505-ec956866c4d1)

- Select table `deposits` and column `*`, run query, switch to table.
 ![image](https://github.com/user-attachments/assets/120cfb3e-d385-4c3e-8019-9ffeee180fc3)

-save and name your new dashboard
![image](https://github.com/user-attachments/assets/d511ed38-0f45-4456-b257-ec724c1e036f)

## Creating Telegram alert

- Navigate to Alerting/Alert rules in Grafana Dashboard
- click on New Alert Rule
- Enter the Alert rule Name: deposit alert
![image](https://github.com/user-attachments/assets/23cad8dc-1a64-451c-a79a-b7490ad31c75)

_Define query and alert condition_

```sql
SELECT
  date_trunc('hour', "blockTimestamp") AS time,
  count(*) AS deposit_count
FROM deposits
GROUP BY 1
ORDER BY 1;
```

![image](https://github.com/user-attachments/assets/afc5c9cf-9e01-4120-b12a-282c75243041)

On the section _Configure labels and notifications_, click on `View or create contact points`

- Add contact points
- Name: Telegram. Integration: Telegram.

Obtain your BOT API Token by talking with @BotFather at Telegram:
![image](https://github.com/user-attachments/assets/94bdde2c-447c-4874-979b-ec660df024ce)


- Create a Telegram group and add your bot to it.
  ![image](https://github.com/user-attachments/assets/e877d08c-d621-4c99-8b80-3bf0e1c4a115)
- Visit `https://api.telegram.org/bot<YOUR_BOT_API_TOKEN>/getUpdates` and check the Chat ID
- Save contact point. Add it to your Alert rule, save rule.
  ![image](https://github.com/user-attachments/assets/93393072-0042-4401-920c-788e76493898)




