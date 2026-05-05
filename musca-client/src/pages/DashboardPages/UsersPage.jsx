import { useMemo, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';

import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';

import usersSeed from '../../data/users.json';

const roles = ['admin', 'manager', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '');

const toRoleValue = (role) => {
  const normalizedRole = String(role ?? '').trim().toLowerCase();
  return roles.includes(normalizedRole) ? normalizedRole : 'editor';
};

const toGenderValue = (name, index) => {
  if (index % 3 === 0) {
    return 'female';
  }
  if (index % 3 === 1) {
    return 'male';
  }
  return name.toLowerCase().endsWith('a') ? 'female' : 'other';
};

const toUsername = (firstName, lastName, index) => `${firstName}.${lastName}.${index + 1}`.toLowerCase();

const splitName = (name) => {
  const [firstName = '', ...lastNameParts] = String(name ?? '').trim().split(/\s+/);
  return {
    firstName,
    lastName: lastNameParts.join(' '),
  };
};

const loadUsers = () => {
  try {
    return {
      users: usersSeed.map((user, index) => {
        const hasStructuredName = user.firstName || user.lastName;
        const fallbackName = splitName(user.name);
        const firstName = String(hasStructuredName ? user.firstName ?? '' : fallbackName.firstName).trim();
        const lastName = String(hasStructuredName ? user.lastName ?? '' : fallbackName.lastName).trim();
        return {
          id: Number(user.id) || index + 1,
          firstName,
          lastName,
          age: String(user.age ?? 22 + index * 3).trim(),
          gender: String(user.gender ?? toGenderValue(firstName, index)).trim().toLowerCase(),
          contactNumber: String(user.contactNumber ?? `0917${String(2000000 + index * 17341).slice(0, 7)}`).trim(),
          email: String(user.email ?? '').trim().toLowerCase(),
          role: toRoleValue(user.role),
          username: String(user.username ?? toUsername(firstName || 'user', lastName || 'account', index)).trim().toLowerCase(),
          password: String(user.password ?? `Pass${index + 1}!musca`),
          address: String(user.address ?? `${index + 12} Musca Avenue, Quezon City`).trim(),
          isActive:
            typeof user.isActive === 'boolean'
              ? user.isActive
              : String(user.status ?? '').toLowerCase() === 'active',
        };
      }),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/data/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchSearch = !q
        || user.firstName.toLowerCase().includes(q)
        || user.lastName.toLowerCase().includes(q)
        || user.email.toLowerCase().includes(q)
        || user.username.toLowerCase().includes(q);
      const matchRole = !filterRole || user.role === filterRole;
      const matchGender = !filterGender || user.gender === filterGender;
      const matchStatus =
        !filterStatus
        || (filterStatus === 'active' && user.isActive)
        || (filterStatus === 'inactive' && !user.isActive);
      return matchSearch && matchRole && matchGender && matchStatus;
    });
  }, [users, search, filterRole, filterGender, filterStatus]);

  const hasFilters = search || filterRole || filterGender || filterStatus;

  const clearFilters = () => {
    setSearch('');
    setFilterRole('');
    setFilterGender('');
    setFilterStatus('');
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = 'Age must contain numbers only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }

    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) => (
      modal.id
        ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...prev,
            {
              id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser,
            },
          ]
    ));

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((user) => (
      user.id === id ? { ...user, isActive: !user.isActive } : user
    )));
  };

  const fieldProps = (name, label, extra = {}) => ({
    label,
    name,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150, flex: 0.85 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_value, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160, flex: 0.95 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_value, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 125,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{ color: '#111', borderColor: '#111', '&:hover': { borderColor: '#333', bgcolor: 'rgba(0,0,0,0.06)' } }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row.id)}
            sx={{ bgcolor: '#111', color: '#fff', '&:hover': { bgcolor: '#333' } }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ], [users]);

  return (
    <Box sx={{ width: '100%', minWidth: 0, pb: 5, px: { xs: 0.5, md: 1 } }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}
        >
          Add User
        </Button>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper sx={{ minWidth: 0, overflow: 'hidden', borderRadius: 2.5 }}>
        {/* ── Search & Filter toolbar ── */}
        <Box sx={{ px: { xs: 1.5, sm: 2.5 }, pt: { xs: 1.5, sm: 2 }, pb: 1.5 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            flexWrap="wrap"
            useFlexGap
          >
            <TextField
              size="small"
              placeholder="Search name, email or username…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 200 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              select
              size="small"
              label="Role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Roles</MenuItem>
              {roles.map((r) => (
                <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Gender"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Genders</MenuItem>
              {genders.map((g) => (
                <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            {hasFilters ? (
              <Button
                size="small"
                variant="text"
                onClick={clearFilters}
                sx={{ color: '#6b7280', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Clear
              </Button>
            ) : null}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: '#e6e8ee' }} />

        {users.length ? (
          <Box sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={(
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                )}
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} sx={{ color: '#111' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}>
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
