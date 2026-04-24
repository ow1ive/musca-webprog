import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BlockIcon from '@mui/icons-material/Block';

import { DataGrid } from '@mui/x-data-grid';

const users = [
  { id: 1, name: 'Jon Snow', email: 'jon.snow@musca.app', role: 'Admin', status: 'Active', verified: true, joined: '2026-01-12', sessions: 63 },
  { id: 2, name: 'Arya Stark', email: 'arya.stark@musca.app', role: 'Editor', status: 'Active', verified: true, joined: '2026-02-04', sessions: 41 },
  { id: 3, name: 'Cersei Lannister', email: 'cersei@musca.app', role: 'Manager', status: 'Suspended', verified: false, joined: '2025-12-20', sessions: 12 },
  { id: 4, name: 'Jaime Lannister', email: 'jaime@musca.app', role: 'Editor', status: 'Inactive', verified: true, joined: '2026-01-30', sessions: 19 },
  { id: 5, name: 'Daenerys Targaryen', email: 'daenerys@musca.app', role: 'Admin', status: 'Active', verified: true, joined: '2025-11-09', sessions: 88 },
  { id: 6, name: 'Harvey Roxie', email: 'harvey.roxie@musca.app', role: 'Viewer', status: 'Active', verified: false, joined: '2026-03-02', sessions: 25 },
  { id: 7, name: 'Rossini Frances', email: 'rossini@musca.app', role: 'Viewer', status: 'Inactive', verified: false, joined: '2026-03-11', sessions: 9 },
  { id: 8, name: 'Ferrara Clifford', email: 'ferrara@musca.app', role: 'Manager', status: 'Active', verified: true, joined: '2025-10-18', sessions: 54 },
];

function StatCard({ icon, label, value, color }) {
  return (
    <Card elevation={0} sx={{ border: '1px solid #d6d9df', borderRadius: 2.5, p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="#4b5563">{label}</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, letterSpacing: '-0.02em' }}>
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 44, height: 44 }}>{icon}</Avatar>
      </Stack>
    </Card>
  );
}

const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const roleMatch = role === 'All' || user.role === role;
      const statusMatch = status === 'All' || user.status === status;
      return searchMatch && roleMatch && statusMatch;
    });
  }, [search, role, status]);

  const columns = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1.4,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.2} sx={{ height: '100%' }}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: '#111827', fontSize: 12 }}>{row.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600} color="#111827">
              {row.name}
            </Typography>
            <Typography variant="caption" color="#6b7280">
              {row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    { field: 'role', headerName: 'Role', flex: 0.8 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          color={value === 'Active' ? 'success' : value === 'Inactive' ? 'default' : 'warning'}
        />
      ),
    },
    {
      field: 'verified',
      headerName: 'Verified',
      flex: 0.8,
      renderCell: ({ value }) => (
        <Chip
          label={value ? 'Yes' : 'No'}
          size="small"
          color={value ? 'info' : 'default'}
          variant="outlined"
        />
      ),
    },
    { field: 'joined', headerName: 'Joined', flex: 0.9 },
    { field: 'sessions', headerName: 'Sessions', type: 'number', flex: 0.7 },
  ];

  const activeCount = users.filter((item) => item.status === 'Active').length;
  const verifiedCount = users.filter((item) => item.verified).length;
  const suspendedCount = users.filter((item) => item.status === 'Suspended').length;

  return (
    <Box sx={{ pb: 5, width: '100%', px: { xs: 0.5, md: 1 }, color: '#111827' }}>
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.24em', color: '#6b7280', fontWeight: 700, display: 'block', mb: 0.5 }}
        >
          USER DIRECTORY
        </Typography>
        <Typography variant="h4" fontWeight={800} color="#111827" sx={{ letterSpacing: '-0.02em' }}>
          Users
        </Typography>
        <Typography variant="body1" color="#4b5563" sx={{ mt: 0.8, maxWidth: 760, lineHeight: 1.6 }}>
          Browse account details, filter by role or status, and review engagement signals in one place.
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
        <StatCard icon={<GroupIcon />} label="Total Users" value={users.length} color="#edf2f7" />
        <StatCard icon={<PersonAddAlt1Icon />} label="Active Users" value={activeCount} color="#ecfdf3" />
        <StatCard icon={<VerifiedUserIcon />} label="Verified" value={verifiedCount} color="#eef4ff" />
        <StatCard icon={<BlockIcon />} label="Suspended" value={suspendedCount} color="#fff4e8" />
      </Box>

      <Card elevation={0} sx={{ border: '1px solid #d6d9df', borderRadius: 2.5, backgroundColor: '#fcfcfd' }}>
        <Box sx={{ px: 3, pt: 2.25, pb: 1.1 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#111827">
            User List
          </Typography>
          <Typography variant="body2" color="#6b7280" sx={{ mt: 0.4 }}>
            Filter and search user records.
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#e6e8ee' }} />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ p: 2.5 }}>
          <TextField
            size="small"
            fullWidth
            label="Search name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <TextField
            size="small"
            select
            label="Role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            sx={{ minWidth: 140 }}
          >
            {['All', 'Admin', 'Manager', 'Editor', 'Viewer'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            select
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={{ minWidth: 140 }}
          >
            {['All', 'Active', 'Inactive', 'Suspended'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            onClick={() => {
              setSearch('');
              setRole('All');
              setStatus('All');
            }}
            sx={{ borderColor: '#d1d5db', color: '#111827', minWidth: 110 }}
          >
            Reset
          </Button>
        </Stack>

        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Box sx={{ height: 430 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
              pageSizeOptions={[6, 10]}
              disableRowSelectionOnClick
              rowHeight={58}
              sx={{
                border: '1px solid #eceef2',
                '& .MuiDataGrid-columnHeaders': { bgcolor: '#f6f7f9' },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid #eef0f3' },
                '& .MuiDataGrid-row:hover': { bgcolor: '#f8fafc' },
              }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default UsersPage;
