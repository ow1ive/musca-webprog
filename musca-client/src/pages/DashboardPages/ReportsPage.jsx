import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const barData = [
  { month: 'January', generated: 18, completed: 12 },
  { month: 'February', generated: 24, completed: 19 },
  { month: 'March', generated: 20, completed: 17 },
  { month: 'April', generated: 27, completed: 23 },
];

const pieData = [
  { label: 'Sales', value: 14 },
  { label: 'Users', value: 10 },
  { label: 'Inventory', value: 8 },
  { label: 'Finance', value: 6 },
];

const gaugeValue = 78;

const buildBarBars = () => {
  const maxVal = Math.max(...barData.map((d) => Math.max(d.generated, d.completed)));
  return barData
    .map(
      (d) => `
        <div class="bar-group">
          <div class="bar-label">${d.month}</div>
          <div class="bar-track">
            <div class="bar bar-gen" style="width:${Math.round((d.generated / maxVal) * 100)}%">
              <span>${d.generated}</span>
            </div>
          </div>
          <div class="bar-track">
            <div class="bar bar-cmp" style="width:${Math.round((d.completed / maxVal) * 100)}%">
              <span>${d.completed}</span>
            </div>
          </div>
        </div>`
    )
    .join('');
};

// Colors mapped to: Sales=blue, Users=amber, Inventory=red, Finance=cyan
// — exactly as rendered by MUI x-charts PieChart and visible in the live page legend
const CHART_COLORS = ['#5C6BC0', '#FFA726', '#EF5350', '#29B6F6'];

const buildPieRows = () => {
  const total = pieData.reduce((s, d) => s + d.value, 0);
  const colors = CHART_COLORS;
  return pieData
    .map(
      (d, i) => `
        <tr>
          <td><span class="dot" style="background:${colors[i]}"></span>${d.label}</td>
          <td class="num">${d.value}</td>
          <td class="num">${Math.round((d.value / total) * 100)}%</td>
        </tr>`
    )
    .join('');
};

const buildTableRows = () =>
  rows
    .map(
      (r, i) => `
        <tr class="${i % 2 === 0 ? 'row-even' : ''}">
          <td class="num">${r.id}</td>
          <td>${r.firstName ?? '—'}</td>
          <td>${r.lastName ?? '—'}</td>
          <td class="num">${r.age ?? '—'}</td>
          <td>${[r.firstName, r.lastName].filter(Boolean).join(' ') || '—'}</td>
        </tr>`
    )
    .join('');

const ReportsPage = () => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reports Summary — Export</title>
  <style>
    @page { size: A4; margin: 14mm 16mm; }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      font-size: 13px;
      color: #111827;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Shell ── */
    .shell { max-width: 900px; margin: 0 auto; padding: 32px 0; }

    /* ── Document header ── */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #111827;
      padding-bottom: 18px;
      margin-bottom: 28px;
    }
    .doc-header-left { display: flex; flex-direction: column; gap: 4px; }
    .doc-brand {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      color: #6b7280;
      text-transform: uppercase;
    }
    .doc-title { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
    .doc-subtitle { font-size: 13px; color: #4b5563; margin-top: 4px; max-width: 480px; line-height: 1.5; }
    .doc-meta { text-align: right; font-size: 11.5px; color: #6b7280; line-height: 1.7; }
    .doc-meta strong { color: #111827; }

    /* ── Section card ── */
    .card {
      border: 1px solid #d6d9df;
      border-radius: 10px;
      background: #fcfcfd;
      margin-bottom: 20px;
      break-inside: avoid;
      page-break-inside: avoid;
      overflow: hidden;
    }
    .card-head {
      padding: 14px 20px 10px;
      border-bottom: 1px solid #e6e8ee;
    }
    .card-title { font-size: 14px; font-weight: 700; color: #111827; }
    .card-desc { font-size: 12px; color: #6b7280; margin-top: 3px; line-height: 1.5; }
    .card-body { padding: 18px 20px; }

    /* ── Two-column grid ── */
    .col-row { display: flex; gap: 20px; margin-bottom: 20px; }
    .col-row .card { flex: 1; margin-bottom: 0; }

    /* ── Bar chart ── */
    .bar-legend { display: flex; gap: 18px; margin-bottom: 14px; font-size: 11.5px; color: #4b5563; }
    .bar-legend span { display: flex; align-items: center; gap: 5px; }
    .leg-dot { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
    .bar-group { margin-bottom: 12px; }
    .bar-label { font-size: 11.5px; font-weight: 600; color: #374151; margin-bottom: 4px; }
    .bar-track { height: 20px; background: #f3f4f6; border-radius: 4px; margin-bottom: 3px; overflow: hidden; }
    .bar { height: 100%; border-radius: 4px; display: flex; align-items: center; justify-content: flex-end; padding-right: 6px; min-width: 28px; transition: none; }
    .bar span { font-size: 10.5px; font-weight: 700; color: #fff; }
    .bar-gen { background: #5C6BC0; }
    .bar-cmp { background: #FFA726; }

    /* ── Pie summary ── */
    .gauge-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 160px;
    }
    .gauge-ring {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(#1976d2 0% ${gaugeValue}%, #e5e7eb ${gaugeValue}% 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .gauge-inner {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      background: #fcfcfd;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .gauge-val { font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.03em; }
    .gauge-pct { font-size: 11px; color: #6b7280; margin-top: -2px; }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    thead tr { background: #f6f7f9; }
    thead th {
      padding: 9px 12px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #6b7280;
      border-bottom: 1px solid #e6e8ee;
    }
    thead th.num, tbody td.num { text-align: right; }
    tbody tr { border-bottom: 1px solid #eef0f3; }
    tbody tr.row-even { background: #f9fafb; }
    tbody td { padding: 8px 12px; color: #111827; }
    .dot {
      display: inline-block;
      width: 9px; height: 9px;
      border-radius: 50%;
      margin-right: 6px;
      vertical-align: middle;
    }

    /* ── Footer ── */
    .doc-footer {
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #d6d9df;
      display: flex;
      justify-content: space-between;
      font-size: 10.5px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
<div class="shell">

  <!-- Header -->
  <header class="doc-header">
    <div class="doc-header-left">
      <span class="doc-brand">Data Visualization</span>
      <h1 class="doc-title">Reports Summary</h1>
      <p class="doc-subtitle">Analytics overview for generated reports, category breakdown, and completion performance.</p>
    </div>
    <div class="doc-meta">
      <div><strong>Exported</strong></div>
      <div>${exportedAt}</div>
      <div style="margin-top:6px"><strong>Period</strong></div>
      <div>January – April 2026</div>
    </div>
  </header>

  <!-- Monthly Report Output (bar chart) -->
  <div class="card">
    <div class="card-head">
      <div class="card-title">Monthly Report Output</div>
      <div class="card-desc">Compares how many reports were generated versus completed across the last four months.</div>
    </div>
    <div class="card-body">
      <div class="bar-legend">
        <span><i class="leg-dot" style="background:#5C6BC0"></i>Generated</span>
        <span><i class="leg-dot" style="background:#FFA726"></i>Completed</span>
      </div>
      ${buildBarBars()}
    </div>
  </div>

  <!-- Category Share + Completion Rate -->
  <div class="col-row">
    <div class="card">
      <div class="card-head">
        <div class="card-title">Report Category Share</div>
        <div class="card-desc">Distribution of report requests by category for the current reporting period.</div>
      </div>
      <div class="card-body">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th class="num">Count</th>
              <th class="num">Share</th>
            </tr>
          </thead>
          <tbody>
            ${buildPieRows()}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <div class="card-title">Completion Rate</div>
        <div class="card-desc">Percentage of reports completed on time based on the latest reporting cycle.</div>
      </div>
      <div class="card-body">
        <div class="gauge-stat">
          <div class="gauge-ring">
            <div class="gauge-inner">
              <span class="gauge-val">${gaugeValue}%</span>
              <span class="gauge-pct">on-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- User Table -->
  <div class="card">
    <div class="card-head">
      <div class="card-title">User Records</div>
      <div class="card-desc">Full list of users included in this reporting period.</div>
    </div>
    <div class="card-body" style="padding:0">
      <table>
        <thead>
          <tr>
            <th class="num">ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th class="num">Age</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          ${buildTableRows()}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Footer -->
  <footer class="doc-footer">
    <span>Reports Summary — Confidential</span>
    <span>Generated by Musca Dashboard &middot; ${exportedAt}</span>
  </footer>

</div>
</body>
</html>`);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ pb: 5, width: '100%', px: { xs: 0.5, md: 1 }, color: '#111827' }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category breakdown, and current completion performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flexShrink: 0 }}>
          <Button variant="contained" size="small" sx={{ py: 0.5, bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}>Generate</Button>
          <Button variant="outlined" size="small" sx={{ py: 0.5, color: '#111', borderColor: '#111', '&:hover': { borderColor: '#333', bgcolor: 'rgba(0,0,0,0.06)' } }} onClick={handlePrint}>Export</Button>
          <Button variant="outlined" size="small" sx={{ py: 0.5, color: '#111', borderColor: '#111', '&:hover': { borderColor: '#333', bgcolor: 'rgba(0,0,0,0.06)' } }}>Filter</Button>
        </Stack>
      </Box>

      <Stack spacing={3}>
        <Card sx={{ border: '1px solid #d6d9df', borderRadius: 2.5 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: 'Generated', color: '#5C6BC0' },
                { data: [12, 19, 17, 23], label: 'Completed', color: '#FFA726' },
              ]}
              height={300}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                  label: 'Months',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1, border: '1px solid #d6d9df', borderRadius: 2.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: 'Sales', color: '#5C6BC0' },
                        { id: 1, value: 10, label: 'Users', color: '#FFA726' },
                        { id: 2, value: 8, label: 'Inventory', color: '#EF5350' },
                        { id: 3, value: 6, label: 'Finance', color: '#29B6F6' },
                      ],
                    },
                  ]}
                  width={280}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid #d6d9df', borderRadius: 2.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gauge
                    width={180}
                    height={180}
                    value={78}
                    sx={{
                      '& .MuiGauge-valueArc': { fill: '#1976d2' },
                      '& .MuiGauge-referenceArc': { fill: '#e5e7eb' },
                    }}
                  />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={{ border: '1px solid #d6d9df', borderRadius: 2.5 }}>
          <CardContent>
            <Box sx={{ height: 420 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
