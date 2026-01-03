# API Utility Usage Examples

This document shows how to use the centralized API utility instead of manual fetch calls.

## Import the utility

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/api';
```

---

## Example 1: GET Request (Fetch Traders)

### Before:
```typescript
const fetchTraders = async () => {
  const { token } = contextData();
  try {
    const res = await fetch(`${url}/trader`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch traders');
    const data = await res.json();
    setTraders(data);
  } catch (error) {
    console.error('Error fetching traders:', error);
  }
};
```

### After:
```typescript
const fetchTraders = async () => {
  try {
    const res = await apiGet(`${url}/trader`);
    if (!res.ok) throw new Error('Failed to fetch traders');
    const data = await res.json();
    setTraders(data);
  } catch (error) {
    console.error('Error fetching traders:', error);
  }
};
```

---

## Example 2: POST Request (Update Profile)

### Before:
```typescript
const updateProfile = async (formData: any) => {
  const { token } = contextData();
  const response = await fetch(`${url}/users/update-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response;
};
```

### After:
```typescript
const updateProfile = async (formData: any) => {
  const response = await apiPut(`${url}/users/update-profile`, formData);
  return response;
};
```

---

## Example 3: POST with FormData (Upload Image)

### Before:
```typescript
const uploadTrader = async (formData: FormData) => {
  const { token } = contextData();
  const response = await fetch(`${url}/trader/create`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
```

### After:
```typescript
const uploadTrader = async (formData: FormData) => {
  const response = await apiPost(`${url}/trader/create`, formData);
  return response;
};
```

---

## Example 4: DELETE Request

### Before:
```typescript
const deleteTrader = async (id: string) => {
  const { token } = contextData();
  const response = await fetch(`${url}/trader/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
```

### After:
```typescript
const deleteTrader = async (id: string) => {
  const response = await apiDelete(`${url}/trader/${id}`);
  return response;
};
```

---

## Example 5: Public Endpoint (No Auth Required)

For public endpoints like login/register, pass `false` as the last parameter:

```typescript
const login = async (email: string, password: string) => {
  const response = await apiPost(
    `${url}/auth/login`,
    { email, password },
    false // No auth required
  );
  return response;
};
```

---

## Example 6: Complete Component Refactor

### Before:
```typescript
import { contextData } from '@/context/AuthContext';

const ManageTrader = () => {
  const { token } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTraders = async () => {
    const res = await fetch(`${url}/trader`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTraders(data);
  };

  const deleteTrader = async (id: string) => {
    const res = await fetch(`${url}/trader/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  };

  // ... rest of component
};
```

### After:
```typescript
import { apiGet, apiDelete } from '@/utils/api';

const ManageTrader = () => {
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  // No need to get token from context anymore!

  const fetchTraders = async () => {
    const res = await apiGet(`${url}/trader`);
    const data = await res.json();
    setTraders(data);
  };

  const deleteTrader = async (id: string) => {
    const res = await apiDelete(`${url}/trader/${id}`);
    return res;
  };

  // ... rest of component
};
```

---

## Benefits

1. ✅ **Less code** - No need to manually add auth headers
2. ✅ **No token management** - Don't need to import and use contextData for token
3. ✅ **Consistent** - All requests use the same auth pattern
4. ✅ **Maintainable** - Update auth logic in one place
5. ✅ **Type-safe** - TypeScript support included
6. ✅ **Flexible** - Can disable auth for public endpoints

---

## Migration Checklist

To migrate your existing code:

1. Import the API utilities at the top of your file
2. Remove `token` from contextData (unless needed for other purposes)
3. Replace `fetch()` calls with `apiGet`, `apiPost`, `apiPut`, or `apiDelete`
4. Remove manual header construction
5. Keep error handling and response parsing as is
6. Test the endpoint to ensure it works

---

## Advanced Usage

### Custom Headers

If you need additional headers:

```typescript
import { apiFetch } from '@/utils/api';

const res = await apiFetch(`${url}/custom`, {
  method: 'POST',
  headers: {
    'X-Custom-Header': 'value',
  },
  body: JSON.stringify(data),
});
```

### Error Handling Pattern

```typescript
const fetchData = async () => {
  try {
    const res = await apiGet(`${url}/endpoint`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Request failed');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```
