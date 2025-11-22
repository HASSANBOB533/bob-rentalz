# BOB Rentalz - Quick Reference

**Fast access to common commands and key metrics**

---

## 🚀 Common Commands

### Development
```bash
# Lint with cache (fast)
npm run lint

# Lint without cache (full check)
npm run lint:no-cache

# Auto-fix issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck

# Build
npm run build

# Dev server
npm run dev
```

### Cache Management
```bash
# Clear ESLint cache
rm .eslintcache

# Benchmark lint time
time npm run lint

# Cold lint benchmark
rm .eslintcache && time npm run lint
```

---

## 📊 Performance Metrics

### Linting Speed
| Scenario | Time | vs Original |
|----------|------|-------------|
| **With cache (warm)** | 1.6s | **-93%** ⚡ |
| **After 1 file change** | 2.8s | **-89%** ⚡ |
| **After 10 files change** | 5.0s | **-80%** ⚡ |
| **Cold run (no cache)** | 20.9s | **-16%** ⚡ |
| **Original (no optimization)** | 24.9s | baseline |

### Code Quality
| Metric | Count | vs Original |
|--------|-------|-------------|
| **ESLint errors** | 8 | **-91%** ✅ |
| **Total problems** | 165 | **-27%** ✅ |
| **Build status** | ✅ Passing | Maintained |

---

## 🎯 Current Status

### Fixed Issues
✅ **50 unescaped entity errors** - 100% fixed
✅ **6 critical React errors** - 100% fixed  
✅ **24 import resolution errors** - 100% fixed
✅ **9 setState-in-effect errors** - 53% fixed

### Remaining Issues
⚠️ **8 ESLint errors** (3 non-critical + 5 valid patterns)
⚠️ **157 warnings** (mostly unused vars and formatting)

---

## 🛠️ Troubleshooting

### Lint not picking up changes
```bash
rm .eslintcache
npm run lint
```

### Slow lint times
```bash
# Check cache
ls -lh .eslintcache

# Force full lint
npm run lint:no-cache
```

### Build failures
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clean build
rm -rf dist
npm run build
```

---

## 📚 Documentation

**Main Guides:**
- `OPTIMIZATION_GUIDE.md` - Complete optimization reference
- `REACT_REFACTORING_REPORT.md` - React patterns and refactoring
- `ESLINT_PERFORMANCE_OPTIMIZATION.md` - ESLint speed improvements
- `ESLINT_FIXES_SUMMARY.md` - Error fixes summary

**Quick Setup:**
- `ci-workflow-with-cache.yml` - GitHub Actions caching template

---

## 🎨 React Patterns

### Derived State (Preferred)
```tsx
// ✅ Good: Compute from props
const favorited = localFavorited ?? isFavorite(propertyId);
```

### useMemo for Computations
```tsx
// ✅ Good: Memoize expensive operations
const results = useMemo(() => computeResults(query), [query]);
```

### Avoid setState in Effects
```tsx
// ❌ Bad: setState in effect
useEffect(() => {
  setData(getData());
}, []);

// ✅ Good: useMemo
const data = useMemo(() => getData(), [refreshKey]);
```

---

## 🔍 Monitoring

### Weekly Checks
```bash
# Check error count
npm run lint 2>&1 | grep "✖"

# Benchmark performance
time npm run lint
```

### Target Metrics
- Lint time (cold): < 25s ✅
- Lint time (warm): < 3s ✅
- ESLint errors: < 10 ✅
- Build time: < 5s ✅

---

## 🚀 CI/CD Setup

### GitHub Actions Caching

**To enable:**
1. Copy `ci-workflow-with-cache.yml` to `.github/workflows/ci.yml`
2. Commit via GitHub web interface

**Expected improvement:**
- First run: ~21s
- Cached runs: ~2-5s (**80-90% faster**)

---

## 📞 Need Help?

**Check these first:**
1. `OPTIMIZATION_GUIDE.md` - Comprehensive guide
2. Troubleshooting section above
3. Individual documentation files

**Common Issues:**
- Cache not working → Clear with `rm .eslintcache`
- Slow lints → Check if cache is enabled in package.json
- Build failures → Clean install and rebuild

---

**Last Updated:** January 2024  
**Quick Links:** [Optimization Guide](OPTIMIZATION_GUIDE.md) | [React Refactoring](REACT_REFACTORING_REPORT.md) | [ESLint Performance](ESLINT_PERFORMANCE_OPTIMIZATION.md)
