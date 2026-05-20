import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import usersSeed from '../../data/users.json';
import { createUser, fetchUsers, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '94vw', sm: '82vw', md: '70vw' },
  maxWidth: 980,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: { xs: 2.5, sm: 4 },
};

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
  if (index % 3 === 0) return 'female';
  if (index % 3 === 1) return 'male';
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

const normalizeUser = (user, index = 0) => ({
  id: user._id ?? user.id ?? index + 1,
  _id: user._id ?? user.id ?? index + 1,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  gender: String(user.gender ?? '').trim().toLowerCase(),
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim().toLowerCase(),
  role: toRoleValue(user.role),
  username: String(user.username ?? '').trim().toLowerCase(),
  password: String(user.password ?? ''),
  address: String(user.address ?? '').trim(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const normalizeUsers = (list) => list.map((user, index) => normalizeUser(user, index));

const loadUsers = () => {
  try {
    return {
      users: normalizeUsers(
        usersSeed.map((user, index) => {
          const hasStructuredName = user.firstName || user.lastName;
          const fallbackName = splitName(user.name);
          const firstName = String(hasStructuredName ? user.firstName ?? '' : fallbackName.firstName).trim();
          const lastName = String(hasStructuredName ? user.lastName ?? '' : fallbackName.lastName).trim();
          return {
            ...user,
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
        })
      ),
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
  const [users, setUsers] = useState(seed.users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(seed.error);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [newUser, setNewUser] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const loadUsersFromApi = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await fetchUsers();
        setUsers(Array.isArray(data) ? normalizeUsers(data) : seed.users);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Error fetching users.');
        setUsers(seed.users);
      } finally {
        setLoading(false);
      }
    };

    loadUsersFromApi();
  }, []);

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
    setNewUser({ ...blankForm });
    setErrors({});
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setUserId(null);
    setShowPassword(false);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setUserId(null);
    setShowPassword(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => String(user._id ?? user.id) === String(id));
    if (!userToEdit) return;

    setUserId(userToEdit._id ?? userToEdit.id);
    setNewUser({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      age: userToEdit.age,
      gender: userToEdit.gender,
      contactNumber: userToEdit.contactNumber,
      email: userToEdit.email,
      role: userToEdit.role,
      username: userToEdit.username,
      password: '',
      address: userToEdit.address,
      isActive: userToEdit.isActive,
    });
    setIsEditing(true);
    setShowPassword(false);
    setErrors({});
    setOpen(true);
  };

  const handleChangeUser = ({ target: { name, value, checked, type } }) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateUser = () => {
    const nextErrors = {};
    const email = String(newUser.email ?? '').trim().toLowerCase();
    const username = String(newUser.username ?? '').trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(newUser[key] ?? '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.age && !/^\d+$/.test(String(newUser.age ?? '').trim())) {
      nextErrors.age = 'Age must contain numbers only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(String(newUser.contactNumber ?? '').trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.username && /\s/.test(String(newUser.username ?? ''))) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!isEditing && String(newUser.password ?? '').trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.email && users.some((user) => String(user._id ?? user.id) !== String(userId) && user.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }

    if (!nextErrors.username && users.some((user) => String(user._id ?? user.id) !== String(userId) && user.username === username)) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSaveUser = async () => {
    try {
      const nextErrors = validateUser();

      if (Object.keys(nextErrors).length) {
        setErrors(nextErrors);
        return;
      }

      const payload = {
        firstName: String(newUser.firstName).trim(),
        lastName: String(newUser.lastName).trim(),
        age: String(newUser.age).trim(),
        gender: String(newUser.gender).trim().toLowerCase(),
        contactNumber: String(newUser.contactNumber).trim(),
        email: String(newUser.email).trim().toLowerCase(),
        role: String(newUser.role).trim().toLowerCase(),
        username: String(newUser.username).trim().toLowerCase(),
        address: String(newUser.address).trim(),
        isActive: Boolean(newUser.isActive),
      };

      if (newUser.password) {
        payload.password = newUser.password;
      }

      if (isEditing) {
        const { data } = await updateUser(userId, payload);
        const updatedUser = normalizeUser(data);
        setUsers((prev) => prev.map((user) => (String(user._id ?? user.id) === String(userId) ? updatedUser : user)));
      } else {
        const { data } = await createUser({ ...payload, password: newUser.password });
        const createdUser = normalizeUser(data, users.length);
        setUsers((prev) => [createdUser, ...prev]);
      }

      handleClose();
    } catch (saveError) {
      setError(saveError?.response?.data?.message || 'Error saving user.');
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { data } = await updateUser(id, { isActive: !currentStatus });
      const updatedUser = normalizeUser(data);
      setUsers((prev) => prev.map((user) => (String(user._id ?? user.id) === String(id) ? updatedUser : user)));
    } catch (toggleError) {
      setError(toggleError?.response?.data?.message || 'Error toggling user status.');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_value, row) => labelize(row.gender),
    },
    {
      field: 'role',
      headerName: 'Type',
      minWidth: 120,
      valueGetter: (_value, row) => labelize(row.role),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160, flex: 0.95 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    { field: 'username', headerName: 'Username', minWidth: 140, flex: 0.85 },
    { field: 'address', headerName: 'Address', minWidth: 220, flex: 1.2 },
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
      minWidth: 190,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(row._id ?? row.id)}
            sx={{ bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}
          >
            Edit
          </Button>
          <Switch
            checked={row.isActive}
            onChange={() => handleToggleActive(row._id ?? row.id, row.isActive)}
            color="primary"
          />
        </Box>
      ),
    },
  ];

  const fieldProps = (name, label, extra = {}) => ({
    label,
    name,
    value: newUser[name],
    onChange: handleChangeUser,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    variant: 'standard',
    ...extra,
  });

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
        <Typography variant="h4" fontWeight="bold">
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}
        >
          Add User
        </Button>
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      <Paper sx={{ minWidth: 0, overflow: 'hidden', borderRadius: 2.5 }}>
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
              onChange={(event) => setSearch(event.target.value)}
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
              onChange={(event) => setFilterRole(event.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {labelize(role)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Gender"
              value={filterGender}
              onChange={(event) => setFilterGender(event.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Genders</MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {labelize(gender)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Status"
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
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
              getRowId={(row) => row._id ?? row.id}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 20, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
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
          <Alert severity="info">No users found. Use Add User to create your first record.</Alert>
        )}
      </Paper>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-modal-description"
      >
        <Box
          sx={modalStyle}
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSaveUser();
          }}
        >
          <Typography id="keep-mounted-modal-title" variant="h4" component="h2">
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>

          <Stack spacing={3} sx={{ mt: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('firstName', 'Enter first name')} />
              <TextField {...fieldProps('lastName', 'Enter last name')} />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('age', 'Enter age')} />
              <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('contactNumber', 'Enter mobile number')} />
              <TextField {...fieldProps('address', 'Enter address')} />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('email', 'Enter email', { type: 'email' })} />
              <TextField {...fieldProps('role', 'Type', { select: true })}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </TextField>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('username', 'Enter username')} />
              <TextField
                {...fieldProps('password', 'Enter password', {
                  type: showPassword ? 'text' : 'password',
                  helperText: errors.password || (isEditing ? 'Leave blank to keep the current password.' : ''),
                  InputProps: {
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
                })}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {newUser.isActive ? 'User status: Active' : 'User status: Inactive'}
              </Typography>
              <Switch name="isActive" checked={newUser.isActive} onChange={handleChangeUser} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSaveUser}>
                {isEditing ? 'Save Changes' : 'Add'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;
