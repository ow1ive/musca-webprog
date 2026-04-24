import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const kpis = [
  { label: 'Total Revenue', value: 'P 4.28M', change: '+9.2%', positive: true },
  { label: 'Reports Generated', value: '1,248', change: '+4.1%', positive: true },
  { label: 'Avg. Conversion', value: '32.7%', change: '-1.4%', positive: false },
  { label: 'Net Retention', value: '91.3%', change: '+2.0%', positive: true },
];

const monthlyRevenue = [320, 410, 380, 520, 560, 610, 590, 680, 710, 760, 740, 820];
const monthlyLeads = [90, 110, 104, 129, 135, 141, 138, 158, 166, 174, 170, 189];

const channelBreakdown = [
  { id: 0, label: 'Organic', value: 38 },
  { id: 1, label: 'Paid Ads', value: 27 },
  { id: 2, label: 'Referral', value: 19 },
  { id: 3, label: 'Email', value: 16 },
];

const reportRows = [
  { id: 1, report: 'Monthly Revenue', owner: 'Finance', period: 'Apr 2026', status: 'Published' },
  { id: 2, report: 'Acquisition Channels', owner: 'Marketing', period: 'Apr 2026', status: 'Published' },
  { id: 3, report: 'Campaign Performance', owner: 'Growth', period: 'Apr 2026', status: 'Draft' },
  { id: 4, report: 'Retention Summary', owner: 'Operations', period: 'Q1 2026', status: 'Published' },
  { id: 5, report: 'Lead Funnel', owner: 'Sales', period: 'Apr 2026', status: 'Review' },
];

const reportColumns = [
  { field: 'report', headerName: 'Report', flex: 1.8 },
  { field: 'owner', headerName: 'Owner', flex: 1 },
  { field: 'period', headerName: 'Period', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        variant="outlined"
        color={value === 'Published' ? 'success' : value === 'Draft' ? 'warning' : 'info'}
      />
    ),
  },
];

function Panel({ title, subtitle, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #d6d9df',
        borderRadius: 2.5,
        backgroundColor: '#fcfcfd',
        height: '100%',
      }}
    >
      <Box sx={{ px: 3, pt: 2.25, pb: 1.1 }}>
        <Typography variant="subtitle1" fontWeight={700} color="#111827">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="#6b7280" sx={{ mt: 0.4 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Divider sx={{ borderColor: '#e6e8ee' }} />
      <Box sx={{ px: 2.5, py: 2 }}>{children}</Box>
    </Card>
  );
}

const ReportsPage = () => {
  return (
    <Box sx={{ pb: 5, width: '100%', px: { xs: 0.5, md: 1 }, color: '#111827' }}>
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.24em', color: '#6b7280', fontWeight: 700, display: 'block', mb: 0.5 }}
        >
          DATA VISUALIZATION
        </Typography>
        <Typography variant="h4" fontWeight={800} color="#111827" sx={{ letterSpacing: '-0.02em' }}>
          Reports
        </Typography>
        <Typography variant="body1" color="#4b5563" sx={{ mt: 0.8, maxWidth: 760, lineHeight: 1.6 }}>
          Monitor trends, compare channels, and review reporting status from one analytics workspace.
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
        }}
      >
        {kpis.map((item) => (
          <Card
            key={item.label}
            elevation={0}
            sx={{ border: '1px solid #d6d9df', borderRadius: 2.5, backgroundColor: '#fcfcfd', p: 2.3 }}
          >
            <Typography variant="body2" color="#4b5563">{item.label}</Typography>
            <Typography sx={{ fontSize: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', mt: 0.6 }} fontWeight={700}>
              {item.value}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }} color={item.positive ? 'success.main' : 'error.main'}>
              {item.change} vs previous month
            </Typography>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.3fr) minmax(0, 1fr)' },
        }}
      >
        <Panel title="Revenue and Lead Trend" subtitle="Monthly performance across this year">
          <LineChart
            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], scaleType: 'point' }]}
            series={[
              { data: monthlyRevenue, label: 'Revenue (P000)', area: true, showMark: false },
              { data: monthlyLeads, label: 'Leads', showMark: false },
            ]}
            height={340}
            margin={{ left: 40, right: 20, top: 20, bottom: 35 }}
          />
        </Panel>

        <Panel title="Channel Distribution" subtitle="Traffic share by acquisition source">
          <PieChart
            series={[{ data: channelBreakdown, innerRadius: 58, outerRadius: 92, paddingAngle: 2, cornerRadius: 4 }]}
            height={340}
            margin={{ top: 8, bottom: 70, left: 10, right: 10 }}
            slotProps={{
              legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' }, padding: 0 },
            }}
          />
        </Panel>
      </Box>

      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(0, 1fr)' },
        }}
      >
        <Panel title="Quarterly Comparison" subtitle="Reports and conversions by quarter">
          <BarChart
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            series={[
              { label: 'Reports', data: [224, 258, 282, 301] },
              { label: 'Conversions', data: [82, 95, 102, 118] },
            ]}
            height={300}
            margin={{ left: 40, right: 20, top: 20, bottom: 32 }}
          />
        </Panel>

        <Panel title="Report Pipeline" subtitle="Current publishing workflow">
          <Box sx={{ height: 300 }}>
            <DataGrid
              rows={reportRows}
              columns={reportColumns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5]}
              rowHeight={48}
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': { bgcolor: '#f6f7f9', borderRadius: 1 },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid #eef0f3' },
                '& .MuiDataGrid-row:hover': { bgcolor: '#f8fafc' },
              }}
            />
          </Box>
        </Panel>
      </Box>
    </Box>
  );
};

export default ReportsPage;
