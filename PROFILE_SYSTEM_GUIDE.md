# 🚨 DATABASE INTEGRATION - TROUBLESHOOTING GUIDE

## 📋 **What I've Implemented**

I've created a **complete database integration system** for your profile system:

### 🔧 **New API Endpoints**
- `/api/debug` - Tests database connection and shows data structure
- `/api/users` - Fetches all users from `public.users` table
- `/api/profile/[username]` - Fetches individual user profiles

### 🔄 **Updated Components**
- `UserDiscovery.tsx` - Now fetches real database users with debugging
- Profile system - Uses database data instead of sample data

## 🎯 **WHAT YOU NEED TO DO**

### **Step 1: Test Database Connection**
Visit: `http://localhost:3000/api/debug`

**What to look for in browser console:**
```
=== DEBUG API CALLED ===
Environment check: { supabaseUrl: true, supabaseKey: true, ... }
Database query result: { users: [...], totalUsers: X }
```

**If you see errors:**
- Missing environment variables → Create `.env.local` file
- Table access error → Check if `public.users` table exists
- Connection error → Verify Supabase URL and keys

### **Step 2: Create Environment File**
Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 3: Verify Database Schema**
Your `public.users` table should have:
```sql
CREATE TABLE public.users (
  id integer PRIMARY KEY,
  name text,
  email text,
  age integer,
  level text,
  role text,
  created_at timestamp
);
```

### **Step 4: Test Community Page**
Visit: `http://localhost:3000/home/community`

**What you should see:**
- Real users from your database
- User cards showing: `ID: [user-id] @[email]`
- Loading states and error handling

### **Step 5: Test Profile Pages**
Click on any user in community page, or visit directly:
- `http://localhost:3000/profile/[user-id]`

**Console should show:**
```
=== PROFILE API CALLED ===
Trying ID search for: [user-id]
User found using method: ID
Successfully created profile for [user-id]
```

## 🐛 **COMMON ISSUES & SOLUTIONS**

### **Issue: "Profile not found"**
**Cause**: User ID mismatch or database connection issue
**Solution**: 
1. Check `/api/debug` for database connection
2. Verify user IDs in community page match database IDs
3. Check console for detailed error messages

### **Issue: "Missing environment variables"**
**Cause**: No `.env.local` file
**Solution**: Create `.env.local` with Supabase credentials

### **Issue: "Table query failed"**
**Cause**: `public.users` table doesn't exist or no permissions
**Solution**: 
1. Create the table in your Supabase dashboard
2. Check RLS (Row Level Security) policies
3. Verify Supabase anon key has read permissions

### **Issue: "No users found"**
**Cause**: Empty database table or no active users
**Solution**: 
1. Add test data to your `public.users` table
2. Check if the API is filtering correctly

## � **DEBUGGING CHECKLIST**

### **Console Logs to Check:**
1. **Debug API**: `=== DEBUG API CALLED ===`
2. **User Discovery**: `=== USER DISCOVERY FETCH START ===`
3. **Profile API**: `=== PROFILE API CALLED ===`

### **API Endpoints to Test:**
1. `GET /api/debug` - Should show database info
2. `GET /api/users` - Should show user list
3. `GET /api/profile/[id]` - Should show individual profile

### **Browser Network Tab:**
- Check all API calls return 200 status
- Verify response data structure
- Look for any CORS or authentication errors

## 📊 **Data Flow**

```
Database (public.users)
    ↓
API Routes (/api/users, /api/profile/[id])
    ↓
Frontend Components (UserDiscovery, ProfilePage)
    ↓
UI (User cards, Profile display)
```

## 🚀 **SUCCESS INDICATORS**

✅ Debug API shows your database users  
✅ Community page displays real users with IDs  
✅ Clicking users navigates to working profiles  
✅ Console shows detailed success logs  
✅ No "profile not found" errors  

## 📞 **GETTING HELP**

If you're still having issues:

1. **Check console logs** - They show exactly what's failing
2. **Test `/api/debug`** - Shows database connection status
3. **Verify environment variables** - Most common issue
4. **Check table structure** - Must match expected schema

The system has **comprehensive debugging** - use the console logs to identify exactly where the issue is occurring!
