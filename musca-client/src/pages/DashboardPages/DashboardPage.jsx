import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ── Palette ──────────────────────────────────────────────────────────────────
const COLORS = {
  slate: { bg: '#eef2f6', icon: '#0f172a', text: '#0f172a' },
  moss: { bg: '#edf3ef', icon: '#1f4d37', text: '#1f4d37' },
  sand: { bg: '#f8f1e6', icon: '#8a5d22', text: '#8a5d22' },
  ink: { bg: '#edeaf5', icon: '#2b1e49', text: '#2b1e49' },
};

// ── Static data ──────────────────────────────────────────────────────────────
const summaryCards = [
  { label: 'Total Users',      value: '1,284', change: '+12%', positive: true,  icon: <PeopleAltIcon />,           palette: COLORS.slate },
  { label: 'Monthly Reports',  value: '340',   change: '+5%',  positive: true,  icon: <AssignmentTurnedInIcon />,  palette: COLORS.moss  },
  { label: 'Revenue',          value: '₱84,500', change: '-3%', positive: false, icon: <TrendingDownIcon />,       palette: COLORS.sand  },
  { label: 'Active Sessions',  value: '72',    change: '+8%',  positive: true,  icon: <BarChartIcon />,            palette: COLORS.ink   },
];

const recentActivity = [
  { id: 1, user: 'Jon Snow',           initial: 'JS', action: 'Submitted a report',      time: '2 min ago',  status: 'success' },
  { id: 2, user: 'Arya Stark',         initial: 'AS', action: 'Registered as new user',  time: '15 min ago', status: 'info'    },
  { id: 3, user: 'Cersei Lannister',   initial: 'CL', action: 'Updated profile',         time: '1 hr ago',   status: 'warning' },
  { id: 4, user: 'Daenerys Targaryen', initial: 'DT', action: 'Logged in',               time: '2 hr ago',   status: 'info'    },
  { id: 5, user: 'Harvey Roxie',       initial: 'HR', action: 'Submitted a report',      time: '3 hr ago',   status: 'success' },
];

const activityColumns = [
  {
    field: 'user',
    headerName: 'User',
    flex: 1,
    renderCell: ({ row }) => (
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ height: '100%' }}>
        <Avatar sx={{ width: 30, height: 30, fontSize: 13, bgcolor: '#1976d2' }}>{row.initial}</Avatar>
        <Typography variant="body2" fontWeight={500}>{row.user}</Typography>
      </Stack>
    ),
  },
  { field: 'action', headerName: 'Action', flex: 2 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        color={value === 'success' ? 'success' : value === 'warning' ? 'warning' : 'info'}
        variant="outlined"
        sx={{ textTransform: 'capitalize' }}
      />
    ),
  },
  { field: 'time', headerName: 'Time', width: 120 },
];

const gaugeItems = [
  { label: 'Server Load',        value: 68, color: '#f57c00' },
  { label: 'Task Completion',    value: 82, color: '#2e7d32' },
  { label: 'User Satisfaction',  value: 91, color: '#1565c0' },
];

const userRoles = [
  { id: 0, value: 54,   label: 'Admins'  },
  { id: 1, value: 210,  label: 'Staff'   },
  { id: 2, value: 1020, label: 'Members' },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function PanelCard({ title, children, sx = {} }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: '#d6d9df',
        backgroundColor: '#fcfcfd',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {title && (
        <>
          <Box sx={{ px: 3, pt: 2.25, pb: 1.1 }}>
            <Typography variant="subtitle1" fontWeight={700} color="#111827">
              {title}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: '#e6e8ee' }} />
        </>
      )}
      <Box sx={{ px: 3, py: 2.2, flexGrow: 1 }}>{children}</Box>
    </Card>
  );
}

function StatCard({ label, value, change, positive, icon, palette }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: '#d6d9df',
        backgroundColor: '#fcfcfd',
        height: '100%',
        minHeight: 156,
        transition: 'border-color 0.2s, transform 0.2s',
        '&:hover': { borderColor: '#9ca3af', transform: 'translateY(-2px)' },
      }}
    >
      <CardContent sx={{ p: 2.3, '&:last-child': { pb: 2.3 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="#4b5563" sx={{ mb: 0.5 }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '2.6rem', lineHeight: 1.05, letterSpacing: '-0.02em' }} fontWeight={700} color="#111827">
              {value}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
              {positive ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
              )}
              <Typography
                variant="caption"
                fontWeight={600}
                color={positive ? 'success.main' : 'error.main'}
                sx={{ letterSpacing: '0.02em' }}
              >
                {change} vs last month
              </Typography>
            </Stack>
          </Box>
          <Avatar
            sx={{
              bgcolor: palette.bg,
              color: palette.icon,
              width: 54,
              height: 54,
              borderRadius: 2,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <Box
      sx={{
        pb: 5,
        width: '100%',
        px: { xs: 0.5, md: 1 },
        color: '#111827',
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="overline"
          sx={{
            letterSpacing: '0.24em',
            color: '#6b7280',
            fontWeight: 700,
            display: 'block',
            mb: 0.5,
          }}
        >
          STUDIO METRICS
        </Typography>
        <Typography variant="h4" fontWeight={800} color="#111827" sx={{ letterSpacing: '-0.02em' }}>
          Overview
        </Typography>
        <Typography variant="body1" color="#4b5563" sx={{ mt: 0.8, maxWidth: 760, lineHeight: 1.6 }}>
          Welcome back! Here's a summary of what's happening today.
        </Typography>
      </Box>

      {/* ── Stat Cards ── */}
      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {summaryCards.map((card) => (
          <Box key={card.label}>
            <StatCard {...card} />
          </Box>
        ))}
      </Box>

      {/* ── Charts Row ── */}
      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.25fr) minmax(0, 1fr)' },
        }}
      >
        <PanelCard title="Quarterly Activity" sx={{ width: '100%' }}>
          <BarChart
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            series={[
              { data: [35, 44, 24, 34], label: 'Reports' },
              { data: [51, 26, 49, 30], label: 'Users' },
            ]}
            height={350}
            margin={{ left: 24, right: 8, top: 20, bottom: 36 }}
            sx={{ width: '100%' }}
          />
        </PanelCard>
        <PanelCard title="Monthly Revenue Trend" sx={{ width: '100%' }}>
          <LineChart
            xAxis={[
              {
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                scaleType: 'point',
              },
            ]}
            series={[
              {
                data: [30, 55, 40, 70, 60, 80, 75, 90, 85, 100, 95, 110],
                label: 'Revenue (₱K)',
                area: true,
                showMark: false,
              },
            ]}
            height={350}
            margin={{ left: 30, right: 8, top: 20, bottom: 36 }}
            sx={{ width: '100%' }}
          />
        </PanelCard>
      </Box>

      {/* ── Pie + Gauges Row ── */}
      <Box
        sx={{
          mb: 2.5,
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.9fr) minmax(0, 1.6fr)' },
          alignItems: 'start',
        }}
      >
        <PanelCard title="User Role Distribution" sx={{ height: 'auto', width: '100%' }}>
          <PieChart
            series={[{
              data: userRoles,
              innerRadius: 52,
              outerRadius: 80,
              paddingAngle: 3,
              cornerRadius: 4,
            }]}
            height={260}
            margin={{ top: 6, bottom: 56, left: 8, right: 8 }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
          />
        </PanelCard>

        <PanelCard title="Performance Indicators" sx={{ height: 'auto', width: '100%' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Gauges */}
            <Grid item xs={12} sm={7}>
              <Stack direction="row" spacing={1} justifyContent="space-around">
                {gaugeItems.map(({ label, value, color }) => (
                  <Box key={label} textAlign="center">
                    <Gauge
                      width={120}
                      height={120}
                      value={value}
                      sx={{
                        [`& .${gaugeClasses.valueArc}`]: { fill: color },
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 16,
                          fontWeight: 700,
                          fill: color,
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            {/* Progress bars */}
            <Grid item xs={12} sm={5}>
              <Stack spacing={2}>
                {gaugeItems.map(({ label, value, color }) => (
                  <Box key={label}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography variant="caption" fontWeight={600} sx={{ color }}>{value}%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </PanelCard>
      </Box>

      {/* ── Recent Activity ── */}
      <PanelCard title="Recent Activity">
        <Box sx={{ height: 370 }}>
          <DataGrid
            rows={recentActivity}
            columns={activityColumns}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            rowHeight={52}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#f9fafb',
                borderRadius: 1,
              },
              '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' },
              '& .MuiDataGrid-row:hover': { bgcolor: '#f5f8ff' },
            }}
          />
        </Box>
      </PanelCard>
    </Box>
  );
}

export default DashboardPage;
