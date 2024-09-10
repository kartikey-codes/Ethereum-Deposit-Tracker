import { useEffect, useState, CSSProperties } from 'react';

interface Deposit {
  hash: string;
  blockNumber: string;
  blockTimestamp: string;
  fee: string;
  pubkey: string;
}

function App() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:3000/deposits')
      .then((response) => response.json())
      .then((data: Deposit[]) => setDeposits(data))
      .catch((error) => console.error('Error fetching deposits:', error));
  }, []);

  // Inline styles
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center',
    },
    table: {
      borderCollapse: 'collapse',
      width: '80%', 
      margin: '0 auto', 
      textAlign: 'center',
    },
    th: {
      padding: '12px',
      borderBottom: '2px solid #000',
      fontSize: '1.2rem',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #ddd',
      fontSize: '1rem',
    },
    tbody: {
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Eth Deposit Tracker</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Hash</th>
            <th style={styles.th}>Block Number</th>
            <th style={styles.th}>Timestamp</th>
            <th style={styles.th}>Fee</th>
            <th style={styles.th}>Public Key</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {deposits.map((deposit, index) => (
            <tr key={index}>
              <td style={styles.td}>{deposit.hash}</td>
              <td style={styles.td}>{deposit.blockNumber}</td>
              <td style={styles.td}>{new Date(deposit.blockTimestamp).toLocaleString()}</td>
              <td style={styles.td}>{deposit.fee}</td>
              <td style={styles.td}>{deposit.pubkey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
