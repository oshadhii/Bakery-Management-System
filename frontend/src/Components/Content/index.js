import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'; //
function SalesDashboardCard({ title, value }) {
    return (
      <Card style={{ minWidth: 200, margin: '20px', backgroundColor: 'fac031',borderRadius: '20px',transition: 'transform 0.3s ease',cursor: 'pointer' }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <CardContent>
          <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" style={{ marginTop: '10px', color: 'red' }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    );
  }
function Content() {
    
    return (< >

<div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <SalesDashboardCard title="Total Income" value="2435K" />
      <SalesDashboardCard title="By Online Orders" value="1254K" />
      <SalesDashboardCard title="By Wholesale Orders" value="980K" />
      <SalesDashboardCard title="By Delivery Orders" value="201K" />
      <SalesDashboardCard title="Not Sold" value="24" />
    </div>

<button>

</button>
    </>);
}
export default Content;