import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { getDashboardArticles, saveDashboardArticles, toArticleSlug } from '../../data/articleStore';

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
  title: '',
  category: 'General',
  readTime: '5 min read',
  excerpt: '',
  image: '',
  content: '',
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(getDashboardArticles());
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlug, setEditSlug] = useState('');
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = useMemo(() => {
    const categorySet = new Set(articles.map((article) => article.category).filter(Boolean));
    return Array.from(categorySet);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchSearch = !q
        || article.title.toLowerCase().includes(q)
        || article.slug.toLowerCase().includes(q)
        || article.excerpt.toLowerCase().includes(q);
      const matchCategory = !categoryFilter || article.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [articles, search, categoryFilter]);

  const hasFilters = search || categoryFilter;

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const handleOpen = () => {
    setIsEditing(false);
    setEditSlug('');
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditSlug('');
    resetForm();
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.excerpt.trim()) nextErrors.excerpt = 'Excerpt is required.';
    if (!form.content.trim()) nextErrors.content = 'Content is required.';

    const slug = toArticleSlug(form.title);
    if (!slug) nextErrors.title = 'Title must include letters or numbers.';

    if (!isEditing && articles.some((article) => article.slug === slug)) {
      nextErrors.title = 'An article with the same title/slug already exists.';
    }

    if (isEditing && articles.some((article) => article.slug !== editSlug && article.slug === slug)) {
      nextErrors.title = 'An article with the same title/slug already exists.';
    }

    return nextErrors;
  };

  const handleEdit = (slug) => {
    const article = articles.find((entry) => entry.slug === slug);
    if (!article) return;

    setForm({
      title: article.title,
      category: article.category,
      readTime: article.readTime,
      excerpt: article.excerpt,
      image: article.image,
      content: article.content.join('\n\n'),
    });
    setEditSlug(article.slug);
    setIsEditing(true);
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (slug) => {
    const next = articles.filter((article) => article.slug !== slug);
    setArticles(next);
    saveDashboardArticles(next);
  };

  const handleSave = () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const slug = toArticleSlug(form.title);
    const nextArticle = {
      name: slug,
      slug,
      title: form.title.trim(),
      category: form.category.trim() || 'General',
      readTime: form.readTime.trim() || '5 min read',
      excerpt: form.excerpt.trim(),
      image: form.image.trim() || articles[0]?.image,
      content: form.content
        .split(/\n{2,}|\r\n\r\n/)
        .map((part) => part.trim())
        .filter(Boolean),
    };

    const next = isEditing
      ? articles.map((article) => (article.slug === editSlug ? nextArticle : article))
      : [nextArticle, ...articles];

    setArticles(next);
    saveDashboardArticles(next);
    handleClose();
  };

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 260, flex: 1 },
    { field: 'category', headerName: 'Category', minWidth: 130 },
    { field: 'readTime', headerName: 'Read Time', minWidth: 120 },
    { field: 'slug', headerName: 'Slug', minWidth: 180, flex: 0.8 },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 180,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon fontSize="small" />}
            onClick={() => handleEdit(row.slug)}
            sx={{ bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon fontSize="small" />}
            onClick={() => handleDelete(row.slug)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

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
        <Typography variant="h4" fontWeight="bold">Dashboard Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: '#111', '&:hover': { bgcolor: '#333' } }}
        >
          Add Article
        </Button>
      </Box>

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
              placeholder="Search by title, slug, excerpt..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ flexGrow: 1, minWidth: 220 }}
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
              label="Category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </TextField>
            {hasFilters ? (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('');
                }}
                sx={{ color: '#6b7280', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Clear
              </Button>
            ) : null}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: '#e6e8ee' }} />

        {articles.length ? (
          <Box sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              getRowId={(row) => row.slug}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info" sx={{ m: 2 }}>No articles found. Add your first article.</Alert>
        )}
      </Paper>

      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h4" component="h2">
            {isEditing ? 'Edit Article' : 'Add Article'}
          </Typography>

          <Stack spacing={2.5} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              fullWidth
              variant="standard"
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
              <TextField
                label="Read Time"
                name="readTime"
                value={form.readTime}
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
            </Stack>
            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              label="Excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              error={Boolean(errors.excerpt)}
              helperText={errors.excerpt}
              fullWidth
              multiline
              rows={2}
              variant="standard"
            />
            <TextField
              label="Content (separate paragraphs with blank lines)"
              name="content"
              value={form.content}
              onChange={handleChange}
              error={Boolean(errors.content)}
              helperText={errors.content}
              fullWidth
              multiline
              rows={6}
              variant="standard"
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSave}>
                {isEditing ? 'Save Changes' : 'Add'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
