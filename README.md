# Luganodes-SDE-Task-Kartikey_Luganodes_Task
Develop a robust and efficient Ethereum Deposit Tracker to monitor and record ETH deposits on the Beacon Deposit Contract.
## Clone the repository

```
git clone https://github.com/kartikey-codes/kartikey_luganodes_task.git
cd kartikey_luganodes_task
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

## Create dashboard for seeing deposit table

Enter `localhost:3001/login`

```
Email: admin
Password: admin
```

- Click to create a new dashboard
- Add PostgreSQL as a data source